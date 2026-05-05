import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Admin-panel.css'

const swalConfig = {
  background: 'linear-gradient(to right, #0d1a64, #24163e)',
  color: '#fff',
  confirmButtonColor: '#646cff',
}

const AdminPanel = () => {
  const [alumnos, setAlumnos] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerAlumnos = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/alumnos')
        const data = await res.json()
        setAlumnos(data)
      } catch {
        Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: 'No se pudieron cargar los alumnos.' })
      } finally {
        setCargando(false)
      }
    }
    obtenerAlumnos()
  }, [])

  const eliminarAlumno = async (id) => {
    const confirm = await Swal.fire({
      ...swalConfig,
      icon: 'warning',
      title: '¿Eliminar alumno?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e03131',
      cancelButtonColor: '#444',
    })

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/alumnos/${id}`, { method: 'DELETE' })
        setAlumnos(prev => prev.filter(a => a.id !== id))
        Swal.fire({ ...swalConfig, icon: 'success', title: 'Eliminado', text: 'Alumno eliminado correctamente.', confirmButtonText: 'Ok' })
      } catch {
        Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: 'No se pudo eliminar el alumno.' })
      }
    }
  }

  const cerrarSesion = () => {
    Swal.fire({
      ...swalConfig,
      icon: 'question',
      title: '¿Cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e03131',
      cancelButtonColor: '#444',
    }).then((result) => {
      if (result.isConfirmed) navigate('/admin')
    })
  }

  return (
    <div className="adminpanel-wrapper">
      <div className="adminpanel-container">
        <div className="adminpanel-header">
          <h1 className="adminpanel-titulo">Panel Admin</h1>
          <button className="adminpanel-logout" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>

        <div className="adminpanel-stats">
          <div className="stat-card">
            <span className="stat-numero">{alumnos.length}</span>
            <span className="stat-label">Alumnos registrados</span>
          </div>
        </div>

        {cargando ? (
          <p className="adminpanel-cargando">Cargando alumnos...</p>
        ) : alumnos.length === 0 ? (
          <p className="adminpanel-vacio">No hay alumnos registrados 📭</p>
        ) : (
          <div className="alumnos-grid">
            {alumnos.map((a) => (
              <div className="alumno-card" key={a.id}>
                <div className="alumno-header">
                  <div className="alumno-avatar">
                    {a.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="alumno-info">
                    <h3>{a.nombre}</h3>
                    <p>{a.codigo}</p>
                  </div>
                  <span className="alumno-fecha">
                    {new Date(a.fecha_registro).toLocaleDateString()}
                  </span>
                </div>
                <div className="alumno-detalles">
                  <span>🎓 {a.carrera}</span>
                  <span>📧 {a.email}</span>
                  <span>📱 {a.telefono || 'Sin teléfono'}</span>
                </div>
                <button
                  className="alumno-btn-eliminar"
                  onClick={() => eliminarAlumno(a.id)}
                >
                  🗑 Eliminar alumno
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel