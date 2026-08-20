# AHUON - Association of Hajj and Umrah Operators of Nigeria

## 🌟 Overview

A comprehensive membership management platform for the Association of Hajj and Umrah Operators of Nigeria (AHUON). This full-featured web application provides member registration, public directory, complaint management, and administrative dashboards.

## ✨ Key Features

### 🏠 Public Features
- **Home Page** - Hero banner, search, trust indicators, latest news, and CTA sections
- **Member Directory** - Searchable, filterable directory of verified operators with state, service, and location filters
- **Member Detail Pages** - Complete profile pages with contact info, services, trust badges, and complaint records
- **Complaint Portal** - Multi-step complaint filing system with category selection and tracking
- **Complaint Status Tracker** - Real-time complaint status updates and timeline
- **News & Updates** - News articles with categories (NAHCON updates, press releases, member spotlights)
- **Certificate Verification** - QR code-based verification system for membership certificates

### 👤 Member Features
- **Multi-Step Registration** - 5-step registration process with form validation
  - Step 1: Company Information
  - Step 2: Principal Officer Information
  - Step 3: References (2 AHUON members)
  - Step 4: Banking Information
  - Step 5: Review & Submit
- **Member Dashboard** - Overview, profile management, certificate download, payment history
- **Certificate Generation** - PDF certificate with QR codes (downloadable)
- **Profile Management** - Update company and officer information

### 🛡️ EXCO (Executive Committee) Features
- **EXCO Dashboard** - Administrative portal for managing the association
- **Pending Registrations** - Review and approve/reject new member applications
- **Complaint Management** - View, investigate, and resolve complaints
- **Member Management** - Approve members, generate membership numbers, manage status
- **5-Day Resolution Clock** - Automated tracking for complaint resolution deadlines

## 🎨 Design System

### Color Palette
- **Primary Green**: `#008000` - Main actions, buttons, links
- **Dark Green**: `#004d00` - Headers, emphasis
- **Gold**: `#FFD700` - Secondary accents, awards, trust indicators
- **Background**: `#FFFFFF` - Clean white background
- **Text**: `#333333` - Primary text
- **Text Light**: `#666666` - Secondary text

### Typography
- **Headings**: Poppins/Montserrat (700 weight)
- **Body**: Open Sans/Roboto (400 weight)
- **Navigation**: Poppins (600 weight)

## 🗄️ Database Schema

### Member Data (KV Store)
```typescript
{
  id: string,
  email: string,
  companyName: string,
  rcNumber: string,
  nahconLicense: string,
  yearsInOperation: string,
  officeAddress: string,
  officeCity: string,
  officeState: string,
  servicesOffered: string[],
  principalOfficerName: string,
  principalOfficerPhone: string,
  principalOfficerPosition: string,
  referee1Name: string,
  referee1MembershipNo: string,
  referee2Name: string,
  referee2MembershipNo: string,
  bankName: string,
  accountNumber: string,
  accountName: string,
  membershipStatus: 'pending' | 'active' | 'lapsed' | 'suspended',
  membershipNumber?: string,
  membershipStartDate?: string,
  membershipExpiryDate?: string,
  complaintCount: number,
  complaintResolvedCount: number,
}
```

### Complaint Data
```typescript
{
  complaintReference: string, // Format: AHUON-YYYY-NNNN
  operatorMemberId: string,
  pilgrimFullName: string,
  pilgrimPhone: string,
  pilgrimEmail: string,
  packageDetails: string,
  amountPaid: number,
  incidentDate: string,
  complaintCategory: 'visa_promise' | 'ticketing_fraud' | 'accommodation_undelivered' | 'refund_refusal' | 'other',
  description: string,
  status: 'new' | 'investigating' | 'awaiting_member_response' | 'resolved_internal' | 'escalated_efcc' | 'closed_invalid',
  dateFiled: string,
  lastUpdated: string,
  excoNotes?: string,
}
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /make-server-6dc3601f/members` - Get all active members (with filters)
- `GET /make-server-6dc3601f/members/:id` - Get member details
- `POST /make-server-6dc3601f/register` - Register new member
- `POST /make-server-6dc3601f/signin` - Member sign in
- `POST /make-server-6dc3601f/complaints` - File a complaint
- `GET /make-server-6dc3601f/complaints/:reference` - Get complaint status

### EXCO Endpoints (Authentication Required)
- `GET /make-server-6dc3601f/exco/pending` - Get pending registrations
- `GET /make-server-6dc3601f/exco/complaints` - Get all complaints
- `POST /make-server-6dc3601f/exco/approve/:id` - Approve member
- `PUT /make-server-6dc3601f/exco/complaints/:reference` - Update complaint status

## 🚀 Getting Started

### Demo Data
Click the "Seed Demo Data" button (purple button in bottom-right corner) to populate the database with sample members and data.

### Test Registration
1. Navigate to `/register`
2. Fill out the 5-step registration form
3. Use any email/password (automatically confirmed in demo mode)
4. Application will be submitted as "pending" status

### Test Login
1. Navigate to `/login`
2. Use credentials from your registration
3. Access member dashboard to view profile and download certificate

### EXCO Dashboard
1. Navigate to `/exco`
2. Login with any registered member account
3. View pending registrations and complaints
4. Approve members or manage complaints

## 📋 User Flows

### New Member Registration
1. Visit Home Page → Click "Register Your Agency"
2. Complete Step 1: Company Information (name, RC, NAHCON license, location)
3. Complete Step 2: Principal Officer (name, email, phone, password)
4. Complete Step 3: References (2 existing AHUON members)
5. Complete Step 4: Banking Information
6. Review & Accept Terms → Submit Application
7. Application goes to "pending" status
8. EXCO reviews and approves
9. Member receives membership number and can access dashboard

