import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { blogsAPI } from '@/lib/api';

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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogsAPI.getAllPublic();

        const blogData = Array.isArray(res)
          ? res
          : res?.data || [];

        setBlogs(blogData);
      } catch { 
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
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
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="section-container">

          {/* HEADER */}
          <div className="text-center mb-14">
            <p className="section-subtitle mb-2">Blogs</p>
            <h1 className="section-title mb-4">Latest Articles</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with study abroad tips, visa guidance, and exam preparation insights.
            </p>
          </div>

          {/* EMPTY STATE */}
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No blogs available yet.
            </div>
          ) : (

            // GRID
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {blogs.map((blog, index) => (
                <Link
                  key={blog._id}
                  to={`/blogs/${blog.slug || blog._id}`}
                  className="group bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >

                  {/* IMAGE */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={
                        blog.image
                          ? blog.image
                          : "https://via.placeholder.com/400x300"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {blog.excerpt ||
                        (blog.content
                          ? blog.content.substring(0, 120) + '...'
                          : '')}
                    </p>

                    {/* META */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">

                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {blog.author || 'ProVisa'}
                      </span>

                    </div>

                  </div>
                </Link>
              ))}

            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogsPage;