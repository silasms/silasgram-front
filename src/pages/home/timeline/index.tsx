import { useEffect, useState } from "react"
import { api } from "../../../service/axios"
import { useAuth } from "../../../hooks/auth"
import { Post } from "./components/post.component"
import Image from '../../../assets/image.svg?react'

type Post = {
  id: string;
  authorId: string;
  description: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    email: string;
    username: string;
    password: string;
    name: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
}

export function Timeline() {
  const { user, token } = useAuth()
  const [ posts, setPosts ] = useState<Post[]>([])

  useEffect(() => {
    async function getPosts() {
      const { data } = await api.get(`user/getposts/${user.id}`)
      setPosts(data)
    }
    getPosts()
  }, [])

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const files = (document.getElementById('file') as HTMLInputElement).files
    if (files?.length === 0 || files === null ) return
    const buffer = await files[0].arrayBuffer()
    const base64String = btoa(
      new Uint8Array(buffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    await api.post('/post', {
      image:  base64String,
      authorId: user.id,
    },
    {
      headers: {
        Authorization: token
      }
    })
  }

  return (
    <div>
      <div>
        <form  className="w-[468px] mx-auto my-10 flex flex-col items-end" action="">
          <textarea className="w-full bg-black border rounded-lg h-16 max-h-16 min-h-16 resize-none pr-10" name="" maxLength={120} id="text"></textarea>
          <input className="hidden" type="file" name="file" id="file" accept="image/png, image/jpeg" />
          <label className="mt-[-42px] mr-2" htmlFor="file">
            <Image className="scale-110" />
          </label>
            <button type="submit" className="mt-7 mr-2 bg-gray-400 px-4 py-0.5 rounded-xl" onClick={createPost}>Postar</button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        {posts?.map((post) => {
          return (
            <Post
              perfil={{name: post.author.name, image: post.author.image}}
              image={post.image}
              description={post.description}
              likes={[{name: 'joao', image: 'asd'}]}
              createdAt={new Date(2023, 1)}
            />
          )
        })}
      </div>
    </div>
  )
}