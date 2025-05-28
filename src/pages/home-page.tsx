import DjangoNoAuth from "@/components/django-no-auth";
import DjangoNoAuthGraphQL from "@/components/django-no-auth-graphql";
import ImageMap from "@/components/image-map";
import {
  DJANGO_REACT,
  DJANGO_REACT_GRAPHQL,
} from "@/constants/stack-constants";

const HomePage = () => {
  return (
    <section className="bg-black text-white p-20 text-xl">
      <h1 className="mb-16 text-center text-5xl font-medium">
        Welcome to my API test site
      </h1>
      <div className="flex flex-col gap-20 items-center">
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2 justify-self-end mr-20 self-start">
            <ImageMap array={DJANGO_REACT} />
          </div>
          <DjangoNoAuth />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2 justify-self-end mr-20 self-start">
            <ImageMap array={DJANGO_REACT_GRAPHQL} />
          </div>
          <DjangoNoAuthGraphQL />
        </div>
      </div>
      <p className="text-center mt-10 text-2xl">
        Login to add a note and see the auth section
      </p>
    </section>
  );
};

export default HomePage;
