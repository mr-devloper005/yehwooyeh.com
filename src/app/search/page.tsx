import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { HavenPageShell } from "@/components/haven/haven-page-shell";

export const revalidate = 3;

const matchText = (value: string, query: string) => value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  );
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as { type?: string }).type);
    if (typeText === "comment") return false;
    const description = compactText((content as { description?: string }).description);
    const body = compactText((content as { body?: string }).body);
    const excerpt = compactText((content as { excerpt?: string }).excerpt);
    const categoryText = compactText((content as { category?: string }).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  const formActions = (
    <form action="/search" className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
      <input type="hidden" name="master" value="1" />
      {category ? <input type="hidden" name="category" value={category} /> : null}
      {task ? <input type="hidden" name="task" value={task} /> : null}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          name="q"
          defaultValue={query}
          placeholder="Search by title, area, or keyword"
          className="h-11 border-white/20 bg-white/10 pl-9 text-white placeholder:text-slate-400"
        />
      </div>
      <Button type="submit" className="h-11 rounded-md border-0 bg-blue-500 px-6 text-white hover:bg-blue-400">
        Search
      </Button>
    </form>
  );

  return (
    <HavenPageShell
      title="Search properties"
      description={
        query
          ? `Results matching “${query}”. Refine with another search or open a listing for full details.`
          : "Search across public listings and posts. Add a keyword, neighborhood, or feature (e.g. “garage”, “2 bed”)."
      }
      eyebrow="Explore"
      actions={formActions}
      heroImageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=2000&q=80"
      heroTall
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const taskKey = getPostTaskKey(post);
            const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16 text-center">
          <p className="text-lg font-medium text-slate-800">No matches yet</p>
          <p className="mt-2 max-w-md mx-auto text-sm text-slate-600">
            Try a wider keyword, clear filters in the address bar, or start from the full{" "}
            <Link className="font-medium text-blue-600 hover:underline" href="/listings">
              listings directory
            </Link>
            .
          </p>
        </div>
      )}
    </HavenPageShell>
  );
}
