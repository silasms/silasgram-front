import Camera from '../../../assets/camera.svg?react'

export function NotPublished() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <Camera className='mb-5' />
      <p className='font-bold text-3xl'>Ainda não há nenhuma publicação</p>
    </div>
  )
}