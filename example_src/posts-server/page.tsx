// src/posts-server/page.tsx

import { Suspense } from "react";
import { getPost } from "./get-post";
import Post from "./post";
import type { PostType } from "./post";

export default async function Page({
  query,
  data,
}: // data,
{
  query: { [key: string]: string | undefined };
  data: string;
}) {
  const getPost2 = async () => {
    const post = await new Promise<PostType>((r) =>
      setTimeout(
        () => r({ title: "Post Title2", content: "Post content2" }),
        1000
      )
    );

    return <Post post={post} />;
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{getPost()}</Suspense>
      <Suspense fallback={<div>Loading2...</div>}>{getPost2()}</Suspense>
    </>
  );
}
