import DjangoAuth from "@/components/django-auth";
import DjangoAuthGraphQL from "@/components/django-auth-graphql";
import GraphQLNoteForm from "@/components/forms/graphql-note-form";
import NoteForm from "@/components/forms/note-form";
import ImageMap from "@/components/image-map";
import {
  DJANGO_REACT,
  DJANGO_REACT_GRAPHQL,
} from "@/constants/stack-constants";

const SignedInPage = () => {
  return (
    <section className="bg-black text-white p-20 text-xl">
      <h1 className="mb-16 text-center text-5xl font-medium mt-10">
        Create posts and view your own
      </h1>
      <div className="grid grid-cols-2 gap-20">
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <ImageMap array={DJANGO_REACT} />
              </div>
              <h2 className="text-2xl font-medium">Paginated Notes:</h2>
            </div>
            <DjangoAuth />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <ImageMap array={DJANGO_REACT_GRAPHQL} />
              </div>
              <h2 className="text-2xl font-medium">GraphQL Paginated Notes:</h2>
            </div>
            <DjangoAuthGraphQL />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-20 mt-20">
        <NoteForm />
        <GraphQLNoteForm />
      </div>
    </section>
  );
};

export default SignedInPage;
