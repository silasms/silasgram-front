import Comment from "../../../../assets/comment"
import Heart from "../../../../assets/heart"
import Save from "../../../../assets/save"
import Share from "../../../../assets/share"
import User from "../../../../assets/user.jpg"

type props = {
  perfil: { name: string, image: string | null }
  image: string
  description: string | null
  likes: { name: string, image: string }[]
  createdAt: Date
}

export function Post({ perfil, image, description, likes }: props) {
  return (
    <div className="flex flex-col w-[468px]">
      <div className="flex gap-2 py-2 items-center">
        <img className="w-[32px] h-[32px] rounded-full" src={perfil.image || User} alt="" />
        <p className="font-semibold">{perfil.name}</p>
      </div>
      <img src={`data:image/png;base64,${image}`} alt="" className="mb-2 rounded" />
      <div className="flex justify-between">
        <div className="flex gap-3 mb-2">
          <Heart />
          <Comment />
          <Share />
        </div>
        <Save />
      </div>
      <p className="text-sm">Curtido por <span className="font-semibold">{likes[0].name}</span></p>
      <p><span className="font-semibold">{perfil.name} </span>{description}</p>
    </div>
  )
}