import { useState } from 'react'

const useAlumno = () => {
  const [alumno, setAlumnoState] = useState(() => {
    const data = localStorage.getItem('alumno')
    return data ? JSON.parse(data) : null
  })

  const [form, setForm] = useState(() => {
    const data = localStorage.getItem('alumno')
    return data ? JSON.parse(data) : {}
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const actualizarAlumno = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          carrera: form.carrera,
          email: form.email,
          telefono: form.telefono
        })
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('alumno', JSON.stringify(data.alumno))
        setAlumnoState(data.alumno)
        setForm(data.alumno)
        return { ok: true }
      } else {
        return { ok: false, error: data.error }
      }
    } catch {
      return { ok: false, error: 'No se pudo conectar con el servidor' }
    }
  }

  const eliminarAlumno = async (id) => {
    try {
      await fetch(`http://localhost:3000/alumnos/${id}`, { method: 'DELETE' })
      localStorage.removeItem('alumno')
      setAlumnoState(null)
      setForm({})
      return { ok: true }
    } catch {
      return { ok: false, error: 'No se pudo eliminar la cuenta' }
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('alumno')
    setAlumnoState(null)
    setForm({})
  }

  return { alumno, form, handleChange, actualizarAlumno, eliminarAlumno, cerrarSesion }
}

export default useAlumno