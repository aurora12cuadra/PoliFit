
# PoliFit - Plataforma de Gestión Nutricional

**Repositorio:** [PoliFit en GitHub](https://github.com/aurora12cuadra/PoliFit.git)

## Descripción

**PoliFit** es una plataforma de gestión diseñada para ayudar a nutriólogos a organizar, registrar y monitorear la información de sus pacientes de forma eficiente. A través de una interfaz web intuitiva, los nutriólogos pueden registrar datos personales, antecedentes médicos, estilo de vida, y planes alimenticios personalizados. La plataforma facilita la toma de decisiones y el seguimiento de cada caso, mejorando la calidad de atención y el cumplimiento de objetivos nutricionales.

## Características

- **Gestión de Pacientes**: Registro detallado de datos personales, antecedentes, actividad física y otros aspectos de estilo de vida.
- **Mediciones Clínicas**: Introducción y monitoreo de parámetros como IMC, peso, talla, entre otros.
- **Planes de Alimentación**: Generación de planes alimenticios y equivalencias, con opción de descarga en formato PDF.
- **Recordatorio de 24 Horas**: Registro diario de la alimentación del paciente para un análisis de hábitos alimenticios.
- **Responsividad**: Diseñado para adaptarse a diferentes dispositivos y tamaños de pantalla.

## Tecnologías

- **Frontend**: Next.js, Tailwind CSS, React Icons
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL
- **Control de Versiones**: Git y GitHub

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/aurora12cuadra/PoliFit.git
cd PoliFit
```

### 2. Instalar dependencias

Ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
npm install
```

### 3. Configuración de variables de entorno

Crea un archivo `.env` en el directorio raíz y define las variables necesarias para la conexión a la base de datos y otras configuraciones, por ejemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=polifit
```

### 4. Ejecución del proyecto

Para iniciar el backend y el frontend, ejecuta los siguientes comandos:

- Inicia el backend:
  
  ```bash
  npm run server
  ```

- Inicia el frontend:

  ```bash
  npm run dev
  ```

El frontend estará disponible en `http://localhost:3000`.

## Uso

- **Registro de Pacientes**: En la sección de “Nuevo Paciente” puedes registrar información detallada del paciente.
- **Antecedentes y Estilo de Vida**: Usa las pestañas de navegación para completar la información de antecedentes médicos, actividad física, y toxicomanías.
- **Mediciones y Planes**: Registra y consulta mediciones y genera planes alimenticios personalizados.
- **Exportación a PDF**: Utiliza el botón de descarga para guardar los planes de alimentación en formato PDF.



## Contacto

Para consultas o problemas, puedes contactarnos en [ipnpolifit@gmail.com](mailto:ipnpolifit@gmail.com).
