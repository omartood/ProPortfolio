import { BlogPost } from "./BlogCard";

export const blogPosts: BlogPost[] = [
  {
    id: "javascript-promises-async-await",
    title: "Understanding JavaScript Promises and Async/Await",
    excerpt:
      "A comprehensive guide to working with asynchronous JavaScript. Learn how Promises work under the hood and master the modern async/await syntax for cleaner, more readable code.",
    date: "March 22, 2025",
    author: {
      name: "Omar Todd",
      avatar: "/avatars/omar.jpg",
    },
    coverImage: "/blog/javascript-async.jpg",
    tags: ["JavaScript", "Web Development", "Programming", "Async"],
    readTime: "10 min read",
    content: `# Understanding JavaScript Promises and Async/Await

JavaScript's asynchronous nature is one of its most powerful features, but it can also be one of the most challenging aspects to master. In this post, we'll explore Promises and the modern async/await syntax.

## What are Promises?

Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. A Promise can be in one of three states:

* **Pending**: Initial state, neither fulfilled nor rejected
* **Fulfilled**: The operation completed successfully
* **Rejected**: The operation failed

Here's a simple example of creating and using a Promise:

\`\`\`
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Xogta waa la helay!");
    }, 2000);
  });
}

fetchData().then(response => console.log(response));
\`\`\`

This code simulates fetching data with a 2-second delay, then logs the result when the Promise resolves.

## Promise Chaining

One of the most powerful features of Promises is the ability to chain them together:

\`\`\`
fetchData()
  .then(response => {
    console.log(response);
    return "Second operation";
  })
  .then(secondResponse => {
    console.log(secondResponse);
    return "Third operation";
  })
  .then(thirdResponse => {
    console.log(thirdResponse);
  })
  .catch(error => {
    console.error("Error:", error);
  });
\`\`\`

## Error Handling with Promises

Proper error handling is crucial with asynchronous code. Promises provide the \`.catch()\` method to handle errors:

\`\`\`
function riskyOperation() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
      if (success) {
        resolve("Operation successful");
      } else {
        reject(new Error("Operation failed"));
      }
    }, 1000);
  });
}

riskyOperation()
  .then(data => console.log(data))
  .catch(error => console.error(error.message));
\`\`\`

## Promise.all and Promise.race

For handling multiple Promises, JavaScript provides utility methods:

\`\`\`
// Execute all promises in parallel and wait for all to complete
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(responses => {
  // All promises resolved
  console.log(responses);
})
.catch(error => {
  // If any promise rejects, catch will be called
  console.error(error);
});

// Execute all promises in parallel and get result of the first to complete
Promise.race([
  fetch('/api/fastest-server-1'),
  fetch('/api/fastest-server-2'),
  fetch('/api/fastest-server-3')
])
.then(firstResponse => {
  console.log('Fastest server responded:', firstResponse);
});
\`\`\`

## Async/Await: Modern Promise Syntax

ES2017 introduced async/await, which provides a more elegant way to work with Promises:

\`\`\`
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Call the async function
fetchUserData().then(data => {
  console.log('Processing user data:', data);
});
\`\`\`

With async/await, asynchronous code can be written in a way that looks and behaves more like synchronous code, making it easier to reason about.

## Real-world Example: Fetching Data from an API

Let's implement a real-world example using async/await to fetch data from an API:

\`\`\`
async function fetchPosts() {
  const loadingIndicator = document.getElementById('loading');
  const postsContainer = document.getElementById('posts');
  
  try {
    loadingIndicator.style.display = 'block';
    
    // Fetch posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse JSON
    const posts = await response.json();
    
    // Display posts
    postsContainer.innerHTML = posts
      .slice(0, 10)
      .map(post => \`
        <div class="post">
          <h2>\${post.title}</h2>
          <p>\${post.body}</p>
        </div>
      \`)
      .join('');
      
  } catch (error) {
    console.error('Error fetching posts:', error);
    postsContainer.innerHTML = '<p class="error">Failed to load posts</p>';
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Call the function when page loads
window.addEventListener('load', fetchPosts);
\`\`\`

## Conclusion

Promises and async/await have revolutionized asynchronous programming in JavaScript, making complex operations more manageable and code more readable. By understanding these concepts, you'll be well-equipped to handle the asynchronous nature of modern web development.

Remember that async/await is built on top of Promises, so a solid understanding of Promises is essential even when primarily using the newer syntax.

What asynchronous challenges have you faced in your projects? Let me know in the comments below!`,
  },
  {
    id: "building-a-modern-portfolio-with-nextjs",
    title: "Building a Modern Portfolio Website with Next.js and Tailwind CSS",
    excerpt:
      "A comprehensive guide to creating your professional portfolio website using Next.js, Framer Motion, and Tailwind CSS. Learn how to showcase your projects effectively and create a seamless user experience.",
    date: "March 22, 2025",
    author: {
      name: "Omar Todd",
      avatar: "/avatars/omar.jpg",
    },
    coverImage: "/blog/portfolio-nextjs.jpg",
    tags: ["Next.js", "Tailwind CSS", "Portfolio", "Web Development"],
    readTime: "15 min read",
  },
  {
    id: "mastering-react-hooks",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "React Hooks have revolutionized how we write React components. Learn how to use useState, useEffect, useContext, and custom hooks to build powerful and maintainable React applications.",
    date: "March 15, 2025",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
    },
    coverImage: "/blog/react-hooks.jpg",
    tags: ["React", "JavaScript", "Web Development"],
    readTime: "8 min read",
  },
  {
    id: "next-js-server-components",
    title: "Understanding Next.js Server Components",
    excerpt:
      "Server Components are a game-changer for web development. This article explores how they work, their benefits, and how to implement them in your Next.js applications.",
    date: "March 10, 2025",
    author: {
      name: "David Chen",
      avatar: "/avatars/david.jpg",
    },
    coverImage: "/blog/nextjs-server.jpg",
    tags: ["Next.js", "React", "Server Components"],
    readTime: "10 min read",
  },
  {
    id: "tailwind-css-best-practices",
    title: "Tailwind CSS Best Practices for Large Projects",
    excerpt:
      "As your project grows, managing Tailwind CSS can become challenging. Learn the best practices for organizing, extending, and optimizing Tailwind CSS in large-scale applications.",
    date: "March 5, 2025",
    author: {
      name: "Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
    },
    coverImage: "/blog/tailwind-css.jpg",
    tags: ["CSS", "Tailwind CSS", "Web Design"],
    readTime: "6 min read",
  },
  {
    id: "animation-with-framer-motion",
    title: "Creating Fluid Animations with Framer Motion",
    excerpt:
      "Framer Motion simplifies creating complex animations in React applications. This guide shows you how to implement stunning animations that enhance user experience.",
    date: "February 28, 2025",
    author: {
      name: "Michael Thompson",
      avatar: "/avatars/michael.jpg",
    },
    coverImage: "/blog/framer-motion.jpg",
    tags: ["Animation", "React", "Framer Motion"],
    readTime: "7 min read",
  },
  {
    id: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Robust Applications",
    excerpt:
      "Dive into advanced TypeScript patterns like discriminated unions, mapped types, and generics to build more robust and type-safe applications.",
    date: "February 20, 2025",
    author: {
      name: "Alex Wong",
      avatar: "/avatars/alex.jpg",
    },
    coverImage: "/blog/typescript.jpg",
    tags: ["TypeScript", "JavaScript", "Programming"],
    readTime: "12 min read",
  },
  {
    id: "modern-web-performance",
    title: "Modern Web Performance Optimization Techniques",
    excerpt:
      "Performance is crucial for user experience. Learn about modern techniques like lazy loading, code splitting, and Core Web Vitals optimization to make your websites faster.",
    date: "February 15, 2025",
    author: {
      name: "Sophia Martinez",
      avatar: "/avatars/sophia.jpg",
    },
    coverImage: "/blog/web-performance.jpg",
    tags: ["Performance", "Web Development", "Optimization"],
    readTime: "9 min read",
  },
  {
    id: "nodejs-microservices",
    title: "Building Scalable Microservices with Node.js",
    excerpt:
      "Microservices architecture can help scale your applications. This article explores how to design, build, and deploy microservices using Node.js and Docker.",
    date: "February 10, 2025",
    author: {
      name: "James Wilson",
      avatar: "/avatars/james.jpg",
    },
    coverImage: "/blog/nodejs-microservices.jpg",
    tags: ["Node.js", "Microservices", "Backend"],
    readTime: "11 min read",
  },
  {
    id: "ux-design-principles",
    title: "7 UX Design Principles Every Developer Should Know",
    excerpt:
      "Understanding UX design principles can significantly improve the quality of your web applications. Learn the key principles that every developer should be aware of.",
    date: "February 5, 2025",
    author: {
      name: "Olivia Parker",
      avatar: "/avatars/olivia.jpg",
    },
    coverImage: "/blog/ux-design.jpg",
    tags: ["UX Design", "Web Design", "UI"],
    readTime: "8 min read",
  },
];
