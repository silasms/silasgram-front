import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Home } from "../pages/home";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/emailsignup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}