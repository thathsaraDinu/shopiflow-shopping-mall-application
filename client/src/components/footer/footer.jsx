import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-600 to-purple">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <span className="text-xl font-bold text-white">
                ShopiFlow
              </span>
            </Link>
            <p className="text-sm text-white/80">
              Your one-stop destination for a premium
              shopping experience. Discover the latest
              trends and shop with confidence.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
              >
                <FaFacebookF className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
              >
                <FaTwitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
              >
                <FaInstagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
              >
                <FaYoutube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                'About Us',
                'Contact',
                'FAQs',
                'Store Locations',
                'Careers',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <FaMapMarkerAlt className="h-5 w-5 text-purple-300" />
                123 Shopping Street, Mall City, MC 12345
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <FaPhone className="h-5 w-5 text-purple-300" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <FaEnvelope className="h-5 w-5 text-purple-300" />
                contact@shopiflow.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Newsletter
            </h3>
            <p className="text-sm text-white/80">
              Subscribe to our newsletter for the latest
              updates and exclusive offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the page from reloading
                setTimeout(() => {
                  toast.success('Successful');
                }, 400); // Show toast message after 1 second
              }}
              className="flex gap-2"
            >
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-purple-500 text-white hover:bg-purple-400">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-white/80">
              © {new Date().getFullYear()} ShopiFlow. All
              rights reserved.
            </p>
            <div className="flex gap-4">
              {[
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
