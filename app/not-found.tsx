import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 · Rayhendra Hanif", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 sm:px-8">
      <p className="figures-tabular text-xs font-semibold tracking-[0.2em] text-teal-ink">404</p>
      <h1 className="mt-4 font-serif text-5xl text-ink sm:text-7xl">
        This page <span className="italic">flatlined.</span>
      </h1>
      <p className="mt-8 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist. <span lang="id">Halaman yang Anda cari tidak ditemukan.</span>
      </p>
      <p className="mt-12 flex gap-8 text-sm font-semibold">
        <a href="/" className="border-b border-ink pb-1 text-ink hover:border-teal-ink hover:text-teal-ink">
          Home
        </a>
        <a href="/id/" className="border-b border-ink pb-1 text-ink hover:border-teal-ink hover:text-teal-ink">
          Beranda
        </a>
      </p>
    </main>
  );
}
