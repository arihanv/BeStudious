"use client"

import Post from "../posts/post"

type Props = {
  posts: void | Array<any>
}

export default function UserPosts({ posts }: Props) {
  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <Post
              postId={post.id}
              name={post.name}
              imageUrl={post.href}
              createdAt={post.created_at}
              profileImgUrl={post.profileUrl}
              userId={post.userId}
              key={index}
            />
          )
        })}
    </>
  )
}
