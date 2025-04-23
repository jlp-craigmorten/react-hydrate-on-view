import BlogPostList from './components/BlogPostList';
import Header from './components/Header';

import './styles.css';

function App() {
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
        <BlogPostList />
      </main>
    </div>
  );
}

export default App;
