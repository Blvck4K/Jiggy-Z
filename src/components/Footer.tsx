import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-yellow-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent mb-4">
              JIGGY-Z
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The ultimate destination for movie, TV, and gaming entertainment. Stay ahead of the curve with our futuristic take on pop culture.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon icon={<Youtube className="w-5 h-5" />} />
              <SocialIcon icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-white font-semibold mb-4">Content</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <FooterLink href="#" label="Latest Movies" />
              <FooterLink href="#" label="TV Series" />
              <FooterLink href="#" label="Gaming News" />
              <FooterLink href="#" label="Reviews" />
              <FooterLink href="#" label="Trailers" />
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <FooterLink href="#" label="About Us" />
              <FooterLink href="#" label="Contact" />
              <FooterLink href="#" label="Careers" />
              <FooterLink href="#" label="Press" />
              <FooterLink href="#" label="Advertise" />
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <FooterLink href="#" label="Privacy Policy" />
              <FooterLink href="#" label="Terms of Service" />
              <FooterLink href="#" label="Cookie Policy" />
              <FooterLink href="#" label="DMCA" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 Jiggy-Z. All rights reserved. Future of Entertainment.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-6 text-gray-400 text-sm">
            <span>Made with 🚀 for the future</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a
    href="#"
    className="p-2 bg-slate-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-500 text-gray-400 hover:text-black rounded-full transition-all duration-200 transform hover:scale-110"
  >
    {icon}
  </a>
);

const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <li>
    <a href={href} className="hover:text-yellow-400 transition-colors duration-200">
      {label}
    </a>
  </li>
);

export default Footer;