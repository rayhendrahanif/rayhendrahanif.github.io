import type { Metadata } from "next";
import { Site } from "@/components/Site";
import { dictionaries } from "@/content/site";

const t = dictionaries.en;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/", languages: { en: "/", id: "/id/" } },
  openGraph: {
    type: "profile",
    url: "/",
    title: t.meta.title,
    description: t.meta.description,
    locale: "en_US",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

// Visitors who picked Bahasa Indonesia before go straight to /id/
const preferIndonesian = `try{if(localStorage.getItem('lang')==='id')location.replace('/id/'+location.hash)}catch(e){}`;

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: preferIndonesian }} />
      <Site locale="en" />
    </>
  );
}
