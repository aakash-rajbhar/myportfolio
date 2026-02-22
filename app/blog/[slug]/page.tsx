import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

async function getBlog(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Blog not found");

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  return (
    <section className="py-40 px-8 max-w-4xl mx-auto">
      <div className="mb-20">
        <p className="font-mono text-xs opacity-40 mb-4">
          {format(new Date(blog.published_at), "MMMM dd, yyyy")}
        </p>

        <h1 className="text-7xl md:text-9xl font-display tracking-tighter uppercase leading-[0.85] mb-12">
          {blog.title}
        </h1>

        <div className="h-px w-full bg-ink opacity-10" />
      </div>

      <div className="markdown-body prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </section>
  );
}
