import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

const Footer = () => (
  <footer className="w-screen bg-[#171717] text-[#f7f3ef] pt-12 pb-6 px-4 sm:px-8 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-20">
      {/* Contact Info */}
      <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
        <h3 className="text-lg font-semibold mb-4 text-[#b08a47]">Contact</h3>
        <ul className="space-y-2 text-base">
          <li>info@touxproperties.com</li>
          <li>+1(786) 208-7879</li>
          <li>+234 815 160 8010</li>
        </ul>
        <div className="mt-6">
          <span className="font-semibold text-[#b08a47]">Follow Us:</span>
          <div className="inline-flex items-center gap-4 ml-3 mt-1">
            <Link href="#" aria-label="Facebook" className="text-[#f7f3ef] hover:text-[#b08a47] transition-colors text-base"><FontAwesomeIcon icon={faFacebookF} /></Link>
            <Link href="#" aria-label="X (Twitter)" className="text-[#f7f3ef] hover:text-[#b08a47] transition-colors text-base"><FontAwesomeIcon icon={faXTwitter} /></Link>
            <Link href="https://www.instagram.com/toux_properties/" aria-label="Instagram" className="text-[#f7f3ef] hover:text-[#b08a47] transition-colors text-base"><FontAwesomeIcon icon={faInstagram} /></Link>
          </div>
        </div>
      </div>
      {/* Quick Links */}
      <div className="flex-1 min-w-[180px] mb-8 md:mb-0">
        <h3 className="text-lg font-semibold mb-4 text-[#b08a47]">Quick Links</h3>
        <ul className="space-y-2 text-base">
          <li><Link href="/about-us" className="hover:text-[#b08a47] transition-colors">About Us</Link></li>
          <li><Link href="/services/faq" className="hover:text-[#b08a47] transition-colors">FAQ</Link></li>
          <li><Link href="/contact-us" className="hover:text-[#b08a47] transition-colors">Contact</Link></li>
        </ul>
      </div>
      {/* Operating Hours */}
      <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
        <h3 className="text-lg font-semibold mb-4 text-[#b08a47]">Operating Hours</h3>
        <ul className="space-y-2 text-base">
          <li>Monday - Friday: 8am - 5pm</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-[#b08a47]">Inspection Days</h3>
        <ul className="space-y-2 text-base">
          <li>Tuesday - Friday</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-[#b08a47] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#d3cdc6] gap-2">
      <span>©Toux Properties 2024 | All Rights Reserved</span>
      <Link href="/privacy" className="hover:text-[#b08a47] transition-colors">Privacy Policy</Link>
    </div>
  </footer>
);

export default Footer; 