# 🏥 SaludPlus — Sistema de Agendamiento Médico

Plataforma web para la reserva y gestión de horas médicas del centro **SaludPlus**, desarrollada con **Angular 17**, **Node.js/Express** y **PostgreSQL**, ejecutable en contenedores **Docker**.

---

## 📋 Funcionalidades

- ✅ Listado de médicos con especialidades
- ✅ Registro de citas (paciente, médico, fecha, hora)
- ✅ Validación de solapamiento de citas por médico
- ✅ Historial de citas con estados: Confirmada, Realizada, Cancelada
- ✅ Búsqueda de citas por paciente o médico
- ✅ Calendario visual con horas disponibles/ocupadas
- ✅ Alerta visual (badge) para citas confirmadas del día
- ✅ Estadísticas: citas por semana y mes
- ✅ Filtros por estado, especialidad y médico
- ✅ Componentes separados: calendario, formulario, lista
- ✅ Estilizado con Angular Material
- ✅ API REST modular (médicos, citas, stats)

---

## 🗂️ Estructura del Proyecto

```
saludplus/
├── backend/                  # API REST Node.js + Express
│   ├── config/
│   │   └── database.js       # Conexión Sequelize/PostgreSQL
│   ├── src/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── models/           # Modelos Sequelize (Medico, Cita)
│   │   ├── routes/           # Rutas Express
│   │   └── index.js          # Entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # App Angular 17
│   ├── src/app/
│   │   ├── modules/
│   │   │   ├── dashboard/    # Panel principal con estadísticas
│   │   │   ├── medicos/      # CRUD de médicos
│   │   │   ├── citas/        # Historial y gestión de citas
│   │   │   └── calendario/   # Vista de disponibilidad
│   │   └── shared/
│   │       ├── models/       # Interfaces TypeScript
│   │       ├── services/     # Servicios HTTP
│   │       └── components/   # AlertaBadge
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Ejecutar Localmente (sin Docker)

### Requisitos previos
- Node.js 18+
- PostgreSQL 14+
- Angular CLI: `npm install -g @angular/cli`

### Backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npm install
npm run dev
# API disponible en http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
ng serve
# App disponible en http://localhost:4200
```

---

## 🐳 Ejecutar con Docker

### Requisitos previos
- Docker Desktop instalado y corriendo
- Docker Compose v2+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/LMS02025/saludplus.git
cd saludplus

# 2. Levantar todos los servicios
docker-compose up --build

# 3. Acceder a la aplicación
# Frontend: http://localhost
# API:      http://localhost:3000/api/health
```

### Detener los servicios

```bash
docker-compose down
# Para eliminar también los datos (volumen PostgreSQL):
docker-compose down -v
```

---

## 🔌 API REST — Endpoints

### Médicos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/medicos` | Listar todos los médicos |
| GET | `/api/medicos/:id` | Obtener médico por ID |
| POST | `/api/medicos` | Crear médico |
| PUT | `/api/medicos/:id` | Actualizar médico |
| DELETE | `/api/medicos/:id` | Desactivar médico |

### Citas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/citas` | Listar citas (con filtros) |
| GET | `/api/citas/calendario/:fecha` | Citas de una fecha |
| GET | `/api/citas/:id` | Obtener cita por ID |
| POST | `/api/citas` | Crear cita |
| PUT | `/api/citas/:id` | Actualizar cita |
| DELETE | `/api/citas/:id` | Cancelar cita |

### Estadísticas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/stats/resumen` | Citas semana/mes/próximas |

#### Filtros disponibles en GET /api/citas
```
?paciente=Juan
?medicoId=1
?estado=Confirmada
?especialidad=Cardiología
?fechaInicio=2024-01-01&fechaFin=2024-01-31
```

---

## 👥 Equipo

Desarrollado por **Luis Medina** como parte del proyecto académico SaludPlus.

> Repositorio: `https://github.com/LMS02025/saludplus.git`
