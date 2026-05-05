import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Panel.css'
import useAlumno from '../hooks/usealumno'

//esta es la interfaz la cual svera el alumno una vez que haya iniciado sesion, aqui podra ver su informacion y editarla, ademas de eliminar su cuenta o cerrar sesion
const swalConfig = {
  background: 'linear-gradient(to right, #0d1a64, #24163e)',
  color: '#fff',
  confirmButtonColor: '#646cff',
  confirmButtonText: 'Entendido'
}

const Panel = () => {
  const { alumno, form, handleChange, actualizarAlumno, eliminarAlumno, cerrarSesion } = useAlumno()
  const [editando, setEditando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!alumno) navigate('/')
  }, [alumno, navigate])

  const handleActualizar = async () => {
    const result = await actualizarAlumno(alumno.id)
    if (result.ok) {
      setEditando(false)
      Swal.fire({ ...swalConfig, icon: 'success', title: '✅ Datos actualizados', confirmButtonText: 'Ok' })
    } else {
      Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: result.error })
    }
  }

  const handleEliminar = async () => {
    const confirm = await Swal.fire({
      ...swalConfig,
      icon: 'warning',
      title: '¿Eliminar cuenta?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e03131',
      cancelButtonColor: '#444'
    })

    if (confirm.isConfirmed) {
      const result = await eliminarAlumno(alumno.id)
      if (result.ok) {
        Swal.fire({
          ...swalConfig,
          icon: 'success',
          title: 'Cuenta eliminada',
          text: 'Tu cuenta fue eliminada correctamente.',
          confirmButtonText: 'Ok'
        }).then(() => navigate('/'))
      } else {
        Swal.fire({ ...swalConfig, icon: 'error', title: 'Error', text: result.error })
      }
    }
  }

  const handleSalir = () => {
    Swal.fire({
      ...swalConfig,
      icon: 'question',
      title: '¿Cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e03131',
      cancelButtonColor: '#444'
    }).then((result) => {
      if (result.isConfirmed) {
        cerrarSesion()
        navigate('/')
      }
    })
  }

  if (!alumno) return null

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-titulo">Mi Perfil</h1>
        <button className="panel-salir" onClick={handleSalir}>Cerrar sesión</button>
      </div>

      <div className="panel-card">
        <div className="panel-avatar">
          {alumno.nombre.charAt(0).toUpperCase()}
        </div>

        {!editando ? (
          <div className="panel-info">
            <div className="info-grupo">
              <span className="info-label">Nombre</span>
              <span className="info-valor">{alumno.nombre}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Código</span>
              <span className="info-valor">{alumno.codigo}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Carrera</span>
              <span className="info-valor">{alumno.carrera}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Email</span>
              <span className="info-valor">{alumno.email}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Teléfono</span>
              <span className="info-valor">{alumno.telefono || 'No registrado'}</span>
            </div>
            <div className="panel-botones">
              <button className="btn-editar" onClick={() => setEditando(true)}>✏️ Editar info</button>
              <button className="btn-eliminar" onClick={handleEliminar}>🗑 Eliminar cuenta</button>
            </div>
          </div>
        ) : (
          <div className="panel-editar">
            <div className="form-grupo">
              <label>Nombre</label>
              <input type="text" name="nombre" value={form.nombre || ''} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Carrera</label>
              <input type="text" name="carrera" value={form.carrera || ''} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Email</label>
              <input type="text" name="email" value={form.email || ''} onChange={handleChange} />
            </div>
            <div className="form-grupo">
              <label>Teléfono</label>
              <input type="text" name="telefono" value={form.telefono || ''} onChange={handleChange} />
            </div>
            <div className="panel-botones">
              <button className="btn-guardar" onClick={handleActualizar}>💾 Guardar</button>
              <button className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Panel
