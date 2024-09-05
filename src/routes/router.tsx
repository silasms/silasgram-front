import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Home } from "../pages/home";
import { Perfil } from "../pages/perfil";
import { AuthGuard } from "../guard/auth.guard";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/emailsignup" element={<Signup />}/>
        <Route element={<AuthGuard isPrivate={true}/>}>
          <Route path=":username" element={<Perfil />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}