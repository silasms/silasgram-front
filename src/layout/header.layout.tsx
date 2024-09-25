import HomeIcon from './assets/home.svg?react';
import SearchIcon from './assets/search.svg?react';
import ExploreIcon from './assets/explore.svg?react';
import ReelsIcon from './assets/reels.svg?react';
import MessengerIcon from './assets/messenger.svg?react'
import NotificationIcon from './assets/notification.svg?react'
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export function HeaderLayout() {
  const { signedIn, user } = useAuth()

  if (!signedIn) return (<Outlet />)

  return (
    <div className="w-full h-full relative">
      <header className="flex flex-col gap-10 absolute z-10 pl-5 pt-10">
        <Link to='/' className='flex gap-3 cursor-pointer'><HomeIcon /><p className='lg:inline-block hidden'>Página inicial</p></Link>
        <Link to='/' className='flex gap-3 cursor-pointer'><SearchIcon /><p  className='lg:inline-block hidden'>Pesquisa</p></Link>
        <button disabled  className='flex gap-3'><ExploreIcon /><p  className='lg:inline-block hidden '>Reels</p></button>
        <button disabled className='flex gap-3'><ReelsIcon /><p  className='lg:inline-block hidden'>Mensagens</p></button>
        <Link to='/' className='flex gap-3'><MessengerIcon /><p  className='lg:inline-block hidden'>Notificações</p></Link>
        <button disabled className='flex gap-3'><NotificationIcon /><p  className='lg:inline-block hidden'>Criar</p></button>
        <Link to={`/${user.username}`} className='flex gap-3 cursor-pointer'><p  className='lg:inline-block hidden'>Perfil</p></Link>
      </header>
      <div className="relative w-full h-full overflow-auto">
        <Outlet/>
      </div>
    </div>
  )
}