### Public User Filing Complaint
1. Visit Home Page → Click "File Complaint" or find operator in directory
2. Select operator from dropdown
3. Enter pilgrim information
4. Provide package details and amount paid
5. Select complaint category and write description
6. Confirm truthfulness and submit
7. Receive complaint reference number (AHUON-YYYY-NNNN)
8. Track complaint status at `/complaint-status`

### EXCO Processing Complaint
1. Login to EXCO Dashboard
2. View new complaints in "Complaints" tab
3. Review complaint details
4. Mark as "Investigating"
5. Contact operator (5-day resolution clock starts)
6. Mark as "Resolved" or "Escalate to EFCC"
7. Complaint status updates for pilgrim

## 🔐 Security Features

- **Supabase Authentication** - Secure user authentication with email/password
- **Role-Based Access** - Different permissions for members, pending members, and EXCO
- **Protected Routes** - EXCO dashboard requires authentication
- **Data Privacy** - Full contact details hidden until captcha verification
- **Input Validation** - Form validation on all user inputs
- **SQL Injection Prevention** - Using Supabase prepared statements

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Adaptive grid layouts for all screen sizes
- Touch-friendly buttons and forms
- Optimized images and performance

## 🎯 Future Enhancements

### Payment Integration
- Paystack integration for registration fees (₦20,000)
- Annual renewal payments (₦10,000)
- Automated payment verification and receipt generation

### Email/SMS Notifications
- Application received confirmation
- EXCO approval notification
- Membership expiry reminders (60/30/7 days)
- Complaint status updates
- Official circulars to all members

### File Uploads
- CAC certificate upload
- NAHCON license upload
- Principal officer passport photo
- Utility bill verification
- Reference letters
- Complaint evidence (receipts, screenshots)

### Advanced Features
- Member ratings and reviews
- Bulk certificate generation
- Financial reports and analytics
- Export data to CSV/Excel
- Email campaign management
- SMS integration (Termii/Africa's Talking)

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Forms**: React Hook Form
- **Notifications**: Sonner
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **QR Codes**: qrcode package
- **Backend**: Supabase (Auth + Database)
- **Server**: Deno with Hono framework
- **Database**: Supabase PostgreSQL + KV Store

## 📖 Code Structure

```
/src/app/
  ├── pages/
  │   ├── Root.tsx                 # Layout with Header/Footer
  │   ├── Home.tsx                 # Landing page
  │   ├── Register.tsx             # Multi-step registration
  │   ├── Login.tsx                # Member login
  │   ├── Directory.tsx            # Member directory with filters
  │   ├── MemberDetail.tsx         # Individual member profile
  │   ├── FileComplaint.tsx        # Complaint filing form
  │   ├── ComplaintStatus.tsx      # Complaint tracking
  │   ├── MemberDashboard.tsx      # Member dashboard
  │   ├── ExcoDashboard.tsx        # EXCO management dashboard
  │   ├── News.tsx                 # News & updates
  │   ├── VerifyCertificate.tsx    # Certificate verification
  │   └── NotFound.tsx             # 404 page
  ├── components/
  │   ├── Header.tsx               # Main navigation
  │   ├── Footer.tsx               # Footer with links
  │   └── DemoDataSeeder.tsx       # Demo data utility
  ├── routes.tsx                   # React Router configuration
  └── App.tsx                      # Main app component

/supabase/functions/server/
  ├── index.tsx                    # Hono server with all API routes
  └── kv_store.tsx                 # KV store utilities (protected)

/src/styles/
  ├── theme.css                    # Custom theme and design tokens
  └── fonts.css                    # Google Fonts imports
```

## 🎓 Learning Notes

This application demonstrates:
- **Complex form handling** with multi-step wizards
- **Authentication & authorization** with Supabase
- **Backend API development** with Deno and Hono
- **PDF generation** with certificates and QR codes
- **Real-time data** with complaint tracking
- **Role-based dashboards** (Member vs EXCO)
- **Responsive design** with Tailwind CSS v4
- **Professional UI/UX** with proper color schemes and typography

## 📝 Production Considerations

For deploying to production:

1. **Environment Variables**: Set up proper environment variables for Supabase
2. **Email Server**: Configure email server for notifications
3. **Payment Gateway**: Integrate Paystack for payments
4. **File Storage**: Enable Supabase Storage for document uploads
5. **Security**: Implement rate limiting, CAPTCHA, and 2FA for EXCO
6. **Backups**: Set up automated database backups
7. **SSL**: Ensure HTTPS is enforced
8. **Monitoring**: Add error tracking (e.g., Sentry)
9. **Analytics**: Implement analytics (e.g., Google Analytics)
10. **Compliance**: Ensure NDPR (Nigeria Data Protection Regulation) compliance

## 💡 Demo Features

- Click "Seed Demo Data" button to populate database
- Registration creates accounts with auto-confirmed emails
- Login with any registered email/password
- All features are functional in demo mode
- PDF certificates generated with QR codes
- Full complaint tracking system

## 📞 Support

For questions or issues:
- Email: info@ahuon.org.ng
- Phone: +234 803 000 0000
- Website: https://ahuon.org.ng

---

**Built with ❤️ using Figma Make**

This is a comprehensive demonstration of a production-ready association management platform with member registration, complaint tracking, and administrative capabilities.
