import pool from './conection.js'
import process from 'node:process'

export async function initTablas() {
  try {
    console.log('Inicializando tablas...')
    await pool.query(`
      CREATE TABLE IF NOT EXISTS alumnos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        codigo VARCHAR(20) UNIQUE NOT NULL,
        carrera VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        telefono VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        fecha_registro TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log('✅ Tablas creadas correctamente')
  } catch (error) {
    console.error('❌ Error al crear tablas:', error)
    process.exit(1)
  }
}