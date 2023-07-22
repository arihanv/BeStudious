import Link from "next/link"
import { Github, Medal, Users } from "lucide-react"


import Post from "@/components/posts/post"
export default function IndexPage() {

  //get current time
  const date = new Date().toISOString()

  return (
    <section className="container flex h-full flex-col items-center justify-center gap-10 pb-8 pt-6 md:py-10">
      <div className="pointer-events-none -z-20 w-full max-w-[400px] cursor-default md:h-[400px]">
      <Post name="Himothy" createdAt={date} imageUrl="https://cdn.discordapp.com/attachments/1123787740253786154/1132134958526369822/slZOAAAAFXRFWHRUaHVtYjo6U2l6ZQAzLjE0Nzg2TUL08octAAAAFnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly9QTkc6pipnIgAAAABJRU5ErkJggg.png" profileImgUrl="https://i.guim.co.uk/img/media/4d65894cd46a446612b10fbc1337fe9394c6d291/0_100_3112_1867/master/3112.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=41118f27e08c30514642e4a4c6723db2"/>
      <div className="dark-shadow" />
      </div>
    <div className="flex h-full w-full max-w-[480px] flex-col items-center justify-center gap-2 pb-20 tracking-tight shadow-xl shadow-black">
      <div className="w-full self-start pt-5 text-5xl font-bold lg:text-7xl ">
       BeStudious.
      </div>
      <div className="w-full self-start text-base lg:text-xl">
        Learn, Share, and Grow with an online community of students.
      </div>
    </div>
  </section>
  )
}
