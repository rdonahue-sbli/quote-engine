import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";
import { Review } from "~/schema/reviews";
import { serverClient } from "~/server/api/server";

export const Reviews = async () => {
  const { reviews } = await serverClient.reviews.list();
  return (
    <>
      <div className="lg:container lg:mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 divide-y divide-gray-200 rounded-md md:items-stretch md:flex-row md:divide-y-0 md:divide-x">
          {reviews
            ? reviews.map((review) => (
                <div
                  className="flex flex-col flex-1 gap-4 p-0 pt-6 text-center stat basis-1/6 max-w-prose md:pl-6"
                  key={review.id}
                >
                  <div className="flex justify-center stat-title">
                    <StarIcon
                      {...review.links.find(
                        (link) => link.rel === "resources-images-stars"
                      )!}
                    ></StarIcon>
                  </div>
                  <div>
                    <div className="text-lg font-bold line-clamp-1">
                      {review.title}
                    </div>
                    <div className="text-gray-400 whitespace-normal stat-desc line-clamp-3">
                      {review.text}
                    </div>
                  </div>
                  <div className="flex flex-col justify-end flex-grow text-xs text-green-700 uppercase whitespace-normal">
                    <span className="font-bold">
                      {review.consumer.displayName}
                    </span>
                    <span>
                      {formatDistanceToNow(review.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

type LinksProps = Review["links"][0];

export const StarIcon = async ({ href }: LinksProps) => {
  const { starSvg, stars } = await serverClient.reviews.getStarIcon(href);

  return (
    <>
      <Image
        src={starSvg.url}
        width={128}
        height={24}
        alt={`${stars} star review.`}
      ></Image>
    </>
  );
};
