/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import TrendsSidebar from "@/components/TrendsSidebar";
import SearchResults from "./SearchResults";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any;
}): Promise<Metadata> {
  const { q } = await Promise.resolve(searchParams);
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const { q } = await Promise.resolve(searchParams);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-words text-center text-2xl font-bold">
            Search results for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
