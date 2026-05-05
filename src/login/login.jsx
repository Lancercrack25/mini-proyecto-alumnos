import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Login.css'

const swalConfig = {
  background: 'linear-gradient(to right, #0d1a64, #24163e)',
  color: '#fff',
  confirmButtonColor: '#646cff',
  confirmButtonText: 'Entendido'
}

const Login = () => {
  const [form, setForm] = useState({ codigo: '', password: '' })
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'ñ') navigate('/admin')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.codigo.trim() || !form.password.trim()) {
      Swal.fire({ ...swalConfig, icon: 'warning', title: 'Campos vacíos', text: 'Por favor llena todos los campos.' })
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('http://localhost:3000/alumnos/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('alumno', JSON.stringify(data.alumno))
        Swal.fire({
          ...swalConfig,
          icon: 'success',
          title: `¡Bienvenido ${data.alumno.nombre}!`,
          text: 'Login exitoso.',
          confirmButtonText: 'Entrar'
        }).then(() => navigate('/Panel'))
      } else {
        Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: data.error })
      }
    } catch {
      Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: 'No se pudo conectar con el servidor.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-cuadro">
        <div className="login-header">
          <span className="login-icon">🎓</span>
          <h2 className="login-titulo">Portal Alumnos</h2>
          <p className="login-subtitulo">Ingresa con tu código de estudiante</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label>Código de estudiante</label>
            <input
              type="text"
              name="codigo"
              placeholder="Ej. 123401797"
              value={form.codigo}
              onChange={handleChange}
            />
          </div>
          <div className="form-grupo">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-btn" disabled={enviando}>
            {enviando ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
        <p className="login-registro">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}

export default Login