import { Link } from "react-router-dom";
import { api } from "../../../service/axios";
import { useAuth } from "../../../hooks/auth";

export function Login() {
  const { signin } = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = {
      user: (document.getElementById('user') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    }
    const { data } = await api.post('user/login', { user: user.user, password: user.password })
    const response = await api.post('user/decodetoken', { token: data })
    signin(data, response.data)
  }

  return (
    <main className="w-full h-screen">
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col outline outline-1 outline-gray-300 px-10 gap-4 py-5">
            <div className="flex justify-center">
              <i className="my-5" style={{backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png")', height: '51px', backgroundPosition: '0px -52px', width: '175px'}}></i>
            </div>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <input className="bg-gray-100 py-2 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500" type="text" name="user" id="user" placeholder="Nome de usuário ou email"/>
              <input className="bg-gray-100 py-2 px-2 text-xs outline outline-1 outline-gray-300 placeholder:text-gray-500" type="password" name="password" id="password" placeholder="Senha"/>
              <button className="font-semibold text-white bg-sky-400 rounded-md px-28 py-1" type="submit">Entrar</button>
            </form>
            <div className="flex justify-around items-center my-2">
              <div className="bg-gray-300 w-full" style={{height: '1.6px'}}></div>
              <p className="text-gray-400 font-semibold text-xs mx-4">OU</p>
              <div className="bg-gray-300 w-full" style={{height: '1.6px'}}></div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span style={{backgroundImage: 'url(https://static.cdninstagram.com/rsrc.php/v3/y5/r/TJztmXpWTmS.png)', backgroundPosition: '-414px -259px', height: '16px', width: '16px', backgroundRepeat: 'no-repeat'}}></span>
              <button className="text-blue-900 font-semibold text-sm">Entrar com o Facebook</button>
            </div>
            <button className="text-xs">Esqueceu a senha?</button>
          </div>
          <div className="flex flex-col outline outline-1 outline-gray-300 gap-4 justify-center items-center py-5">
            <p className="text-sm">Não tem conta? <Link className="cursor-pointer text-sky-500 font-semibold" to="/accounts/emailsignup">Cadastre-se</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}