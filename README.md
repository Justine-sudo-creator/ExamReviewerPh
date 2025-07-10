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
- **Supabase Database**: PostgreSQL database with real-time capabilities
- **Cross-device Sync**: Data persists across all devices and accounts
- **Admin Authentication**: Secure admin access with session management
- **Data Persistence**: Reviewers stored in cloud database
- **CRUD Operations**: Full create, read, update, delete functionality
- **Fallback Support**: localStorage fallback when Supabase is not configured

### Admin Dashboard
- **Protected Routes**: Admin-only access with authentication
- **Full CRUD Operations**: Add, edit, delete, and view reviewers
- **Form Validation**: Client-side and server-side validation
- **Real-time Updates**: Instant UI updates after data changes
- **Image Management**: Support for product images with URL input

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Row Level Security (RLS)
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## Database Schema

### Reviewers Table
```sql
CREATE TABLE reviewers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  price integer NOT NULL,
  payment_url text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);
```

### Admin Users Table
```sql
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for production database)

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

3. **Set up Supabase (Recommended for production)**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Rename `.env.local.example` to `.env.local`
   - Update the environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Run database migrations**
   - In your Supabase dashboard, go to SQL Editor
   - Run the migration files in `supabase/migrations/` in order:
     1. `create_reviewers_table.sql`
     2. `create_admin_users_table.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main site: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin`

### Setting Up Admin Access

**Demo Admin Credentials:**
- Email: `admin@examreview.ph`
- Password: `admin123`

Use these credentials to access the admin dashboard at `/admin`.

## Database Setup

### Option 1: Supabase (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Configure Environment Variables**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Run Migrations**
   - Copy the SQL from `supabase/migrations/` files
   - Run them in your Supabase SQL Editor

### Option 2: localStorage (Development Only)

If Supabase is not configured, the app automatically falls back to localStorage for development purposes. This data will not persist across devices.

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Add your Supabase environment variables

3. **Deploy**
   - Push to your Git repository
   - Vercel will automatically deploy on every push

### Production Considerations

- **Database**: Use Supabase for production database
- **Authentication**: Implement proper authentication with Supabase Auth
- **Image Storage**: Use Supabase Storage or Cloudinary for image uploads
- **SSL Certificate**: Automatically provided by Vercel
- **Performance**: Images are optimized, static assets are cached

## Usage

### For Students
1. Browse reviewers by subject
2. Read descriptions and check difficulty levels
3. Click "Buy Now" to purchase through the payment page
4. Follow GCash payment instructions
5. Submit payment proof via Google Form
6. Receive materials via email within 24 hours

### For Admins
1. Login at `/admin` with demo credentials
2. Add new reviewers with title, description, subject, difficulty, price, and payment URL
3. Edit existing reviewers inline
4. Delete reviewers with confirmation
5. View all reviewers in the management dashboard
6. Changes sync across all devices automatically

## API Endpoints

The application uses Supabase's auto-generated REST API:

- `GET /rest/v1/reviewers` - Get all reviewers
- `POST /rest/v1/reviewers` - Create new reviewer
- `PATCH /rest/v1/reviewers?id=eq.{id}` - Update reviewer
- `DELETE /rest/v1/reviewers?id=eq.{id}` - Delete reviewer

## Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Public Read Access**: Anyone can view reviewers
- **Admin Write Access**: Only authenticated users can modify data
- **Session Management**: Admin sessions expire after 24 hours
- **Environment Variables**: Sensitive data stored in environment variables

## File Structure

```
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── payment/
│   │   └── page.tsx          # Payment page
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Site header
│   ├── HeroSection.tsx      # Landing page hero
│   ├── ReviewerCard.tsx     # Individual reviewer card
│   ├── ReviewerGrid.tsx     # Reviewer listing with filters
│   └── FAQSection.tsx       # FAQ section
├── lib/
│   ├── database.ts          # Database functions with Supabase integration
│   ├── supabase.ts          # Supabase client configuration
│   └── sampleReviewers.ts   # Sample data for fallback
├── supabase/
│   └── migrations/          # Database migration files
├── .env.local               # Environment variables
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