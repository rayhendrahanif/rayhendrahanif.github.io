import type { Metadata } from "next";
import { Site } from "@/components/Site";
import { dictionaries } from "@/content/site";

const t = dictionaries.id;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/id/", languages: { en: "/", id: "/id/" } },
  openGraph: {
    type: "profile",
    url: "/id/",
    title: t.meta.title,
    description: t.meta.description,
    locale: "id_ID",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Site locale="id" />;
}
