import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Registro.css'

const swalConfig = {
  background: 'linear-gradient(to right, #0d1a64, #24163e)',
  color: '#fff',
  confirmButtonColor: '#646cff',
  confirmButtonText: 'Entendido'
}

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '', codigo: '', carrera: '', email: '', telefono: '', password: '', confirmar: ''
  })
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre.trim() || !form.codigo.trim() || !form.carrera.trim() || !form.email.trim() || !form.password.trim()) {
      Swal.fire({ ...swalConfig, icon: 'warning', title: 'Campos vacíos', text: 'Por favor llena todos los campos requeridos.' })
      return
    }

    if (form.password !== form.confirmar) {
      Swal.fire({ ...swalConfig, icon: 'warning', title: 'Contraseñas no coinciden', text: 'Verifica que las contraseñas sean iguales.' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      Swal.fire({ ...swalConfig, icon: 'warning', title: 'Email inválido', text: 'Por favor ingresa un correo válido.' })
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('http://localhost:3000/alumnos/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          codigo: form.codigo,
          carrera: form.carrera,
          email: form.email,
          telefono: form.telefono,
          password: form.password
        })
      })
      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          ...swalConfig,
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ya puedes iniciar sesión.',
          confirmButtonText: 'Ir al login'
        }).then(() => navigate('/'))
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
    <div className="registro-container">
      <div className="registro-cuadro">
        <div className="registro-header">
          <span className="registro-icon">📝</span>
          <h2 className="registro-titulo">Crear cuenta</h2>
          <p className="registro-subtitulo">Regístrate para acceder al portal</p>
        </div>
        <form className="registro-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-grupo">
              <label>Nombre completo *</label>
              <input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Código de estudiante *</label>
              <input type="text" name="codigo" placeholder="Ej. 123401797" value={form.codigo} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Carrera *</label>
              <input type="text" name="carrera" placeholder="Tu carrera" value={form.carrera} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Email *</label>
              <input type="text" name="email" placeholder="Tu correo" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Teléfono</label>
              <input type="text" name="telefono" placeholder="Tu teléfono" value={form.telefono} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Contraseña *</label>
              <input type="password" name="password" placeholder="Tu contraseña" value={form.password} onChange={handleChange} />
            </div>
            <div className="form-grupo form-grupo-full">
              <label>Confirmar contraseña *</label>
              <input type="password" name="confirmar" placeholder="Confirma tu contraseña" value={form.confirmar} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="registro-btn" disabled={enviando}>
            {enviando ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>
        <p className="registro-login">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro