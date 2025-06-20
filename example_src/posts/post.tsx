// src/posts/post.tsx

"use client";

export type PostType = {
  title: string;
  content: string;
};

export default function Post({ post }: { post: PostType }) {
  return (
    <>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </>
  );
}
