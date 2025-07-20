"use client";
import Image from "next/image";
import NavBar from "../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../Footer";
import Link from "next/link";

export default function OurServices() {
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
              Services
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Link href="/" className="text-white text-lg sm:text-xl font-medium hover:text-[#b08a47] transition-colors underline-offset-4">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-base sm:text-lg mx-1" />
            <span className="text-white text-lg sm:text-xl font-normal">
              Services
            </span>
          </div>
        </div>
        {/* Optional: subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* LATEST SERVICES Section */}
        <section className="w-full py-12 bg-[#f7f3ef] flex flex-col items-center">
          <h5 className="text-[#b08a47] text-[13px] sm:text-[14px] font-medium tracking-widest uppercase mb-3 sm:mb-5">
            Our Services
          </h5>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 tracking-wide text-[#222]">
            Creating Values Through Estate Development
          </h2>
          {/* First row: 3 boxes */}
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Estate Development */}
            <div className="bg-[#f9f6f2] rounded-xl shadow-md p-8 flex flex-col items-center text-center">
              <i className="nl-icon nl-icon-home-3" style={{ fontSize: 65, color: '#b08a47', marginBottom: 24 }}></i>
              <h3 className="text-2xl font-bold mb-4 text-[#222]">Estate Development</h3>
              <p className="text-gray-600">
                From initial concept to final construction, we bring properties to life. Our team of experts carefully plans, designs, and develop residential and commercial estates, ensuring each project meets the highest standards of quality, innovation, and sustainability.
              </p>
            </div>
            {/* Estate Management */}
            <div className="bg-[#f9f6f2] rounded-xl shadow-md p-8 flex flex-col items-center text-center">
              <i className="nl-icon nl-icon-key" style={{ fontSize: 65, color: '#b08a47', marginBottom: 24 }}></i>
              <h3 className="text-2xl font-bold mb-4 text-[#222]">Estate Management</h3>
              <p className="text-gray-600">
                Safeguard your investments while enhancing long-term value. We handle all aspects of property maintenance, tenant relationships, and administrative tasks, allowing you to enjoy peace of mind and steady returns.
              </p>
            </div>
            {/* Real Estate Consulting */}
            <div className="bg-[#f9f6f2] rounded-xl shadow-md p-8 flex flex-col items-center text-center">
              <i className="nl-icon nl-icon-house-location" style={{ fontSize: 65, color: '#b08a47', marginBottom: 24 }}></i>
              <h3 className="text-2xl font-bold mb-4 text-[#222]">Real Estate Consulting</h3>
              <p className="text-gray-600">
                Navigate the property market with confidence. Our seasoned consultants provide personalized guidance, detailed market analysis, and strategic insights to help you make informed decisions that align with your long-term goals.
              </p>
            </div>
          </div>
          {/* Second row: 2 boxes centered */}
          <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-center gap-8 mt-8">
            {/* Rentals & Sales */}
            <div className="bg-[#f9f6f2] rounded-xl shadow-md p-8 flex flex-col items-center text-center col-span-1 sm:col-span-1 lg:col-start-2">
              <i className="nl-icon nl-icon-home-2" style={{ fontSize: 65, color: '#b08a47', marginBottom: 24 }}></i>
              <h3 className="text-2xl font-bold mb-4 text-[#222]">Rentals & Sales</h3>
              <p className="text-gray-600">
                Whether you’re looking to buy, sell, or rent, we streamline the entire process. Our extensive network, professional marketing approach, and personalized property matching services ensure you find the perfect opportunity quickly and efficiently.
              </p>
            </div>
            {/* Legal Services */}
            <div className="bg-[#f9f6f2] rounded-xl shadow-md p-8 flex flex-col items-center text-center col-span-1 sm:col-span-1 lg:col-start-3">
              <i className="nl-icon nl-icon-design" style={{ fontSize: 65, color: '#b08a47', marginBottom: 24 }}></i>
              <h3 className="text-2xl font-bold mb-4 text-[#222]">Legal Services</h3>
              <p className="text-gray-600">
                We offer in-house legal support that covers documentation, due diligence, and dispute resolution. With our qualified legal professionals guiding every transaction, you can rely on complete clarity, compliance, and confidence.
              </p>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}  
