const titlePrefixes = [
  'How to Use',
  'Understanding',
  'Mastering',
  'Advanced Guide to',
  'The Ultimate Guide to',
  'Best Practices for',
  'Getting Started with',
  'Implementing',
  'Deep Dive into',
  '10 Tips for',
  'Working with',
];

const topics = [
  'React Hooks',
  'Server Components',
  'React Performance',
  'Component Design Patterns',
  'Context API',
  'React Testing',
  'TypeScript and React',
  'React Router',
  'NextJS',
  'Material UI',
  'React Forms',
  'React Animation',
  'Custom Hooks',
  'React DevTools',
  'Micro-Frontends',
  'React Suspense',
  'Error Boundaries',
  'React Security',
];

const excerptTemplates = [
  'Learn how to improve your development workflow with {topic}.',
  'A comprehensive guide to understanding {topic} in modern React applications.',
  'Discover best practices for implementing {topic} in your projects.',
  'Step-by-step tutorial on mastering {topic} for better React applications.',
  'Everything you need to know about using {topic} effectively in 2025.',
];

const generateRandomDate = () => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June'][
    Math.floor(Math.random() * 6)
  ];
  const day = Math.floor(Math.random() * 28) + 1;

  return `${month} ${day}, 2025`;
};

const generateAdditionalPosts = (count: number) => {
  const posts = [];

  for (let i = 0; i < count; i++) {
    const prefix =
      titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const excerptTemplate =
      excerptTemplates[Math.floor(Math.random() * excerptTemplates.length)];

    posts.push({
      id: i + 1,
      title: `${prefix} ${topic}`,
      publishDate: generateRandomDate(),
      excerpt: excerptTemplate.replace('{topic}', topic.toLowerCase()),
    });
  }

  return posts;
};

export const blogPosts = generateAdditionalPosts(1000);
