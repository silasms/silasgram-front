import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../service/axios"
import User from "../../assets/user.jpg"
import { NotPublished } from "./components/not-published"
import { useAuth } from "../../hooks/auth"
import { Publish } from "./components/publish"

interface User {
  followers: Follow[]
  following: Follow[]
  image: string
  name: string
  posts: {
    authorId: string
    image: string
  }[]
  username: string
}

interface Follow {
  followerId: string
  followingId: string
}



export function Perfil() {
  const { user : dbUser } = useAuth()
  const { username } = useParams()
  const [ user, setUser ]  = useState<User>()
  const [ isFollowing, setIsFollowing ] = useState<boolean>(false)

  useEffect(() => {
    async function getPerfil() {
      const { data } = await api.get(`user/getbyusername/${username}`)
      setUser(data)
      if (data?.followers === undefined) return
      for (const follower of data.followers) {
        setIsFollowing(follower.followingId === dbUser.id)
      }
    }
    getPerfil()
  }, [])

  const follow = async () => {
    await api.post('/user/follow', {
      followerUsername: dbUser?.username,
      username
    })
    setIsFollowing(true)
  }
  const unFollow = async () => {
    await api.post('/user/unfollow', {
      followerUsername: username,
      username: dbUser.username
    })
    setIsFollowing(false)
  }

  return (
    <div className="w-full">
      {user && (
        <div className="max-w-[935px] m-auto pt-10">
          <div className="flex justify-between px-24 md:px-44">
            <img className="w-[150px] h-[150px] rounded-full" src={User} alt="" />
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p>{user.username}</p>
                <div className="flex gap-3 text-sm font-semibold">
                  { dbUser.username === username ?
                      <button className="bg-zinc-600 px-2 py-1 rounded-lg">Editar perfil</button> :
                        isFollowing ?
                          <button className="py-1 px-4 rounded-lg bg-gray-500" onClick={unFollow}>Parar de seguir</button> :
                          <button className="py-1 px-4 rounded-lg bg-sky-500" onClick={follow}>Seguir</button>
                  }
                </div>
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
                <div className="py-32 flex justify-center items-center ">
                  <NotPublished /> 
                </div> :
                <div className="grid gap-x-1 grid-cols-3 mt-10">
                  {user.posts.map(post => {
                    return (<Publish image={post.image}/>)
                  })}
                </div>
              }
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}