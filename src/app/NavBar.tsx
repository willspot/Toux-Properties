"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { isAuthenticated, logout } from "./utils/auth";
import { useRouter } from 'next/navigation';

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    dropdown: [
      { label: "Listing", href: "/services/listing" },
      { label: "Our Services", href: "/services/our-services" },
      { label: "FAQ", href: "/services/faq" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
  {
    label: "Partnership",
    dropdown: [
      { label: "Sales Partnership", href: "/partnership/sales-partnership" },
      { label: "Investor/Investment Partnership", href: "/partnership/investor-investment-partnership" },
    ],
  },
];

function Dropdown({ label, items, mobile = false, onLogout }: { label: string; items: { label: string; href: string }[]; mobile?: boolean; onLogout?: () => void }) {
  const [open, setOpen] = useState(false);
  
  if (mobile) {
    return (
      <div className="w-full">
        <button
          className="flex items-center justify-between w-full py-2 px-4 font-medium text-[15px] md:text-[13px] whitespace-nowrap text-left text-white"
          onClick={() => setOpen((o) => !o)}
        >
          <span>{label}</span>
          <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="pl-6">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center py-2 text-white whitespace-nowrap font-medium text-[14px] md:text-[12px] transition-colors duration-200 group">
                <span className="flex items-center w-full">
                  <span className="block h-[2px] bg-white rounded transition-all duration-300 w-0 mr-0 hover:w-6 hover:mr-2 self-center"></span>
                  <span className="transition-all duration-300 hover:ml-2">
                    {item.label === "Investor/Investment Partnership"
                      ? <span>Investor/Investment<br />Partnership</span>
                      : item.label}
                  </span>
                </span>
              </Link>
            ))}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center py-2 text-red-300 hover:text-red-200 whitespace-nowrap font-medium text-[14px] md:text-[12px] transition-colors duration-200 group w-full text-left"
              >
                <span className="flex items-center w-full">
                  <span className="block h-[2px] bg-red-300 rounded transition-all duration-300 w-0 mr-0 hover:w-6 hover:mr-2 self-center"></span>
                  <span className="transition-all duration-300 hover:ml-2">
                    Logout
                  </span>
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 focus:outline-none font-medium text-[15px] lg:text-[15px] md:text-[13px] whitespace-nowrap transition-colors duration-200">
        {label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center px-4 py-2 text-[#231f20] hover:bg-gray-100 whitespace-nowrap font-medium text-[14px] md:text-[12px] transition-colors duration-200 group">
            <span className="flex items-center w-full">
              <span className="block h-[2px] bg-[#b08a47] rounded transition-all duration-300 w-0 mr-0 hover:w-6 hover:mr-2 self-center"></span>
              <span className="transition-all duration-300 hover:ml-2">
                {item.label === "Investor/Investment Partnership"
                  ? <span>Investor/Investment<br />Partnership</span>
                  : item.label}
              </span>
            </span>
          </Link>
        ))}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 whitespace-nowrap font-medium text-[14px] md:text-[12px] transition-colors duration-200 group w-full text-left"
          >
            <span className="flex items-center w-full">
              <span className="block h-[2px] bg-red-600 rounded transition-all duration-300 w-0 mr-0 hover:w-6 hover:mr-2 self-center"></span>
              <span className="transition-all duration-300 hover:ml-2">
                Logout
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(isAuthenticated());
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.replace('/account/agent-account');
  };

  // Dynamic account items based on authentication status
  const getAccountItems = () => {
    if (isLoggedIn) {
      return [
        { label: "Add Listing", href: "/account/cpanel" },
        { label: "Edit Listing", href: "/account/cpanel/edit-listing" },
        { label: "Remove Listing", href: "/account/cpanel/remove-listing" },
      ];
    } else {
      return [
        { label: "Agent Account", href: "/account/agent-account" },
      ];
    }
  };

  const accountItems = getAccountItems();

  return (
    <nav className={`w-full flex items-center justify-between pl-8 h-24 bg-[#f8f4f0] sticky top-0 z-40 transition-shadow ${scrolled ? "shadow-lg" : ""}`}>
      {/* Logo */}
      <div className="flex items-center min-w-[110px] h-full">
        <Link href="/">
          <Image src="/images/logo.svg" alt="Toux Properties Logo" width={70} height={70} className="h-16 w-auto object-contain" priority />
        </Link>
      </div>
      {/* Desktop Menu */}
      <div className="flex-1 flex justify-center h-full">
        <ul className="hidden lg:flex gap-8 items-center h-full text-[16px] md:text-[13px] font-medium text-[#231f20]">
          {navItems.map((item) => (
            <li key={item.label} className="relative h-full flex items-center group">
              {item.dropdown ? (
                <Dropdown label={item.label} items={item.dropdown} />
              ) : (
                <Link href={item.href} className="hover:underline underline-offset-4 font-medium text-[15px] md:text-[13px] whitespace-nowrap">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          {/* Account dropdown */}
          <li className="relative h-full flex items-center group">
            <Dropdown 
              label="Account" 
              items={accountItems} 
              onLogout={isLoggedIn ? handleLogout : undefined}
            />
          </li>
        </ul>
      </div>
      {/* Hamburger Icon */}
      <button className="lg:hidden flex items-center justify-center ml-4 text-[#b08a47]" onClick={() => setMobileOpen((o) => !o)}>
        {mobileOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>
      {/* Help Section (desktop only) */}
      <div className="hidden lg:flex items-center bg-[#b08a47] h-full pl-6 min-w-[220px] justify-end" style={{ borderRadius: 0 }}>
        <div className="flex items-center mr-4 gap-3 w-full whitespace-nowrap">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
            <FaPhone className="w-5 h-5 text-[#b08a47]" />
          </span>
          <div className="flex flex-col text-white">
            <span className="text-[15px] md:text-[13px] font-semibold leading-tight">Need help?</span>
            <span className="text-[16px] md:text-[13px] font-bold leading-tight mt-1">+234 815 160 8010</span>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 cursor-pointer" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-[#b08a47] w-4/5 max-w-xs h-full p-6 overflow-y-auto flex flex-col justify-between z-50">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white z-50"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes size={28} />
            </button>
            <div>
              <div className="flex items-center mb-8 mt-2">
                <Image src="/images/logo.svg" alt="Toux Properties Logo" width={50} height={50} className="h-12 w-auto object-contain" priority />
              </div>
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.dropdown ? (
                      <Dropdown label={item.label} items={item.dropdown} mobile />
                    ) : (
                      <Link href={item.href} className="block py-2 px-4 font-medium text-[15px] md:text-[13px] whitespace-nowrap text-white">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                {/* Account dropdown for mobile */}
                <li>
                  <Dropdown 
                    label="Account" 
                    items={accountItems} 
                    mobile 
                    onLogout={isLoggedIn ? handleLogout : undefined}
                  />
                </li>
              </ul>
            </div>
            {/* Help Section (mobile only) */}
            <div className="flex items-center gap-3 mt-8 text-white">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                <FaPhone className="w-5 h-5 text-[#b08a47]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[15px] md:text-[13px] font-semibold leading-tight">Need help?</span>
                <span className="text-[16px] md:text-[13px] font-bold leading-tight mt-1">+234 815 160 8010</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 