export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  readTime: string;
  content: string;
}
