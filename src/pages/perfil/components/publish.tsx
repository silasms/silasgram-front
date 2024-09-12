type Props = {
  image: string
}

export function Publish({ image }: Props) {
  return (
    <img className="object-cover w-full h-full aspect-square" src={`data:image/png;base64,${image}`} alt="" />
  )
}