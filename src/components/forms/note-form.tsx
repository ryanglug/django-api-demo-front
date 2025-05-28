import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/styles/Form.css";
import { tokenApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(30, { message: "Title must be no more than 30 characters" }),
  content: z
    .string()
    .min(3, { message: "Must contain content" })
    .max(255, { message: "Content Field to large" }),
});

const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: undefined,
      content: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      if (!accessToken) return;
      const res = await tokenApi(accessToken).post("note/", values);

      console.log(res.data);

      alert("Successfully created note!");
      queryClient.invalidateQueries({ queryKey: ["users-notes"] });
      reset();
    } catch (error) {
      alert("Failed to create note!");
      console.error(error);
    }
  };

  return (
    <div className="capitalize">
      <h2 className="text-center mb-14 text-5xl">Create Note</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 form-class"
      >
        <label htmlFor="title">title:</label>
        <input
          {...register("title")}
          id="title"
          type="text"
          placeholder="Add a title here..."
        />
        {errors.title && <p>{errors.title.message}</p>}
        <label htmlFor="content">content:</label>
        <textarea
          {...register("content")}
          id="content"
          placeholder="Write your thoughts here..."
        />
        {errors.content && <p>{errors.content.message}</p>}

        <button
          type="submit"
          className="bg-blue-500 py-2 px-3 rounded-lg transition hover:bg-blue-500/50 hover:cursor-pointer self-start capitalize"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default NoteForm;
