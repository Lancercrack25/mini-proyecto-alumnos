import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import pool from './conection.js'
import { initTablas } from './tablas.js'
import { helmet, limitador, limitadorLogin } from './seguridad.js'
import process from 'node:process'

await initTablas()

const app = express()

app.use(helmet())
app.use(limitador)
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// ✅ Registro de alumno
app.post('/alumnos/registro', async (req, res) => {
  const { nombre, codigo, carrera, email, telefono, password } = req.body

  if (!nombre || !codigo || !carrera || !email || !password) {
    return res.status(400).json({ error: '❌ Todos los campos son requeridos' })
  }

  try {
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO alumnos (nombre, codigo, carrera, email, telefono, password)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, codigo, carrera, email, telefono`,
      [nombre, codigo, carrera, email, telefono, hash]
    )
    res.json({ mensaje: '✅ Alumno registrado', alumno: result.rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: '❌ El código o email ya está registrado' })
    } else {
      res.status(500).json({ error: '❌ Error al registrar alumno' })
    }
  }
})

// ✅ Login de alumno
app.post('/alumnos/login', limitadorLogin, async (req, res) => {
  const { codigo, password } = req.body

  if (!codigo || !password) {
    return res.status(400).json({ error: '❌ Todos los campos son requeridos' })
  }

  try {
    const result = await pool.query(
      'SELECT * FROM alumnos WHERE codigo = $1', [codigo]
    )

    if (result.rowCount === 0) {
      return res.status(401).json({ error: '❌ Código no encontrado' })
    }

    const alumno = result.rows[0]
    const valid = await bcrypt.compare(password, alumno.password)

    if (!valid) {
      return res.status(401).json({ error: '❌ Contraseña incorrecta' })
    }

    const {  ...alumnoSinPassword } = alumno
    res.json({ mensaje: '✅ Login exitoso', alumno: alumnoSinPassword })
  } catch {
    res.status(500).json({ error: '❌ Error al iniciar sesión' })
  }
})

// ✅ Obtener alumno por id
app.get('/alumnos/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, codigo, carrera, email, telefono FROM alumnos WHERE id = $1',
      [req.params.id]
    )
    if (result.rowCount === 0) return res.status(404).json({ error: '❌ Alumno no encontrado' })
    res.json(result.rows[0])
  } catch {
    res.status(500).json({ error: '❌ Error al obtener alumno' })
  }
})

// ✅ Actualizar alumno
app.put('/alumnos/:id', async (req, res) => {
  const { nombre, carrera, email, telefono } = req.body
  try {
    const result = await pool.query(
      `UPDATE alumnos SET nombre=$1, carrera=$2, email=$3, telefono=$4
       WHERE id=$5 RETURNING id, nombre, codigo, carrera, email, telefono`,
      [nombre, carrera, email, telefono, req.params.id]
    )
    res.json({ mensaje: '✅ Alumno actualizado', alumno: result.rows[0] })
  } catch {
    res.status(500).json({ error: '❌ Error al actualizar alumno' })
  }
})

// ✅ Eliminar alumno
app.delete('/alumnos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM alumnos WHERE id = $1', [req.params.id])
    res.json({ mensaje: '✅ Alumno eliminado' })
  } catch {
    res.status(500).json({ error: '❌ Error al eliminar alumno' })
  }
})

// ✅ Obtener todos los alumnos (admin)
app.get('/admin/alumnos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, codigo, carrera, email, telefono, fecha_registro FROM alumnos ORDER BY fecha_registro DESC'
    )
    res.json(result.rows)
  } catch {
    res.status(500).json({ error: '❌ Error al obtener alumnos' })
  }
})

// ✅ Login admin
app.post('/admin/login', limitadorLogin, (req, res) => {
  const { nombre, password } = req.body
  if (nombre === process.env.AD_NAME && password === process.env.AD_PASSWORD) {
    res.json({ success: true, mensaje: '✅ Bienvenido admin' })
  } else {
    res.status(401).json({ success: false, error: '❌ Credenciales incorrectas' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`))