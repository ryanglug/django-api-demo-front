import UserForm from "@/components/user-form";

const RegisterPage = () => {
  return (
    <section className="p-20 text-xl">
      <UserForm isLogin={false} />
    </section>
  );
};

export default RegisterPage;
