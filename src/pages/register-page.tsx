import UserForm from "@/components/forms/user-form";

const RegisterPage = () => {
  return (
    <section className="p-20 text-xl">
      <h2 className="text-center mb-14 text-5xl mt-10 font-medium">Register</h2>
      <UserForm isLogin={false} />
    </section>
  );
};

export default RegisterPage;
