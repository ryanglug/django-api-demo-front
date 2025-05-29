import GoogleLoginButton from "@/components/auth/google-login";
import UserForm from "@/components/forms/user-form";

const LoginPage = () => {
  return (
    <section className="p-20 text-xl flex flex-col gap-10">
      <h2 className="text-center mb-14 text-5xl mt-10 font-medium">Login</h2>
      <UserForm />

      <GoogleLoginButton />
    </section>
  );
};

export default LoginPage;
