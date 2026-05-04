import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Registro from './registro/Registro'
import Panel from './alumnos/Panel'
import AdminLogin from './admin/AdminLogin'
import AdminPanel from './admin/AdminPanel'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App