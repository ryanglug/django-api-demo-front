import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/styles/Form.css";
import { apiGeneric, authApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(30, { message: "Username must be no longer than 30 Characters" }),
  email: z.string().email({ message: "Must be a valid email" }).optional(),
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
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: undefined,
      password: undefined,
      username: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginAuth);

  const textContent = isLogin ? "login" : "register";
  const buttonContent = isLogin ? "register" : "login";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLogin) {
      try {
        const res = await authApi.post("login/", values);

        const token = res.data.access;

        loginUser(token);
        navigate("/signed-in");
      } catch (error) {
        alert("Login failed");
        console.error(error);
      }
    } else {
      try {
        await apiGeneric.post("user/create/", values);

        alert("User created successfully!");
        navigate("/login");
      } catch (error) {
        alert("Error creating user");
        console.error(error);
      }
    }
  };

  return (
    <div className="capitalize">
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
        {!isLogin && (
          <>
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              id="email"
              type="text"
              placeholder="JohnDoe@example.com"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </>
        )}
        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password..."
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div className="flex items-center gap-8">
          <button
            type="submit"
            className="bg-blue-500 py-2 px-3 rounded-lg transition hover:bg-blue-500/50 hover:cursor-pointer self-start capitalize"
            disabled={isSubmitting}
          >
            {textContent}
          </button>
          <button
            onClick={() => navigate(`/${buttonContent}`)}
            type="button"
            className="underline italic hover:text-gray-200 transition hover:cursor-pointer"
            disabled={isSubmitting}
          >
            or {buttonContent}...
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
