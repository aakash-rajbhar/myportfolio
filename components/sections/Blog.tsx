"use client";

import { useEffect, useState, FormEvent, MouseEvent } from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Trash2, ArrowLeft, EyeClosed, Eye } from "lucide-react";
import Callout from "@/components/mdx/Callout";
import CodeBlock from "@/components/mdx/CodeBlock";
import ImageFrame from "@/components/mdx/ImageFrame";
import MacWindow from "@/components/mdx/MacWindow";
import YouTubeEmbed from "@/components/mdx/YouTubeEmbed";
import TweetEmbed from "@/components/mdx/TweetEmbed";

/* ============================= */
/* Types */
/* ============================= */

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string;
}

interface NewBlog {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
}

/* ============================= */
/* Main Component */
/* ============================= */

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const [newBlog, setNewBlog] = useState<NewBlog>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
  });

  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* Fetch Blogs */
  /* ============================= */

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error();
      const data: BlogPost[] = await res.json();
      setBlogs(data);
    } catch {
      console.error("Failed to fetch blogs");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ============================= */
  /* Admin Authentication */
  /* ============================= */

  function handleAdminToggle() {
    if (!adminOpen) {
      setAdminOpen(true);
      return;
    }

    if (adminAuthenticated) {
      setAdminAuthenticated(false);
      setAdminPassword("");
      fetch("/api/admin/logout", { method: "POST" });
    }

    setAdminOpen(false);
  }

  async function verifyAdmin() {
    if (!adminPassword.trim()) return;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });

      if (!res.ok) throw new Error();

      setAdminAuthenticated(true);
    } catch {
      alert("Invalid password");
    }
  }

  /* ============================= */
  /* Create Blog */
  /* ============================= */

  async function handleCreateBlog(e: FormEvent) {
    e.preventDefault();
    if (!adminAuthenticated) return;

    try {
      setLoading(true);

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) throw new Error();

      setNewBlog({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
      });

      fetchBlogs();
    } catch {
      alert("Failed to publish");
    } finally {
      setLoading(false);
    }
  }

  /* ============================= */
  /* Delete Blog */
  /* ============================= */

  async function handleDeleteBlog(e: MouseEvent, id: string) {
    e.stopPropagation();
    if (!adminAuthenticated) return;
    if (!confirm("Delete this entry?")) return;

    try {
      setLoading(true);

      // Remove from state immediately
      const deletedBlog = blogs.find((b) => b._id === id);
      setBlogs(blogs.filter((b) => b._id !== id));

      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // Add it back if delete failed
        if (deletedBlog) {
          setBlogs([...blogs, deletedBlog]);
        }
        throw new Error();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  /* ============================= */
  /* Blog Detail View */
  /* ============================= */

  if (selectedBlog) {
    return (
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedBlog(null)}
          className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest mb-16 opacity-40 hover:opacity-100"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <p className="font-mono text-xs opacity-40 mb-6">
          {format(new Date(selectedBlog.published_at), "MMMM dd, yyyy")}
        </p>

        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-display uppercase leading-[0.9] mb-12">
          {selectedBlog.title}
        </h1>

        <div className="markdown-body">
          <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
        </div>
      </section>
    );
  }

  /* ============================= */
  /* Blog List View */
  /* ============================= */

  return (
    <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex justify-between items-baseline mb-32">
        <h1 className="font-display uppercase text-[clamp(3rem,15vw,12rem)]">
          Journal
        </h1>

        <button
          onClick={handleAdminToggle}
          className="font-mono text-xs uppercase tracking-[0.3em] opacity-20 hover:opacity-100"
        >
          {adminOpen ? "[ CLOSE ]" : "[ ADMIN ]"}
        </button>
      </div>

      {/* ============================= */}
      {/* Admin Panel */}
      {/* ============================= */}

      {adminOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutal-border p-10 mb-32"
        >
          {!adminAuthenticated ? (
            <div className="space-y-6">
              <h3 className="text-3xl font-display uppercase">Admin Access</h3>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-5 brutal-border bg-transparent font-mono text-sm"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-4"
                >
                  {showPassword ? <EyeClosed size={24} /> : <Eye size={24} />}
                </button>
              </div>

              <button
                onClick={verifyAdmin}
                className="w-full bg-ink text-bg p-5 uppercase tracking-widest"
              >
                Verify
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateBlog} className="space-y-6">
              <h3 className="text-3xl font-display uppercase">New Entry</h3>

              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog((prev) => ({
                    ...prev,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
                className="w-full p-5 brutal-border font-display uppercase"
              />

              <textarea
                placeholder="Excerpt"
                value={newBlog.excerpt}
                onChange={(e) =>
                  setNewBlog((prev) => ({
                    ...prev,
                    excerpt: e.target.value,
                  }))
                }
                className="w-full p-5 brutal-border h-28 italic"
              />

              <textarea
                placeholder="Markdown Content"
                required
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                className="w-full p-5 brutal-border h-80 font-mono text-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ink text-bg p-5 uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </form>
          )}
        </motion.div>
      )}

      {/* ============================= */}
      {/* Blog List */}
      {/* ============================= */}

      {blogs.map((blog, index) => (
        <motion.div
          key={blog._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => setSelectedBlog(blog)}
          className="group border-t border-ink/10 py-16 cursor-pointer hover:bg-ink/5 px-4"
        >
          <p className="font-mono text-xs opacity-40 mb-4">
            {format(new Date(blog.published_at), "MMM dd, yyyy")} / 0{index + 1}
          </p>

          <h3 className="text-[clamp(2rem,6vw,4rem)] font-display uppercase leading-[0.9] group-hover:italic transition-all">
            {blog.title}
          </h3>

          <p className="mt-4 opacity-60 italic max-w-2xl line-clamp-2">
            {blog.excerpt}
          </p>

          {adminAuthenticated && (
            <button
              onClick={(e) => handleDeleteBlog(e, blog._id)}
              className="mt-6 p-3 brutal-border text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={18} />
            </button>
          )}
        </motion.div>
      ))}
    </section>
  );
}
