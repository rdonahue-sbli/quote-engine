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

export const WPPageSchema = z.array(
  z.object({
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
  })
);

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
      large: WPImageSize,
      thumbnail: WPImageSize,
      medium_large: WPImageSize,
      full: WPImageSize,
    }),
  }),
  post: z.number(),
  source_url: z.string(),
});
