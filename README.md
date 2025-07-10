# ExamReview PH - Entrance Exam Reviewer E-commerce Site

A comprehensive e-commerce platform for Filipino students to find and purchase curated entrance exam review materials for UPCAT, ACET, DCAT, and other Philippine college entrance exams.

## Features

### Frontend
- **Modern Landing Page**: Clean, responsive design with hero section and call-to-action
- **Subject-based Navigation**: Filter reviewers by Math, English, Filipino, Logic, and Reading
- **Reviewer Cards**: Display title, description, difficulty level, price, and purchase links
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **SEO Optimized**: Meta tags and structured data for better search engine visibility

### Backend
- **Local Storage Database**: JSON-based data storage with localStorage persistence
- **Simple Authentication**: Demo admin credentials for admin access
- **Data Persistence**: Reviewers stored in browser localStorage
- **CRUD Operations**: Full create, read, update, delete functionality

### Admin Dashboard
- **Protected Routes**: Admin-only access with authentication
- **Full CRUD Operations**: Add, edit, delete, and view reviewers
- **Form Validation**: Client-side and server-side validation
- **Real-time Updates**: Instant UI updates after data changes

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Local Storage, JSON data management
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## Data Structure

The application uses a TypeScript interface for reviewers:

```typescript
type Reviewer = {
  id: string
  title: string
  description: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  price: number
  payment_url: string
  created_at: string
}
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd examreview-ph
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main site: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin`

### Setting Up Admin Access

**Demo Admin Credentials:**
- Email: `admin@examreview.ph`
- Password: `admin123`

Use these credentials to access the admin dashboard at `/admin`.

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Deploy**
   - Push to your Git repository
   - Vercel will automatically deploy on every push

### Production Considerations

- **Domain Setup**: Configure your custom domain in Vercel
- **SSL Certificate**: Automatically provided by Vercel
- **Performance**: Images are optimized, static assets are cached
- **Data Persistence**: Consider migrating to a real database for production use

## Usage

### For Students
1. Browse reviewers by subject
2. Read descriptions and check difficulty levels
3. Click "Buy Now" to purchase through Ko-fi or Gumroad
4. Access purchased materials through the payment platform

### For Admins
1. Login at `/admin` with demo credentials (admin@examreview.ph / admin123)
2. Add new reviewers with title, description, subject, difficulty, price, and payment URL
3. Edit existing reviewers inline
4. Delete reviewers with confirmation
5. View all reviewers in the management dashboard

## Sample Data

The application comes pre-populated with 5 sample reviewers:
- Complete Math Reviewer for UPCAT (Hard, ₱299)
- English Grammar Essentials (Medium, ₱199)
- Filipino Literature and Language (Medium, ₱179)
- Logic and Critical Thinking (Hard, ₱249)
- Reading Comprehension Mastery (Easy, ₱149)

## File Structure

```
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Site header
│   ├── HeroSection.tsx      # Landing page hero
│   ├── ReviewerCard.tsx     # Individual reviewer card
│   └── ReviewerGrid.tsx     # Reviewer listing with filters
├── lib/
│   └── database.ts          # Local storage database functions
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email hello@examreview.ph or create an issue in the repository.

---

Built with ❤️ for Filipino students pursuing their dreams in higher education.