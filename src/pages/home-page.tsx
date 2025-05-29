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
      <h1 className="mb-12 text-center text-5xl font-medium mt-5">
        Django / Graphql API Demo
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
            <DjangoNoAuth />
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
            <DjangoNoAuthGraphQL />
          </div>
        </div>
      </div>
      <p className="text-center mt-10 text-2xl font-medium">
        Login to create notes
      </p>
    </section>
  );
};

export default HomePage;
