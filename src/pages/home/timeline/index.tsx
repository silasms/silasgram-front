import { useEffect } from "react"
import { api } from "../../../service/axios"
import { useAuth } from "../../../hooks/auth"
import { Post } from "./components/post.component"

export function Timeline() {
  const { user } = useAuth()

  useEffect(() => {
    async function getPosts() {
      const { data } = await api.get(`user/getposts/${user.id}`)
      console.log({data})
    }
    getPosts()
  }, [])

  return (
    <div>
      timeline
      <div className="flex flex-col justify-center items-center">
        <Post
          perfil={{name: 'silas', image: 'https://pbs.twimg.com/profile_images/1247951483636613120/EXkmZHgc_400x400.jpg'}}
          image="https://scontent.cdninstagram.com/v/t39.30808-6/455695638_1069637511192133_9094654411658192402_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=_cn1tARh6J8Q7kNvgG9d-Ew&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQzNjkzMTI1ODM1NjkzMDQzMQ%3D%3D.2-ccb7-5&oh=00_AYD6KyIi9sPYhKL7cmg1oQtx-f7Sc0e-MCrjJ6NvX2crxg&oe=66C70246&_nc_sid=10d13b"
          description="testando!!!!!!!"
          likes={[{name: 'joao', image: 'asd'}]}
          createdAt={new Date(2023, 1)}
        />
        <Post
          perfil={{name: 'silas', image: 'https://pbs.twimg.com/profile_images/1247951483636613120/EXkmZHgc_400x400.jpg'}}
          image="https://scontent.cdninstagram.com/v/t39.30808-6/455695638_1069637511192133_9094654411658192402_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=_cn1tARh6J8Q7kNvgG9d-Ew&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQzNjkzMTI1ODM1NjkzMDQzMQ%3D%3D.2-ccb7-5&oh=00_AYD6KyIi9sPYhKL7cmg1oQtx-f7Sc0e-MCrjJ6NvX2crxg&oe=66C70246&_nc_sid=10d13b"
          description="testando!!!!!!!"
          likes={[{name: 'joao', image: 'asd'}]}
          createdAt={new Date(2023, 1)}
        />
      </div>
    </div>
  )
}