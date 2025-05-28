import DjangoAuth from "@/components/django-auth";
import DjangoAuthGraphQL from "@/components/django-auth-graphql";
import NoteForm from "@/components/forms/note-form";
import ImageMap from "@/components/image-map";
import {
  DJANGO_REACT,
  DJANGO_REACT_GRAPHQL,
} from "@/constants/stack-constants";

const SignedInPage = () => {
  return (
    <section className="bg-black text-white p-20 text-xl">
      <h1 className="mb-16 text-center text-5xl font-medium">
        Create a post and view your own
      </h1>
      <div className="flex flex-col gap-20">
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2 justify-self-end mr-20 self-start">
            <ImageMap array={DJANGO_REACT} />
          </div>
          <DjangoAuth />
        </div>
        <NoteForm />
        <div className="flex items-center gap-2 justify-self-end mr-20 self-start">
          <ImageMap array={DJANGO_REACT_GRAPHQL} />
        </div>
        <DjangoAuthGraphQL />
      </div>
    </section>
  );
};

export default SignedInPage;
