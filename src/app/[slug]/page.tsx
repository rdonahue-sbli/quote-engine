import { serverClient } from "~/server/api/server";
import QuickQuote from "../_components/QuickQuote";
import { Hero } from "../_components/Hero";
import { Reviews } from "../_components/Reviews";
import { headers } from "next/headers";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [{ title, excerpt }] = await serverClient.wp.getPageBySlug(params.slug);
  return {
    title: title.rendered,
    description: excerpt.rendered,
  };
}

export default async function LandingPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const head = headers();
  const [content] = await serverClient.wp.getPageBySlug(slug);
  const [mainHeroMedia, secondaryHeroMedia] =
    await serverClient.wp.getMediaByIds([
      content.acf.main_hero.image,
      content.acf.secondary_hero.image,
    ]);

  return (
    <div className="flex flex-col gap-16">
      <Hero
        content={content.acf.main_hero}
        image={mainHeroMedia}
        mode="light"
      />
      <div>
        <QuickQuote></QuickQuote>
      </div>
      <div className="flex flex-col items-center gap-8 lg:container lg:mx-auto line-clamp-2">
        <h1 className="max-w-4xl text-3xl font-bold text-center lg:text-6xl text-sky-950 font-merriweather">
          {content.acf.main.title}
        </h1>
        <p className="max-w-4xl pb-8 border-b border-sky-950">
          {content.acf.main.content}
        </p>
      </div>
      <Reviews></Reviews>
      <Hero
        content={content.acf.secondary_hero}
        image={secondaryHeroMedia}
        mode="dark"
        reverse
      />
    </div>
  );
}