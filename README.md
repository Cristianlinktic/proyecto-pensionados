# Plataforma Pensionados – Prueba Técnica

Este proyecto implementa un flujo de autenticación en Next.js 13+ (App Router) con manejo de JWT y API simulada con MSW (Mock Service Worker).  
El objetivo es mostrar un flujo de login, dashboard protegido, perfil editable y cierre de sesión

---

##  Tecnologías utilizadas
- Next.js 13+ (App Router)
- React / TypeScript
- TailwindCSS** para estilos
- MSW (Mock Service Worker) para simular API REST
- JWT (simulado) para autenticación
- Middleware de Next.js para proteger rutas

---

## Estructura del proyecto

/app
  /login        → Página de inicio de sesión
  /dashboard    → Página protegida (requiere login)
  /me           → Página de perfil con edición de nombre
  /test         → Página de pruebas con logs detallados
  layout.tsx    → Layout global + Provider de MSW
  page.tsx      → Página inicial (Next.js por defecto)

/components
  LogoutButton.tsx
  MswProvider.tsx

/mocks
  browser.ts    → Inicializa MSW en cliente
  handlers.ts   → Define endpoints mockeados (login, refresh, perfil)

middleware.ts   → Middleware para proteger rutas privadas
globals.css     → Estilos globales (Tailwind + variables CSS)

---

##  Instalación y ejecución

1. Clonar el repositorio:
   git clone https://github.com/tu-usuario/plataforma-pensionados.git
   cd plataforma-pensionados

2. Instalar dependencias:
   npm install o pnpm install

3. Ejecutar en desarrollo:
   npm run dev

4. Abrir en el navegador:
   http://localhost:3000

---

## Credenciales de prueba

Usa este usuario para iniciar sesión en `/login`:

- **Email:** cristian.sabogal@linktic.com
- **Contraseña:** password

---

## 🛠️ Funcionalidades implementadas

- **Login (/login)**
  - Formulario con validación.
  - Envío de credenciales a `/users/login` (mock con MSW).
  - Guarda `accessToken` en `localStorage` y cookie.

- **Dashboard (/dashboard)**
  - Página protegida (solo accesible con token).
  - Muestra nombre, email y fecha de creación.
  - Botón para editar perfil → redirige a `/me`.
  - Botón de **Cerrar Sesión**.

- **Perfil (/me)**
  - Consulta datos del usuario con `GET /users/me`.
  - Permite actualizar el nombre con `PUT /users/me`.
  - Mensajes de éxito y error en español.
  - Tras guardar cambios, redirige al dashboard.

- **Protección de rutas**
  - `middleware.ts` redirige al login si no hay token.
