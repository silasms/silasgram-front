import { Link, useNavigate } from "react-router-dom";
import BlockIcon from '@mui/icons-material/Block';
import { api } from "../../service/axios";
import { useState } from "react";

export function Signup() {
  const navigate = useNavigate()
  const [ showUsernameError, setShowUsernameError ] = useState(false)
  const [ showEmailError, setShowEmailError ] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      password: (document.getElementById('password')  as HTMLInputElement).value,
      username: (document.getElementById('username')  as HTMLInputElement).value,
      email: (document.getElementById('email')  as HTMLInputElement).value
    }
    try {
      await api.post('user/register', user)
      navigate('/')
    } catch( err ) { /* empty */ }
  }

  const verifyEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    const validate =
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!validate) {
      setShowEmailError(true)
      return
    } else setShowEmailError(false)
    // eslint-disable-next-line prefer-const
    const searchEmail = await setTimeout( async () => {
      clearTimeout(searchEmail)
      const { data } = await api.post('user/verifyemail', { email })
      setShowEmailError(data)
    }, 500)
  }

  const verifyUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    const searchUsername = setTimeout( async () => {
      clearTimeout(searchUsername)
      const { data } = await api.post('user/verifyusername', { username })
      setShowUsernameError(data)
    }, 500)
  }

  const verifySubmit = () => {
    const user = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      password: (document.getElementById('password')  as HTMLInputElement).value
    }
    const submit = document.getElementById('submit') as HTMLInputElement
    if (showEmailError || showUsernameError || user.name.length <= 4 || user.password.length < 8) {
      submit.disabled = true
    } else submit.disabled = false
  }

  return (
    <div className="w-full h-screen">
      <div className="flex h-full justify-center items-center flex-col gap-3">
        <div className="flex flex-col outline outline-1 outline-gray-300 items-center px-10 py-8 w-[350px]">
          <i className="my-2 h-[51px] w-[175px]" style={{backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png")', backgroundPosition: '0px -52px'}}></i>
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 font-semibold text-center">Cadastre-se para ver fotos e vídeos dos seus amigos.</p>
            <button className="bg-sky-500 rounded-md text-white py-1.5 font-semibold flex justify-center items-center gap-2 text-sm"><span className="h-[16px] w-[16px]" style={{backgroundImage: 'url(https://static.cdninstagram.com/rsrc.php/v3/y5/r/TJztmXpWTmS.png)', backgroundPosition: '-414px -300px', backgroundRepeat: 'no-repeat'}}></span>Entrar com o Facebook</button>
          </div>
          <div className="flex justify-around items-center my-2 w-full">
            <div className="bg-gray-300 w-full h-[1px]"></div>
            <p className="text-gray-400 font-semibold text-xs mx-4">OU</p>
            <div className="bg-gray-300 w-full h-[1px]"></div>
          </div>
          <form className="flex flex-col w-full gap-3" onSubmit={onSubmit} onChange={verifySubmit}>
            <div className="flex items-center">
              <input className="bg-gray-50 py-2.5 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500 w-full" type="text" name="email" id="email" placeholder="Email" onChange={verifyEmail}/>
              <div className={`${!showEmailError && 'hidden'}`}>
                <BlockIcon className='ml-[-30px]' style={{fill: 'red'}}/>
              </div>
            </div>
            <input className="bg-gray-50 py-2.5 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500 w-full" type="text" name="name" id="name" placeholder="Nome completo"/>
            <div className="flex items-center">
              <input className="bg-gray-50 py-2.5 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500 w-full" type="text" name="username" onChange={verifyUsername} id="username" placeholder="Nome de usuário"/>
              <div className={`${!showUsernameError && 'hidden'}`}>
                <BlockIcon className='ml-[-30px]' style={{fill: 'red'}}/>
              </div>
            </div>
            <input className="bg-gray-50 py-2.5 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500 w-full" type="password" name="password" id="password" placeholder="Senha"/>
            <div className="flex flex-col gap-4">
              <p className="text-center text-xs text-gray-500">As pessoas que usam nosso serviço podem ter enviado suas informações de contato para o Instagram. <button className="text-blue-700">Saiba mais</button></p>
              <p className="text-center text-xs text-gray-500">Ao se cadastrar, você concorda com nossos <button className="text-blue-700">Termos</button>, <button className="text-blue-700">Política de Privacidade</button> e <button className="text-blue-700">Política de Cookies.</button></p>
              <button className="font-semibold text-white bg-sky-400 rounded-md w-full py-1.5 text-sm" type="submit" id="submit" disabled>Cadastre-se</button>
            </div>
          </form>
        </div>
        <div>
          <p className="outline outline-1 outline-gray-300 px-10 py-5 w-[350px] text-sm text-center">Tem uma conta? <Link className="text-sky-500 font-semibold" to='/'>Conecte-se</Link></p>
        </div>
      </div>
    </div>
  )
}