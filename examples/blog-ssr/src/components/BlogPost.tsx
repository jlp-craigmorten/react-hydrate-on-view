import { useEffect, useState } from 'react';

interface BlogPostProps {
  title: string;
  excerpt: string;
  publishDate: string;
}

function BlogPost({ title, excerpt, publishDate }: BlogPostProps) {
  const [likes, setLikes] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <article className="blog-post">
      <div className="blog-post-header">
        <h2>{title}</h2>
        <time>{publishDate}</time>
      </div>
      <p className="blog-post-excerpt">{excerpt}</p>
      <div className="blog-post-actions">
        <button type="button" onClick={handleLike} className="like-button">
          Like ({likes})
        </button>
        {hydrated && (
          <div className="hydration-indicator">
            This post is fully hydrated and interactive!
          </div>
        )}
      </div>
    </article>
  );
}

export default BlogPost;
