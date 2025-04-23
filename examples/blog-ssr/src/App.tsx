import BlogPostList from './components/BlogPostList';
import Header from './components/Header';
import type { BlogPost } from './types';

import './styles.css';

interface AppProps {
  blogPosts: BlogPost[];
}

function App({ blogPosts }: AppProps) {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <h1>Blog Posts</h1>
        <p className="intro">
          This example demonstrates the HydrateOnView component from
          react-hydrate-on-view.
          <br />
          <br />
          Scroll down to see blog posts only hydrate when they enter the
          viewport.
        </p>
        <BlogPostList blogPosts={blogPosts} />
      </main>
    </div>
  );
}

export default App;
