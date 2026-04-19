import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { blogsAPI } from '@/lib/api';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogsAPI.getAllPublic();
        setBlogs(data);
      } catch (err) {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading blogs...</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Blogs</p>
            <h1 className="section-title mb-4">Latest Articles</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news and tips about studying abroad, visa processes, and test preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog.slug || blog._id}`}
                className="bg-card border border-border rounded-xl overflow-hidden card-hover group"
              >
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {blog.author || 'ProVisa Team'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogsPage;
