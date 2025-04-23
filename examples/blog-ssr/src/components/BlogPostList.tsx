import { HydrateOnView } from '../../../../src';
import { blogPosts } from '../blogPosts';
import BlogPost from './BlogPost';

function BlogPostList() {
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
