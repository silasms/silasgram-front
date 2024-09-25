import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Home } from "../pages/home";
import { Perfil } from "../pages/perfil";
import { AuthGuard } from "../guard/auth.guard";
import { HeaderLayout } from "../layout/header.layout";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<HeaderLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/accounts/emailsignup" element={<Signup />}/>
          <Route element={<AuthGuard isPrivate={true}/>}>
            <Route path=":username" element={<Perfil />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}