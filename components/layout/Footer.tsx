'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact', href: '/contact' },
  ]

  const services = [
    { name: 'LMS Platform', href: '/courses' },
    { name: 'Online Learning', href: '/courses' },
    { name: 'Certifications', href: '/courses' },
    { name: 'AI Support', href: '/support' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ]

  return (
    <footer className="bg-dark-secondary border-t border-dark-border">
      {/* Gradient divider */}
      <div className="h-0.5 bg-gradient-primary"></div>
      
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-text-secondary">
              Transform your learning experience with our cutting-edge LMS platform and comprehensive educational services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center
                           hover:border-accent-blue hover:shadow-glow transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-text-secondary hover:text-accent-blue transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-blue" />
                <span className="text-text-secondary">info@edunutshell.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-blue" />
                <span className="text-text-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent-blue" />
                <span className="text-text-secondary">123 Education St, Learning City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © 2024 EDUNUTSHELL. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-text-muted hover:text-accent-blue text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-text-muted hover:text-accent-blue text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer