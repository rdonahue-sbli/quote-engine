import Image from "next/image";
import React, { ReactNode } from "react";
import { CustomHero, WPMediaType } from "~/schema/wordpress";

type HeroComponentProps = {
  content: Omit<CustomHero, "image">;
  image: WPMediaType;
  mode: "light" | "dark";
  reverse?: boolean;
};
export const Hero = ({ image, content, mode, reverse }: HeroComponentProps) => {
  return (
    <div
      className={`flex flex-col justify-center overflow-clip ${
        mode === "dark" ? `bg-sky-950` : `bg-sky-600`
      }`}
    >
      <div
        className={`flex flex-col-reverse justify-evenly lg:container lg:mx-auto ${
          reverse ? `md:flex-row-reverse` : `md:flex-row`
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-6 p-8 mx-auto text-center text-white md:ml-0 max-w-prose md:items-start md:text-left">
          <h2 className="text-3xl font-bold lg:leading-tight lg:text-5xl line-clamp-3 font-merriweather">
            {content.title}
          </h2>
          <p className="line-clamp-5">{content.content}</p>
          {content.button_label && content.button_url ? (
            <a href={content.button_url} className="w-64 btn">
              {content.button_label}
            </a>
          ) : null}
        </div>
        <div className="relative flex basis-1/2">
          <Image
            className="object-cover object-left"
            src={image.source_url}
            width={image.media_details.width}
            height={image.media_details.height}
            alt={image.alt_text}
            priority
          />
        </div>
      </div>
    </div>
  );
};
