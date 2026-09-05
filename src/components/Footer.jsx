import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-8 py-16 bg-slate-50 text-brand-navy">
      <div className="grid grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-3">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Apostolic Church of Sri Lanka</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            One church family worshipping in Sinhala, Tamil and English across 102 congregations, from Point Pedro to Hambantota.
          </p>
        </div>

        {/* Column 2: Explore Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-brand-teal uppercase">Explore</h4>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <Link to="/churches" className="hover:text-brand-navy">Church directory</Link>
            <Link to="/events" className="hover:text-brand-navy">Events calendar</Link>
            <Link to="#" className="hover:text-brand-navy">Ministries</Link>
            <Link to="#" className="hover:text-brand-navy">Our beliefs & history</Link>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-brand-teal uppercase">National Office</h4>
          <div className="flex flex-col gap-4 text-sm text-gray-500">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-teal shrink-0" />
              <span>Moratuwa 26/8, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-teal shrink-0" />
              <span>+94 11 269 4410</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-teal shrink-0" />
              <span>office@apostolic.lk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="flex flex-col items-center justify-between pt-8 mt-16 text-xs text-gray-400 border-t border-gray-200 md:flex-row">
        <p>© 2026 Apostolic Church of Sri Lanka. All rights reserved.</p>
        <p className="mt-2 italic md:mt-0">"Go into all the world and preach the gospel" — Mark 16:15</p>
      </div>
    </footer>
  );
}