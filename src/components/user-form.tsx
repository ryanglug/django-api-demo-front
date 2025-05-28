import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/styles/Form.css";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(30, { message: "Username must be no longer than 30 Characters" }),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .max(25, { message: "Password must be no longer than 25 Characters" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must include at least one number" }),
});

interface Props {
  isLogin?: boolean;
}

const UserForm = ({ isLogin = true }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(formSchema),
  });

  const textContent = isLogin ? "login" : "register";
  const buttonContent = isLogin ? "register" : "login";

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="capitalize">
      <h2 className="text-center mb-14 text-5xl">{textContent}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 form-class"
      >
        <label htmlFor="username">Username:</label>
        <input
          {...register("username")}
          id="username"
          type="text"
          placeholder="Username..."
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="username">Email:</label>
        <input
          {...register("email")}
          id="username"
          type="text"
          placeholder="JohnDoe@example.com"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="username">Password:</label>
        <input
          {...register("password")}
          id="username"
          type="password"
          placeholder="Password..."
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div className="flex items-center gap-8">
          <button
            type="submit"
            className="bg-blue-500 py-2 px-3 rounded-lg transition hover:bg-blue-500/50 hover:cursor-pointer self-start capitalize"
          >
            {textContent}
          </button>
          <a
            href={`/${buttonContent}`}
            className="underline italic hover:text-gray-200 transition"
          >
            or {buttonContent}...
          </a>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
