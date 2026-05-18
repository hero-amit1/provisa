import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { blogsAPI } from "@/lib/api";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    createdAt: string;
}

const BlogDetail = () => {
    const { slug } = useParams<{ slug: string }>();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);

                const data = await blogsAPI.getBySlug(slug);

                console.log("BLOG DATA:", data);

                // ✅ Handles both:
                // { blog: {...} }
                // OR direct blog object
                setBlog(data.blog || data);

            } catch (err) {
                console.error(err);
                setError("Blog not found");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    // ======================
    // LOADING
    // ======================

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </Layout>
        );
    }

    // ======================
    // ERROR
    // ======================

    if (error || !blog) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Blog Not Found
                    </h1>

                    <Link
                        to="/blogs"
                        className="text-primary hover:underline"
                    >
                        ← Back to Blogs
                    </Link>
                </div>
            </Layout>
        );
    }

    // ======================
    // MAIN
    // ======================

    return (
        <Layout>
            <section className="section-padding">
                <div className="max-w-4xl mx-auto">

                    {/* Back Button */}
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blogs
                    </Link>

                    {/* Hero Image */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={blog.image || "/placeholder.jpg"}
                            alt={blog.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">

                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />

                            {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString()
                                : "No Date"}
                        </div>

                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            ProVisa Team
                        </div>

                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <p className="text-lg text-muted-foreground mb-8">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg prose-img:max-w-none max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: blog.content || "",
                        }}
                    />

                </div>
            </section>
        </Layout>
    );
};

export default BlogDetail;