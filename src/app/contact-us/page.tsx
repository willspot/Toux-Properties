"use client";
import Image from "next/image";
import NavBar from "../NavBar";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer";
import ScrollFadeSection from "../components/ScrollFadeSection";

export default function ContactUs() {
  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <section className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] xl:h-[500px] relative flex items-center justify-center bg-black overflow-x-hidden">
        <Image
            src="/images/about/about.png"
            alt="About Us Hero Background"
            fill
            className="object-cover w-full h-full opacity-80"
            priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-center drop-shadow-lg">
              Contact Us
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Link href="/" className="text-white text-lg sm:text-xl font-medium hover:text-[#b08a47] transition-colors underline-offset-4">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-base sm:text-lg mx-1" />
            <span className="text-white text-lg sm:text-xl font-normal">
              Contact Us
            </span>
          </div>
        </div>
        {/* Optional: subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* Info Boxes */}
        <ScrollFadeSection>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch mb-12 mt-4">
          {/* Address Box */}
          <div className="flex-1 flex items-center bg-white rounded-2xl shadow p-6 min-h-[210px] max-w-full">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#f7f3ef] mr-6">
              <FontAwesomeIcon icon={faLocationDot} className="text-[#b08a47] text-3xl" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-semibold text-[#171717] mb-2">Address</span>
              <span className="text-base font-medium text-[#171717]">USA Office</span>
              <span className="text-sm text-[#6b6b6b] mb-2">1890 Briarwood Rd NE #1040 Atlanta, Georgia, USA</span>
              <span className="text-base font-medium text-[#171717] mt-2">Abuja Office</span>
              <span className="text-sm text-[#6b6b6b]">Suite A1, UYK Hexahub, Balanga Cres, off Uke Street, Garki, Area 11, Abuja F.C.T</span>
            </div>
          </div>
          {/* Email Box */}
          <div className="flex-1 flex items-center bg-white rounded-2xl shadow p-6 min-h-[210px] max-w-full">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#f7f3ef] mr-6">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#b08a47] text-3xl" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-semibold text-[#171717] mb-2">Email Address</span>
              <Link href="mailto:info@touxproperties.com" className="text-base text-[#6b6b6b] hover:text-[#b08a47] transition-colors">info@touxproperties.com</Link>
            </div>
          </div>
          {/* Phone Box */}
          <div className="flex-1 flex items-center bg-white rounded-2xl shadow p-6 min-h-[210px] max-w-full">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#f7f3ef] mr-6">
              <FontAwesomeIcon icon={faPhone} className="text-[#b08a47] text-3xl" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-semibold text-[#171717] mb-2">Phone number</span>
              <Link href="tel:+17862087879" className="text-base text-[#6b6b6b] hover:text-[#b08a47] transition-colors">+1(786) 208-7879</Link>
              <Link href="tel:+2348151608010" className="text-base text-[#6b6b6b] hover:text-[#b08a47] transition-colors">+234 815 160 8010</Link>
              <span className="text-lg font-semibold text-[#171717] mt-4 mb-1">Operating Hours</span>
              <span className="text-base text-[#6b6b6b]">Monday - Friday 8am - 5pm</span>
              <span className="text-lg font-semibold text-[#171717] mt-4 mb-1">Inspection Days</span>
              <span className="text-base text-[#6b6b6b]">Tuesday - Friday</span>
            </div>
          </div>
        </div>
        </ScrollFadeSection>

        {/* Google Map Section */}
        <div className="w-full max-w-5xl flex flex-col items-center justify-center mb-12">
          <div className="w-full h-[320px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.338819570905!2d7.493493673238989!3d9.032824488932697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b15d995fe6b%3A0x4bbbdd02b770264a!2sUYK%20HexaHub!5e0!3m2!1sen!2sng!4v1740040397880!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
} 