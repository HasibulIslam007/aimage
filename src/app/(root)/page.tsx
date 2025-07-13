// app/page.tsx
import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/../constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="w-full min-h-screen px-6 py-10 md:px-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        <div className="z-10 max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
            Unleash your <span className="text-purple-400">Creativity</span>{" "}
            <br />
            with the power of <span className="text-pink-500">AImage</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            Create production-quality visual assets for your projects with
            unprecedented quality, speed, and consistency.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-base shadow-lg hover:opacity-90 transition">
              No credit card needed
            </span>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-0 max-w-lg z-10">
          <img
            src="https://res.cloudinary.com/demo/image/upload/v1691234567/wizard-ai.png"
            alt="AI wizard"
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="px-6 md:px-16 mt-[-4rem] z-20 relative">
        <ul className="flex justify-center flex-wrap gap-8 backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl py-6 shadow-xl">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex flex-col items-center gap-3 group"
            >
              <li className="rounded-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 shadow-md transition hover:scale-105 hover:bg-white/20">
                <Image src={link.icon} alt="image" width={28} height={28} />
              </li>
              <p className="text-white text-sm font-medium group-hover:text-purple-300 transition">
                {link.label}
              </p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="mt-14 px-6 md:px-16">
        <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl p-6">
          <Collection
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPage}
            page={page}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
