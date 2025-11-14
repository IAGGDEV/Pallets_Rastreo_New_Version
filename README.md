# 📦 Pallets Premium - Sistema de Rastreo

Sistema profesional de rastreo de paquetes de Los Ángeles a México, construido con React + Vite + Tailwind CSS.

## 🎨 Características

- ✅ Diseño profesional inspirado en DHL
- ✅ Interfaz responsive (móvil, tablet, desktop)
- ✅ Búsqueda de múltiples números de rastreo
- ✅ Identidad de marca con colores corporativos
- ✅ Sección de preguntas frecuentes
- ✅ Footer con información de contacto completa

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de estilos
- **TypeScript** - Tipado estático
- **Lucide React** - Iconos modernos

## 🎨 Paleta de Colores

- **Amarillo Principal**: `#F5B800`
- **Negro**: `#1A1A1A`
- **Gris Texto**: `#666666`
- **Gris Claro**: `#F5F5F5`
- **Blanco**: `#FFFFFF`

## 📂 Estructura del Proyecto

```
pallets-rastreo/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Header con logo y contacto
│   │   ├── HeroSection.tsx  # Sección de búsqueda y FAQ
│   │   └── Footer.tsx       # Footer con info de contacto
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── style.css            # Estilos globales + Tailwind
├── public/                  # Assets estáticos
├── index.html              # HTML principal
└── package.json            # Dependencias
```

## 🛠️ Instalación y Desarrollo

### Requisitos
- Node.js 18+ 
- npm o yarn

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🌐 Deploy en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Selecciona el proyecto
3. Configura:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy automático con cada push a `main`

## 📝 Próximas Fases

### Fase 2: Página de Resultados
- [ ] Componente TrackingResults con timeline
- [ ] Estados predefinidos del paquete
- [ ] Información detallada del envío

### Fase 3: Integración Backend
- [ ] Conectar con n8n webhook
- [ ] Integración con Google Sheets
- [ ] Manejo de errores y estados de carga

### Fase 4: Mejoras UX
- [ ] Animaciones con Framer Motion
- [ ] Loading states mejorados
- [ ] Notificaciones toast

## 👤 Contacto

**Pallets Premium**  
📞 +1 (234) 567-890  
📧 contacto@palletspremium.com  
📍 Los Ángeles, California → México

---

**Desarrollado con ❤️ para Pallets Premium**

