// src/posts/get-post.tsx

"use server";

import Post from "./post";
import type { PostType } from "./post";

export async function getPost() {
  const post = await new Promise<PostType>((r) =>
    setTimeout(() => r({ title: "Post Title", content: "Post content" }), 1000)
  );

  return <Post post={post} />;
}
