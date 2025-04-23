import { HydrateOnView } from '../../../../src';
import type { BlogPost as IBlogPost } from '../types';
import BlogPost from './BlogPost';

interface BlogPostListProps {
  blogPosts: IBlogPost[];
}

function BlogPostList({ blogPosts }: BlogPostListProps) {
  return (
    <div className="blog-post-list">
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-post-container">
          <HydrateOnView>
            <BlogPost
              title={post.title}
              excerpt={post.excerpt}
              publishDate={post.publishDate}
            />
          </HydrateOnView>
          <div className="post-separator" />
        </div>
      ))}
    </div>
  );
}

export default BlogPostList;
