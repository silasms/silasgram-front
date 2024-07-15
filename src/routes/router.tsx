import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/home/login";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}