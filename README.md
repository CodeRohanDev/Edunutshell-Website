# EDUNUTSHELL - Modern Learning Management System

A cutting-edge dark-themed LMS + company website built with Next.js, featuring AI-powered learning, modern animations, and a futuristic design.

## 🌟 Features

### 🎨 Design & UI
- **Dark Theme**: Modern dark UI with neon blue, teal, purple, and pink accents
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Glowing Effects**: Neon glows, shadows, and hover effects
- **Modern Typography**: Clean sans-serif fonts with gradient text effects

### 🚀 Core Functionality
- **Authentication System**: Login, signup, and forgot password pages
- **Interactive Components**: Animated counters, carousels, and hover effects
- **AI Learning Mentor**: Floating mentor assistant with smooth animations and personalized guidance
- **Navigation**: Responsive navbar with mobile menu
- **Footer**: Comprehensive footer with social links and company info

### 📱 Pages Included
- **Homepage**: Hero section, stats, features, testimonials, partners
- **Authentication**: Login, signup, forgot password with split-screen design
- **Responsive Layout**: Mobile-first design approach

### 🛠️ Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom dark theme
- **Animations**: Framer Motion
- **Components**: React with TypeScript
- **Icons**: Lucide React
- **Carousels**: Swiper.js
- **Counters**: React CountUp

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edunutshell-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
edunutshell-frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   └── forgot-password/page.tsx # Password reset
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── PartnersSection.tsx
│   └── ui/                      # UI components
│       └── ChatBot.tsx          # AI Learning Mentor component
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Background**: `#0d0d0d` (deep charcoal)
- **Secondary Background**: `#121212` (dark gray)
- **Card Background**: `#1a1a1a` (lighter dark)
- **Accent Colors**: 
  - Neon Blue: `#00bfff`
  - Teal: `#00ffff`
  - Purple: `#8b5cf6`
  - Pink: `#ec4899`

### Typography
- **Headings**: Bold sans-serif with gradient effects
- **Body Text**: Light gray/white for readability
- **Font Family**: Inter (system fallback)

### Components
- **Cards**: Rounded corners (xl/2xl) with soft glowing borders
- **Buttons**: Gradient fills with hover glow and scaling
- **Inputs**: Glowing focus states with dark backgrounds

## ✨ Key Features Implementation

### Animations
- **Hero Section**: Fade-in and slide-up animations
- **Scroll Animations**: Sections fade-in on scroll (Framer Motion)
- **Hover Effects**: Cards lift with glowing shadows
- **Counters**: Animated count-up for statistics
- **Floating Elements**: Subtle looped animations

### Interactive Elements
- **AI Learning Mentor**: Floating mentor button with smooth pop-up animation and personalized guidance
- **Carousels**: Auto-slide testimonials and partners
- **Navigation**: Responsive with mobile hamburger menu
- **Forms**: Glowing input fields with validation states

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox for layouts

## 🔧 Customization

### Adding New Pages
1. Create a new folder in `app/` directory
2. Add `page.tsx` file with your component
3. Update navigation in `components/layout/Navbar.tsx`

### Modifying Theme
1. Update colors in `tailwind.config.js`
2. Modify CSS variables in `app/globals.css`
3. Adjust component styles as needed

### Adding Components
1. Create component in appropriate `components/` subfolder
2. Export from component file
3. Import and use in pages or other components

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

### Deploy
The project is ready to deploy on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Icons by Lucide React
- Animations powered by Framer Motion
- Built with Next.js and TailwindCSS

---

**EDUNUTSHELL** - Transforming education through technology 🚀