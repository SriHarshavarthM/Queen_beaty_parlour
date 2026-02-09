# Glamour Studio - Beauty Parlour Website

<div align="center">

🌸 **Ethereal Bloom Studio** 🌸

*Where Beauty Meets Elegance*

</div>

---

## 📖 Overview

Glamour Studio is a comprehensive, full-stack beauty parlour website featuring a stunning React frontend and a robust Node.js backend. The platform enables customers to explore services, book appointments, view galleries, and contact the studio directly.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Online Booking** | Complete appointment booking system with date/time selection |
| **Service Catalog** | Detailed service listings with pricing and descriptions |
| **Gallery** | Filterable image gallery with lightbox viewing |
| **Contact Form** | Direct messaging to the studio |
| **Admin Dashboard** | Manage bookings and contact messages |
| **WhatsApp Integration** | Floating WhatsApp button for instant communication |
| **Responsive Design** | Beautiful UI across all devices |

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: TanStack React Query

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (sql.js - pure JavaScript)
- **Email**: Nodemailer (optional)

---

## 📁 Project Structure

```
ethereal-bloom-studio-main/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── assets/             # Images and static assets
│   │   ├── components/         # Reusable components
│   │   │   ├── home/           # Home page components
│   │   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   │   └── ui/             # UI components (shadcn)
│   │   ├── pages/              # Page components
│   │   │   ├── Index.tsx       # Home page
│   │   │   ├── Services.tsx    # Services listing
│   │   │   ├── Bridal.tsx      # Bridal packages
│   │   │   ├── Gallery.tsx     # Photo gallery
│   │   │   ├── Booking.tsx     # Appointment booking
│   │   │   ├── Contact.tsx     # Contact form
│   │   │   ├── About.tsx       # About page
│   │   │   └── AdminDashboard.tsx  # Admin panel
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Express Backend
│   ├── routes/
│   │   ├── bookings.js         # Booking API
│   │   ├── contact.js          # Contact API
│   │   ├── services.js         # Services API
│   │   ├── gallery.js          # Gallery API
│   │   └── testimonials.js     # Testimonials API
│   ├── data/                   # SQLite database
│   ├── database.js             # Database setup
│   ├── server.js               # Express server
│   └── package.json
│
└── DOCUMENTATION.md            # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd ethereal-bloom-studio-main
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Start the Backend Server
```bash
cd ../backend
npm run dev
# Server starts on http://localhost:3001
```

### Step 5: Start the Frontend Development Server
```bash
cd ../frontend
npm run dev
# Frontend starts on http://localhost:8080
```

### Step 6: Access the Application
- **Website**: http://localhost:8080
- **Admin Dashboard**: http://localhost:8080/admin
- **API Health Check**: http://localhost:3001/api/health

---

## 🔐 Admin Dashboard

Access the admin panel at `/admin` to manage bookings and contact messages.

**Default Password**: `glamour2024`

> ⚠️ **Important**: Change this password in production by modifying `AdminDashboard.tsx`

### Admin Features
- View all appointment bookings
- Update booking status (Pending → Confirmed → Completed)
- View contact form submissions
- Reply to messages via email
- Mark messages as read/replied

---

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status.

---

#### Bookings

**Create Booking**
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "service": "Bridal Makeup",
  "date": "2026-03-15",
  "time": "10:00 AM",
  "notes": "Optional notes"
}
```

**Get All Bookings** (Admin)
```http
GET /api/bookings
```

**Update Booking Status**
```http
PUT /api/bookings/:id/status
Content-Type: application/json

{
  "status": "confirmed"  // pending, confirmed, completed, cancelled
}
```

---

#### Contact Messages

**Submit Contact Form**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "message": "Your message here"
}
```

**Get All Messages** (Admin)
```http
GET /api/contact
```

**Update Message Status**
```http
PUT /api/contact/:id/status
Content-Type: application/json

{
  "status": "read"  // unread, read, replied
}
```

---

#### Services

**Get All Services**
```http
GET /api/services
```

**Get Services by Category**
```http
GET /api/services?category=bridal
```

---

#### Gallery

**Get Gallery Images**
```http
GET /api/gallery
```

**Get by Category**
```http
GET /api/gallery?category=Bridal
```

---

#### Testimonials

**Get Testimonials**
```http
GET /api/testimonials
```

---

## 📄 Pages Overview

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, services preview, testimonials, CTA |
| `/services` | Services | Complete service catalog with pricing |
| `/bridal` | Bridal | Bridal packages and wedding services |
| `/gallery` | Gallery | Filterable photo gallery with lightbox |
| `/booking` | Booking | Appointment booking form |
| `/contact` | Contact | Contact form and location info |
| `/about` | About | Studio story, team, and values |
| `/admin` | Admin | Admin dashboard (password protected) |

---

## 🎨 Customization

### Changing Contact Information
Edit the following files:
- `frontend/src/pages/Contact.tsx` - Phone, email, address
- `frontend/src/components/ui/FloatingWhatsApp.tsx` - WhatsApp number
- `frontend/src/components/layout/Footer.tsx` - Footer contact info

### Updating Services
Services are stored in the database. To modify:
1. Edit `backend/database.js` seed data
2. Delete `backend/data/glamour_studio.db`
3. Restart the backend server

### Changing Admin Password
Edit `ADMIN_PASSWORD` in `frontend/src/pages/AdminDashboard.tsx`

---

## 🌐 Deployment

### Production Build

**Frontend**
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

**Backend**
```bash
cd backend
NODE_ENV=production npm start
```

### Environment Variables

Create `.env` in the backend folder:
```env
PORT=3001
NODE_ENV=production
# Email configuration (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

---

## 📱 Features Showcase

### Home Page
- Stunning hero section with animated statistics
- Services preview with hover effects
- Client testimonials carousel
- Call-to-action sections

### Booking System
- Service selection
- Date and time picker
- Form validation
- Real-time submission to backend

### Gallery
- Category filtering (All, Bridal, Baby Shower, etc.)
- Smooth animations with Framer Motion
- Lightbox view for full images

### Admin Dashboard
- Booking management
- Message management
- Status updates
- Email reply links

---

## 🤝 Support

For any issues or questions:
- **Email**: hello@glamourstudio.com
- **Phone**: +91 98765 43210
- **WhatsApp**: Click the floating button on the website

---

<div align="center">

Made with ❤️ for Glamour Studio

</div>
