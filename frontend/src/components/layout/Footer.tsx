import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-3xl font-semibold">
                Glamour<span className="text-accent">Studio</span>
              </span>
            </Link>
            <p className="text-background/70 leading-relaxed mb-6">
              Your destination for premium beauty services, bridal makeup, and self-care treatments. 
              Where elegance meets expertise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Bridal', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-background/70 hover:text-accent transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/booking"
                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-300"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xl font-medium mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Bridal Makeup',
                'Hair Styling',
                'Skin Care',
                'Nail Art',
                'Baby Shower Makeup',
                'Party Makeup',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-background/70 hover:text-accent transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-background/70">
                  123 Beauty Lane, Fashion District,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex gap-3 text-background/70 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@glamourstudio.com" className="flex gap-3 text-background/70 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  hello@glamourstudio.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-background/70">
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Glamour Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
