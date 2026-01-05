import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Tag, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Building Secure Authentication with Supabase",
    excerpt:
      "Learn how to implement robust authentication systems using Supabase, including OAuth, magic links, and session management.",
    category: "Security",
    readTime: "8 min read",
    date: "Jan 2, 2026",
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "React Performance Optimization Tips",
    excerpt:
      "Discover essential techniques to optimize your React applications for better performance and user experience.",
    category: "Frontend",
    readTime: "6 min read",
    date: "Dec 28, 2025",
    gradient: "from-accent/20 to-primary/20",
  },
  {
    title: "Setting Up a Modern Dev Environment",
    excerpt:
      "A complete guide to configuring your development environment with VS Code, Git, and essential tools for productivity.",
    category: "Tools",
    readTime: "5 min read",
    date: "Dec 20, 2025",
    gradient: "from-primary/20 to-accent/20",
  },
];

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Blog
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            Latest Articles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                className="glass-card-hover overflow-hidden h-full flex flex-col"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image placeholder with gradient */}
                <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-xl bg-secondary/50 backdrop-blur flex items-center justify-center">
                      <Tag className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur rounded-full text-foreground">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium mt-4 group/link"
                    whileHover={{ x: 4 }}
                  >
                    Read More
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
