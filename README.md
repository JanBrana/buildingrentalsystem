# JEFARELID Building & Room Rental Management System

A web-based capstone project for managing commercial building rentals, rooms, tenants, contracts, payments, and utility billing.

## Features

- **Authentication & Role-Based Access** — Super Admin and Admin roles with protected routes
- **Dashboard** — Live statistics, recent payments, and expiring contract alerts
- **Building Management** — Add, edit, delete buildings with search
- **Room Management** — Track rooms per building with rent and occupancy status
- **Tenant Management** — Manage tenant companies and contact details
- **Contract Management** — Link tenants to rooms with lease terms; auto-updates room status
- **Payment Tracking** — Record rent, deposits, and mark payments as paid
- **Utility Billing** — Electricity and water meter readings with automatic amount calculation
- **Reports & Analytics** — Occupancy rates, revenue by building, tenant status summary, CSV export
- **User Management** — Super Admin can create and manage system users
- **Audit Logs** — All create/update/delete actions are logged with timestamps

## How to Run

1. Open the project folder: `buildingrentalsystem/`
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox)
3. Log in with one of the demo accounts below

No server or installation required — the system uses browser localStorage for data persistence.

## Demo Login Credentials

| Role         | Email                        | Password  |
|--------------|------------------------------|-----------|
| Super Admin  | superadmin@jefarelid.com     | admin123  |
| Admin        | admin@jefarelid.com          | admin123  |
| Staff        | staff@jefarelid.com          | staff123  |

**Super Admin** has access to User Management and Audit Logs. **Admin/Staff** can access all other modules.

## Project Structure

```
buildingrentalsystem/
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── buildings.html      # Building management
├── rooms.html          # Room management
├── tenants.html        # Tenant management
├── contracts.html      # Rental contracts
├── payments.html       # Payment records
├── utility.html        # Utility billing
├── reports.html        # Reports & analytics
├── users.html          # User management (Super Admin)
├── auditlogs.html      # Audit trail (Super Admin)
├── css/
│   └── style.css       # Application styles
└── js/
    └── app.js          # Core application logic
```

## Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla ES6+)
- localStorage for client-side data persistence

## Capstone Notes

This system demonstrates a complete rental property management workflow suitable for academic presentation and defense. Sample data is pre-loaded on first launch. To reset all data, clear browser localStorage for the site and refresh the page.

## Future Enhancements (Optional)

- Backend API with MySQL/PostgreSQL database
- Email notifications for expiring contracts
- PDF receipt generation
- Tenant self-service portal
- Mobile-responsive PWA

---

**JEFARELID CORP.** — Building and Room Rental Management System  
Capstone Project © 2025
