import { z } from "zod";

// Some excessive properties available on API may not be parsed

export const ImageMimeType = z.enum([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
]);
export const WPStatus = z.enum([
  "publish",
  "draft",
  "future",
  "pending",
  "private",
  "inherit",
]);

// "acf": {
//   "marketing_headline": "",
//   "marketing_image": "",
//   "card": {
//     "card_image": 9,
//     "card_title": "Please enter a card title.",
//     "card_content": "Quisque porta commodo arcu, at tempus neque mattis ac. Cras risus lectus, tincidunt quis euismod id, euismod quis magna. \r\n\r\nPhasellus vulputate nec nisi molestie suscipit. Duis lobortis aliquam mauris et ornare. Duis quis dignissim ligula. Sed posuere, odio vel congue viverra, dolor sapien egestas ante, id porttitor urna elit vel nisl. Aliquam massa leo, sodales nec lectus in, malesuada mollis eros. Quisque magna erat, varius vel lacinia sed, imperdiet a risus. Phasellus scelerisque euismod nisl, egestas volutpat eros rhoncus non. Nulla facilisi. Etiam finibus tortor eget pretium efficitur. Suspendisse eget odio nec eros feugiat tincidunt a quis lorem. Cras cursus commodo sollicitudin."
//   }
// },

const CustomHeroSchema = z.object({
  image: z.coerce.number(),
  title: z.string(),
  content: z.string(),
  button_label: z.string().nullable(),
  button_url: z.string().url().nullable()
});

export type CustomHero = z.infer<typeof CustomHeroSchema>;

export const CustomMarketingSchema = z.object({
  acf: z.object({
    main_hero: CustomHeroSchema,
    main: CustomHeroSchema.pick({ 'title': true, 'content': true }),
    secondary_hero: CustomHeroSchema,
  }),
});

export const WPPageSchema = z.object({
  id: z.number(),
  date: z.string().transform((date) => new Date(date)),
  date_gmt: z.string().transform((date) => new Date(date)),
  modified: z.string().transform((date) => new Date(date)),
  modified_gmt: z.string().transform((date) => new Date(date)),
  slug: z.string(),
  status: WPStatus,
  type: z.enum(["page", "post"]),
  link: z.string().url(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
    protected: z.boolean(),
  }),
  excerpt: z.object({
    rendered: z.string(),
    protected: z.boolean(),
  }),
  author: z.number(),
  featured_media: z.number(),
  parent: z.number(),
  menu_order: z.number(),
});

export const WPImageSize = z.object({
  file: z.string(),
  width: z.number(),
  height: z.number(),
  filesize: z.number().optional(),
  mime_type: ImageMimeType,
  source_url: z.string().url(),
});

export const WPMediaSchema = z.object({
  id: z.number(),
  date: z.string().transform((date) => new Date(date)),
  date_gmt: z.string().transform((date) => new Date(date)),
  modified: z.string().transform((date) => new Date(date)),
  modified_gmt: z.string().transform((date) => new Date(date)),
  slug: z.string(),
  status: WPStatus,
  type: z.enum(["attachment"]),
  link: z.string().url(),
  title: z.object({
    rendered: z.string(),
  }),
  author: z.number(),
  description: z.object({
    rendered: z.string(),
  }),
  caption: z.object({
    rendered: z.string(),
  }),
  alt_text: z.string(),
  media_type: z.enum(["image", "file"]),
  mime_type: ImageMimeType,
  media_details: z.object({
    width: z.number(),
    height: z.number(),
    file: z.string(),
    filesize: z.number(),
    sizes: z.object({
      medium: WPImageSize,
      large: WPImageSize.optional(),
      thumbnail: WPImageSize,
      medium_large: WPImageSize,
      full: WPImageSize,
    }),
  }),
  post: z.number(),
  source_url: z.string(),
});

export type WPMediaType = z.infer<typeof WPMediaSchema>;
