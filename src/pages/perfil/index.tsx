import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../service/axios"
import User from "../../assets/user.jpg"
import { NotPublished } from "./components/not-published"
import { useAuth } from "../../hooks/auth"

interface User {
  followers: User[]
  following: User[]
  image: string
  name: string
  posts: {
    authorId: string
  }[]
  username: string
}



export function Perfil() {
  const { user : dbUser } = useAuth()
  const { username } = useParams()
  const [ user, setUser ]  = useState<User>()

  useEffect(() => {
    async function getPerfil() {
      const { data } = await api.get(`user/getbyusername/${username}`)
      setUser(data)
    }
    getPerfil()
  }, [])

  return (
    <div className="w-full">
      {user && (
        <div className="max-w-[935px] m-auto pt-10">
          <div className="flex justify-between px-24">
            <img className="w-[150px] h-[150px] rounded-full" src={User} alt="" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p>{user.username}</p>
                {dbUser.username === username ? <button className="bg-zinc-600 text-sm font-semibold px-2 py-1 rounded-lg">Editar perfil</button> : <></>}
              </div>
              <div className="flex gap-8">
                <p><span className="font-semibold">{user.posts.length}</span> publicações</p>
                <p><span className="font-semibold">{user.followers.length}</span> seguidores</p>
                <p><span className="font-semibold">{user.following.length}</span> seguindo</p>
              </div>
              <p className="mt-2">{user.name}</p>
            </div>
          </div>
          <div className="mt-12 px-16 h-auto">
            <div className="bg-zinc-800 w-full h-[0.5px] px-[-10px]"></div>
            <div>
              {user.posts.length === 0 ?
                <div className="py-32 flex justify-center items-center">
                  <NotPublished /> 
                </div> :
                <div>
                  
                </div>
              }
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}