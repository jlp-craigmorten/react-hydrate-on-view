import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { BlogPost } from './types';

export function render(blogPosts: BlogPost[]) {
  return renderToString(
    <StrictMode>
      <App blogPosts={blogPosts} />
    </StrictMode>,
  );
}
