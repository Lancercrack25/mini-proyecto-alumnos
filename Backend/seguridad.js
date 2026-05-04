import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: '❌ Demasiadas peticiones, intenta más tarde' }
})

const limitadorLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: '❌ Demasiados intentos, intenta más tarde' }
})

export { helmet, limitador, limitadorLogin }