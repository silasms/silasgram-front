import { useAuth } from "../../hooks/auth"
import { Login } from "./login"
import { Timeline } from "./timeline"

export function Home() {
  const { signedIn } = useAuth()

  if  (signedIn) {
    return (<Timeline />)
  } else {
    return (<Login />)
  }
}