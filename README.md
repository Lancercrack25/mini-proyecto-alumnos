# 🎓 Portal de Alumnos

Sistema web para la gestión de alumnos universitarios con autenticación, registro y panel administrativo.

---

## 📋 Descripción

Portal web que permite a los alumnos registrarse, iniciar sesión y gestionar su información personal. Incluye un panel administrativo para visualizar y gestionar todos los alumnos registrados.

---

## 🚀 Tecnologías utilizadas

### Frontend
- **React.js** con Vite
- **React Router DOM** para navegación
- **SweetAlert2** para alertas
- **CSS** personalizado con degradados modernos

### Backend
- **Node.js** con Express
- **PostgreSQL** como base de datos
- **bcrypt** para encriptación de contraseñas
- **Helmet** para seguridad de cabeceras HTTP
- **Express Rate Limit** para limitar peticiones
- **dotenv** para variables de entorno

---

## 📁 Estructura del proyecto
proyecto/
├── src/                          # Frontend React
│   ├── login/
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── registro/
│   │   ├── Registro.jsx
│   │   └── Registro.css
│   ├── alumnos-panel/
│   │   ├── Panel.jsx
│   │   └── Panel.css
│   ├── Admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLogin.css
│   │   ├── AdminPanel.jsx
│   │   └── AdminPanel.css
│   ├── hooks/
│   │   └── useAlumno.js
│   ├── App.jsx
│   └── App.css
│
└── Backend/                      # Backend Node.js
├── server.js
├── conection.js
├── tablas.js
├── seguridad.js
├── .env
└── package.json

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior
- npm v9 o superior

---

## 🛠️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/portal-alumnos.git
cd portal-alumnos
```

### 2. Configurar el Backend

```bash
cd Backend
npm install
```

Crea un archivo `.env` dentro de la carpeta `Backend` con el siguiente contenido:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=alumnos_db
PORT=3000
AD_NAME=admin
AD_PASSWORD=admin123
```

> ⚠️ Cambia `tu_contraseña` por la contraseña de tu PostgreSQL y personaliza `AD_NAME` y `AD_PASSWORD` para el acceso al panel admin.

### 3. Configurar el Frontend

```bash
cd ..
npm install
```

---

## ▶️ Ejecutar el proyecto

### Iniciar el Backend

```bash
cd Backend
npm run dev
```

Deberías ver en la terminal:
### Iniciar el Frontend

Abre otra terminal y corre:

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

---

## 🗺️ Rutas de la aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Login de alumnos |
| `/registro` | Registro de nuevo alumno |
| `/panel` | Perfil del alumno logueado |
| `/admin` | Login del panel administrativo |
| `/admin/panel` | Panel administrativo |

> 💡 Para acceder al panel admin presiona `Ctrl + Ñ` desde la pantalla de login de alumnos.

---

## 🔐 Funcionalidades

### Alumnos
- ✅ Registro con código de estudiante, nombre, carrera, email y teléfono
- ✅ Login con código de estudiante y contraseña
- ✅ Ver perfil personal
- ✅ Editar información personal
- ✅ Eliminar cuenta

### Panel Administrativo
- ✅ Login con credenciales del `.env`
- ✅ Ver todos los alumnos registrados
- ✅ Eliminar alumnos
- ✅ Contador de alumnos totales

---

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt**
- Cabeceras HTTP protegidas con **Helmet**
- Rate limiting para evitar ataques de fuerza bruta
- CORS configurado solo para `http://localhost:5173`
- Panel admin accesible solo con credenciales del servidor

---

## 📦 Scripts disponibles

### Backend
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con nodemon |
| `npm start` | Inicia el servidor en modo producción |

### Frontend
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia la app en modo desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la versión de producción |

---

## 🐛 Solución de problemas comunes

**Error: `Cannot use import statement outside a module`**
→ Agrega `"type": "module"` en el `package.json` del backend.

**Error: `no existe la base de datos alumnos_db`**
→ Asegúrate de que PostgreSQL esté corriendo y que las credenciales del `.env` sean correctas.

**Error: `Failed to resolve import`**
→ Verifica que los nombres de las carpetas y archivos coincidan exactamente con los imports en `App.jsx`.

---

## 👨‍💻 Autor

**Lancercrack25**
- GitHub: [@Lancercrack25](https://github.com/Lancercrack25)

---

## 📄 Licencia

Este proyecto está bajo la licencia de Lancercrack25.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
