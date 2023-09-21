import { serverClient } from "~/server/api/server";
import QuickQuote from "../_components/QuickQuote";
import { Hero } from "../_components/Hero";
import { Reviews } from "../_components/Reviews";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "../_components/Logo";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [data] = await serverClient.wp.getPageBySlug(params.slug);

  return {
    title: data?.title?.rendered,
    description: data?.excerpt?.rendered,
  };
}

export default async function LandingPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // const [content] = await serverClient.wp.getPageBySlug(slug);
  // if (!content?.acf) notFound();

  // const [mainHeroMedia, secondaryHeroMedia] =
  //   await serverClient.wp.getMediaByIds([
  //     content?.acf.main_hero.image,
  //     content?.acf.secondary_hero.image,
  //   ]);

  return (
    <>
      <header className="flex">
        <div className="p-4 lg:container lg:mx-auto">
          <div className="w-56">
            <h1>test</h1>
            {/* <Logo></Logo> */}
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-16">
        {/* <Hero
          content={content.acf.main_hero}
          image={mainHeroMedia}
          mode="light"
        /> */}
        <div>
          {/* <QuickQuote></QuickQuote> */}
        </div>
        {/* <div className="flex flex-col items-center gap-8 lg:container lg:mx-auto line-clamp-2">
          <h1 className="max-w-4xl text-3xl font-bold text-center lg:text-6xl text-sky-950 font-merriweather">
            {content.acf.main.title}
          </h1>
          <p className="max-w-4xl pb-8 border-b border-sky-950">
            {content.acf.main.content}
          </p>
        </div>
        <Reviews></Reviews> */}
        {/* <Hero
          content={content.acf.secondary_hero}
          image={secondaryHeroMedia}
          mode="dark"
          reverse
        /> */}
        {/* <div className="bg-sky-600 text-white py-8 text-xs text-opacity-80">
          <div className="flex flex-col items-center gap-8 lg:container lg:mx-auto">
            {content.acf.disclaimer}
          </div>
        </div> */}
      </div>
    </>
  );
}
