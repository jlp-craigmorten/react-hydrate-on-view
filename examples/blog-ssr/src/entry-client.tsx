import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import type { BlogPost } from './types';

// biome-ignore lint/suspicious/noExplicitAny: Lazy typing ;)
const blogPosts: BlogPost[] = JSON.parse((window as any).__BLOG_POSTS__) || [];

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App blogPosts={blogPosts} />
  </StrictMode>,
);
