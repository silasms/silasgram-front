import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/home/login";
import { Signup } from "../pages/signup";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/accounts/emailsignup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}