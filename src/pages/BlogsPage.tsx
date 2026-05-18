import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { blogsAPI } from "@/lib/api";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  author?: string;
  createdAt?: string;
  date?: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogsAPI.getAllPublic();
        const blogData = Array.isArray(res) ? res : res?.data || [];
        setBlogs(blogData);
      } catch {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ================= SKELETON LOADING =================
  if (loading) {
    return (
      <Layout>
        <section className="min-h-screen bg-gradient-to-b from-muted/20 to-background">
          <div className="section-container py-20">
            <div className="text-center mb-10">
              <div className="h-6 w-32 bg-muted animate-pulse mx-auto mb-3 rounded" />
              <div className="h-10 w-72 bg-muted animate-pulse mx-auto rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="section-container">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="uppercase tracking-widest text-primary text-sm mb-2">
              Insights & Articles
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Blog Posts
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Study abroad tips, visa updates, and expert guidance to help you succeed globally.
            </p>
          </motion.div>

          {/* EMPTY STATE */}
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No blogs available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={`/blogs/${blog.slug || blog._id}`}
                    className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="h-52 overflow-hidden bg-muted">
                      <img
                        src={
                          blog.image ||
                          "https://via.placeholder.com/600x400?text=Blog"
                        }
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                        {blog.excerpt ||
                          (blog.content
                            ? blog.content.slice(0, 120) + "..."
                            : "")}
                      </p>

                      {/* META */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">

                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(
                            blog.createdAt || blog.date || Date.now()
                          ).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {blog.author || "Admin"}
                        </span>

                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}

            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default BlogsPage;