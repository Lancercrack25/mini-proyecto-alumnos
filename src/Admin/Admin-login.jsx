import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Admin-login.css'

const swalConfig = {
  background: 'linear-gradient(to right, #0d1a64, #24163e)',
  color: '#fff',
  confirmButtonColor: '#646cff',
  confirmButtonText: 'Entendido'
}

const AdminLogin = () => {
  const [form, setForm] = useState({ nombre: '', password: '' })
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre.trim() || !form.password.trim()) {
      Swal.fire({ ...swalConfig, icon: 'warning', title: 'Campos vacíos', text: 'Por favor ingresa tus credenciales.' })
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          ...swalConfig,
          icon: 'success',
          title: `¡Bienvenido ${form.nombre}!`,
          text: 'Acceso concedido.',
          confirmButtonText: 'Entrar'
        }).then(() => navigate('/admin/panel'))
      } else {
        Swal.fire({ ...swalConfig, icon: 'error', title: 'Acceso denegado', text: data.error })
      }
    } catch {
      Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: 'No se pudo conectar con el servidor.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="adminlogin-container">
      <div className="adminlogin-cuadro">
        <div className="adminlogin-header">
          <span className="adminlogin-icon">🔐</span>
          <h2 className="adminlogin-titulo">Panel Admin</h2>
          <p className="adminlogin-subtitulo">Acceso restringido</p>
        </div>
        <form className="adminlogin-form" onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label>Usuario</label>
            <input type="text" name="nombre" placeholder="Usuario admin" value={form.nombre} onChange={handleChange} />
          </div>
          <div className="form-grupo">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" className="adminlogin-btn" disabled={enviando}>
            {enviando ? 'Verificando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin