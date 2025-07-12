import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./Blogs"; // Adjust the path if needed
import { motion } from "framer-motion";

const ReadMore1 = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return <div className="text-center p-10">Blog post not found.</div>;
  }

  // Helper: Bold first line if it looks like a heading
  const renderParagraph = (para, idx) => {
    const lines = para.trim().split("\n");
    const firstLine = lines[0];

    const isHeading =
      /^[\u2700-\u27BF\uE000-\uF8FF\u2600-\u26FF]|^[A-Za-z\s]+:$/.test(firstLine); // Emoji or heading-like

    if (isHeading && lines.length > 1) {
      return (
        <p key={idx} className="mb-4">
          <strong>{firstLine}</strong>
          <br />
          {lines.slice(1).join("\n")}
        </p>
      );
    }

    return <p key={idx} className="mb-4">{para}</p>;
  };

  return (
    <div className="dark:bg-gray-900">
      <motion.div
        className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to="/blogs" className="text-blue-600 hover:underline">
          ← Back to Blogs
        </Link>
        <div className="bg-white p-6 rounded shadow mt-4 dark:bg-gray-700 dark:text-white">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {blog.date} | {blog.category}
          </p>

          <div className="text-gray-800 text-md leading-relaxed dark:text-white whitespace-pre-line">
            {blog.fullContent.split("\n\n").map((para, idx) =>
              renderParagraph(para, idx)
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Tags:</h2>
            <div className="flex gap-2 mt-2 flex-wrap">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadMore1;
