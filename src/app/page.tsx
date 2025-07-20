"use client";
import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBed, faBath, faLocationDot, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import Footer from "./Footer";
import ScrollFadeSection from "./components/ScrollFadeSection";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader"; // adjust path as needed

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for data
    const timer = setTimeout(() => setLoading(false), 1200); // 1.2s
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <>
      <NavBar />
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-start w-full max-w-7xl gap-6 md:gap-8 lg:gap-10 xl:gap-12 mt-8 md:mt-12 lg:mt-16 mb-8 md:mb-12 lg:mb-20 px-2 sm:px-0">
          {/* Spinning Circle */}
          <div className="flex-shrink-0 flex items-center justify-center w-[100px] h-[100px] xs:w-[130px] xs:h-[130px] sm:w-[150px] sm:h-[150px] lg:w-[170px] lg:h-[170px] mb-6 lg:mb-0">
            <div className="relative w-[100px] h-[100px] xs:w-[130px] xs:h-[130px] sm:w-[150px] sm:h-[150px] lg:w-[170px] lg:h-[170px]">
              <div className="absolute inset-0 rounded-full border border-black bg-white"></div>
              {/* Spinner SVG */}
              <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute animate-spin-slow">
                <defs>
                  <path
                    id="circle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text fontSize="8" fill="#111" fontFamily="sans-serif" letterSpacing="2" fontWeight="400">
                  <textPath xlinkHref="#circle" startOffset="0" textLength="232">
                    2022 Best Working Since&nbsp;
                  </textPath>
                </text>
              </svg>
              {/* Play Button (centered, not spinning) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow border border-black">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#111">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Center And To The Right Text and Image */}
          <div className="flex flex-col gap-2 w-full max-w-3xl">
            {/* Text And Image */}
            <div className="flex flex-col xs:flex-row items-center gap-2 xs:gap-4 whitespace-nowrap">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide uppercase text-[#171717] text-center xs:text-left">
                Real Estate Success
              </span>
              <div className="w-[90px] h-[32px] xs:w-[120px] xs:h-[44px] sm:w-[160px] sm:h-[60px] md:w-[200px] md:h-[70px] lg:w-[220px] lg:h-[80px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/homepage/hero.webp"
                  alt="Building"
                  width={220}
                  height={80}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
            {/* Second and Third Text On Same line */}
            <div className="flex flex-col xs:flex-row flex-wrap items-center gap-2 xs:gap-4 mt-1 xs:mt-2 whitespace-nowrap">
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide uppercase text-[#171717] text-center xs:text-left">
                Turning Properties Into
              </span>
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide uppercase text-[#171717] text-center xs:text-left">
                Design
              </span>
            </div>
          </div>
        </section>

        {/* Happy Customer Section */}
        <ScrollFadeSection>
        <section className="flex flex-col sm:flex-row w-full max-w-7xl mt-16 gap-8">
          {/* Large Image */}
          <div className="flex-2 min-w-[340px] max-w-[600px] flex items-center justify-center bg-white rounded-2xl shadow overflow-hidden">
            <Image
              src="/images/homepage/hero-banner.webp"
              alt="Happy Customer"
              width={700}
              height={700}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {/* Right Cards */}
          <div className="flex flex-col flex-1 min-w-[320px] max-w-[600px] gap-6 justify-between">
            {/* Two Cards Side by Side */}
            <div className="flex flex-row gap-4 w-full">
              {/* Happy Customer Card */}
              <div className="flex-1 bg-white rounded-xl shadow flex flex-col items-center justify-center py-10 px-6 min-w-[140px]">
                <span className="text-4xl font-semibold text-[#b08a47] mb-2">26K+</span>
                <span className="text-lg font-medium text-[#171717] text-center">Happy Customer</span>
              </div>
              {/* Small Image Card */}
              <div className="flex-1 bg-white rounded-xl shadow flex items-center justify-center overflow-hidden min-w-[140px]">
                <Image
                  src="/images/homepage/hero-small.webp"
                  alt="Building Small"
                  width={180}
                  height={180}
                  className="object-cover w-full h-full rounded-xl"
                  priority
                />
              </div>
            </div>
            {/* Bottom Text */}
            <div className="bg-[#b08a47] rounded-xl py-8 px-8 text-white text-base font-medium leading-relaxed shadow mt-2">
              Outsourcing can provide corporate businesses with several advantages, including cost savings, access to specialized expertise, increased efficiency
            </div>
          </div>
        </section>
        </ScrollFadeSection>
        
        {/* Our Services Section */}
        <section className="w-screen relative -mx-[50vw] bg-[#171717] py-10 sm:py-14 md:py-20 mt-16 sm:mt-24">
          <ScrollFadeSection>
            <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12 text-white px-2 sm:px-4 md:px-8">
              {/* Experience Column */}
              <div className="w-full lg:w-1/3 flex flex-col justify-between mb-8 lg:mb-0">
                <div>
                  <h5 className="text-[#b08a47] text-[13px] sm:text-[14px] font-medium tracking-widest uppercase mb-3 sm:mb-5">
                    Our Services
                  </h5>
                  <h2 className="text-[22px] xs:text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] leading-[1.2] font-semibold mb-4 sm:mb-7">
                    Experience the Best in Real Estate
                  </h2>
                  <p className="text-white text-sm xs:text-base md:text-lg font-normal mb-4 sm:mb-5">
                    Providing high-quality, seamless experience for buyers, sellers, and investors by providing expert guidance, access to premium properties, and personalized service.
                  </p>
                  <Link href="/services/our-services" className="inline-block border border-[#b08a47] text-white text-[13px] sm:text-[14px] font-medium uppercase px-5 sm:px-7 py-2 sm:py-3 rounded transition-all hover:bg-[#b08a47] hover:text-white mb-0 w-fit">
                    Read More
                  </Link>
                </div>
              </div>
              {/* Service Cards */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
                {/* Card 1 */}
                <div className="bg-[#171717] rounded-lg p-5 xs:p-6 sm:p-7 shadow flex flex-col h-full nl-button-hover">
                  <div className="nl__service-number-box mb-7">
                    <h4>01</h4>
                    <span className="nl-icon nl-icon-house-location-2 text-[32px] text-[#b08a47]"></span>
                  </div>
                  <h3 className="text-[18px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold mb-2 sm:mb-3">Cost Optimization</h3>
                  <p className="text-white text-sm xs:text-base md:text-lg font-normal">Maximizing efficiency and reducing unnecessary expenses throughout property development, management and maintenance.</p>
                </div>
                {/* Card 2 */}
                <div className="bg-[#171717] rounded-lg p-5 xs:p-6 sm:p-7 shadow flex flex-col h-full nl-button-hover">
                  <div className="nl__service-number-box mb-7">
                    <h4>02</h4>
                    <span className="nl-icon nl-icon-design text-[32px] text-[#b08a47]"></span>
                  </div>
                  <h3 className="text-[18px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold mb-2 sm:mb-3">Time operation</h3>
                  <p className="text-white text-sm xs:text-base md:text-lg font-normal">Streamlining processes to reduce project delays and improve efficiency. This includes effective scheduling and minimizing downtime.</p>
                </div>
                {/* Card 3 */}
                <div className="bg-[#171717] rounded-lg p-5 xs:p-6 sm:p-7 shadow flex flex-col h-full nl-button-hover">
                  <div className="nl__service-number-box mb-7">
                    <h4>03</h4>
                    <span className="nl-icon nl-icon-home-3 text-[32px] text-[#b08a47]"></span>
                  </div>
                  <h3 className="text-[18px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold mb-2 sm:mb-3">Parkside Residential</h3>
                  <p className="text-white text-sm xs:text-base md:text-lg font-normal">Offering residents scenic views, recreational opportunities, and a connection to nature to enhance lifestyle appeal.</p>
                </div>
                {/* Card 4 */}
                <div className="bg-[#171717] rounded-lg p-5 xs:p-6 sm:p-7 shadow flex flex-col h-full nl-button-hover">
                  <div className="nl__service-number-box mb-7">
                    <h4>04</h4>
                    <span className="nl-icon nl-icon-home-2 text-[32px] text-[#b08a47]"></span>
                  </div>
                  <h3 className="text-[18px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold mb-2 sm:mb-3">Warehouse operation</h3>
                  <p className="text-white text-sm xs:text-base md:text-lg font-normal">Management and optimization of storage facilities to support logistics and distribution to meet supply chain demands.</p>
                </div>
              </div>
            </div>
          </ScrollFadeSection>
        </section>
        
        {/* About Us Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col lg:flex-row items-stretch justify-center bg-[#f7f3ef] py-10 sm:py-14 md:py-16 px-2 sm:px-4 md:px-8">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex items-stretch justify-center max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-0">
            <div className="w-full h-[260px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-full flex items-stretch">
              <Image
                src="/images/homepage/about.webp"
                alt="About Us Building"
                width={600}
                height={700}
                className="object-cover rounded-2xl w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Right Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start max-w-2xl mx-auto lg:mx-0 lg:pl-16 mt-4 lg:mt-0">
            <h5 className="text-[#b08a47] text-[13px] sm:text-[14px] font-medium tracking-widest uppercase mb-3 sm:mb-4">About Us</h5>
            <h2 className="text-[#171717] text-[22px] xs:text-[26px] sm:text-[28px] md:text-[32px] lg:text-[30px] font-semibold leading-tight mb-4 sm:mb-6" style={{lineHeight: '1.15'}}>
              Unlocking Real Estate Success:<br className="hidden sm:block" />
              Creating Value Through Estate<br className="hidden sm:block" />
              Development
            </h2>
            <p className="text-[#171717] text-sm xs:text-base sm:text-base md:text-lg font-normal mb-6 sm:mb-8 max-w-xl">
              Welcome to Toux Properties, where we believe in creating more than just houses. We craft forever homes while prioritizing your well-being and peace of mind. We understand that finding all home is more than just a transaction, it&apos;s about building a foundation for your future.
            </p>
            <ul className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 w-full">
              <li className="flex items-center gap-2 sm:gap-3 text-[#171717] text-base sm:text-base font-medium">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-5 sm:h-7 rounded-full bg-white">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#010122] text-xs sm:text-base" />
                </span>
                Turning Dreams into Addresses
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-[#171717] text-base sm:text-base font-medium">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-5 sm:h-7 rounded-full bg-white">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#010122] text-xs sm:text-base" />
                </span>
                Where Every Home Tells a Story
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-[#171717] text-base sm:text-base font-medium">
                <span className="inline-flex items-center justify-center w-6 h-6 sm:w-5 sm:h-7 rounded-full bg-white">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-[#010122] text-xs sm:text-base" />
                </span>
                Your Key to Real Estate Success
              </li>
            </ul>
            <Link href="/about-us" className="inline-block border border-[#b08a47] text-[#171717] text-[15px] sm:text-[16px] font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded transition-all hover:bg-[#b08a47] hover:text-white mb-0 w-fit tracking-wide">READ MORE</Link>
          </div>
        </section>
        </ScrollFadeSection>
        
        {/* Property Details Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col items-center justify-center bg-[#f7f3ef] py-10 sm:py-14 px-2 sm:px-4 md:py-26 md:px-8">
          <h5 className="text-[#b08a47] text-[13px] sm:text-[14px] font-medium tracking-widest uppercase mb-3 sm:mb-4 text-center">
            Property Details
          </h5>
          <h2 className="text-[#171717] text-3xl sm:text-4xl md:text-4xl font-semibold text-center mb-2">
            Unlocking doors to a better<br/> 
            future Discover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 lg:gap-y-20 w-full max-w-7xl mt-8 justify-center items-stretch">

            {/* Card 1 */}
            <div className="relative w-full max-w-[400px] mx-auto flex flex-col overflow-visible">
              {/* Popular Label */}
              <span className="absolute top-4 left-4 bg-red-600 text-white rounded px-3 py-1 text-xs sm:text-sm font-medium shadow z-10">
                Popular
              </span>
              {/* Image Box */}
              <div className="relative bg-white rounded-2xl shadow-lg w-full h-[220px] xs:h-[240px] md:h-[260px]">
                <Image 
                  src="/images/homepage/pr1.webp" 
                  alt="Property 1" 
                  fill 
                  className="object-cover rounded-2xl w-full h-full" 
                />
                {/* Details Box */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[92%] sm:w-[90%] bg-white rounded-xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 z-20">
                  <span className="text-base sm:text-lg font-semibold text-[#171717] bg-[#f7f3ef] px-2 py-1 rounded w-fit">
                    ₦320,000,000.00
                  </span>
                  <div className="flex items-center gap-2 text-[#171717] text-sm sm:text-base">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#171717] w-3 text-[14px] leading-none" />
                    <span>Lekki</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-[#171717] text-sm sm:text-base">
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-[#171717] w-4 text-[16px]" />4</span>
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-[#171717] w-4 text-[16px]" />2</span>
                  </div>
                  <hr />
                  <span className="text-[#171717] text-sm sm:text-base mt-2">For Sale</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full max-w-[400px] mx-auto flex flex-col overflow-visible">
              {/* Popular Label */}
              <span className="absolute top-4 left-4 bg-red-600 text-white rounded px-3 py-1 text-xs sm:text-sm font-medium shadow z-10">
                Popular
              </span>
              {/* Image Box */}
              <div className="relative bg-white rounded-2xl shadow-lg w-full h-[220px] xs:h-[240px] md:h-[260px]">
                <Image 
                  src="/images/homepage/pr2.jpg" 
                  alt="Property 2" 
                  fill 
                  className="object-cover rounded-2xl w-full h-full" 
                />
                {/* Details Box */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[92%] sm:w-[90%] bg-white rounded-xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 z-20">
                  <span className="text-base sm:text-lg font-semibold text-[#171717] bg-[#f7f3ef] px-2 py-1 rounded w-fit">
                    ₦2,900,000.00
                  </span>
                  <div className="flex items-center gap-2 text-[#171717] text-sm sm:text-base">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#171717] w-3 text-[14px] leading-none" />
                    <span>Abuja</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-[#171717] text-sm sm:text-base">
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-[#171717] w-4 text-[16px]" />3</span>
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-[#171717] w-4 text-[16px]" />2</span>
                  </div>
                  <hr />
                  <span className="text-[#171717] text-sm sm:text-base mt-2">Rent</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative w-full max-w-[400px] mx-auto flex flex-col overflow-visible">
              {/* Popular Label */}
              <span className="absolute top-4 left-4 bg-red-600 text-white rounded px-3 py-1 text-xs sm:text-sm font-medium shadow z-10">
                Popular
              </span>
              {/* Image Box */}
              <div className="relative bg-white rounded-2xl shadow-lg w-full h-[220px] xs:h-[240px] md:h-[260px]">
                <Image 
                  src="/images/homepage/pr3.jpg" 
                  alt="Property 3" 
                  fill 
                  className="object-cover rounded-2xl w-full h-full" 
                />
                {/* Details Box */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[92%] sm:w-[90%] bg-white rounded-xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 z-20">
                  <span className="text-base sm:text-lg font-semibold text-[#171717] bg-[#f7f3ef] px-2 py-1 rounded w-fit">
                    ₦2,500,000.00
                  </span>
                  <div className="flex items-center gap-2 text-[#171717] text-sm sm:text-base">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#171717] w-3 text-[14px] leading-none" />
                    <span>Ajah</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-[#171717] text-sm sm:text-base">
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-[#171717] w-4 text-[16px]" />3</span>
                    <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-[#171717] w-4 text-[16px]" />2</span>
                  </div>
                  <hr />
                  <span className="text-[#171717] text-sm sm:text-base mt-2">Rent</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        </ScrollFadeSection>
        
        {/* Newsletter Section */}
        {/* <ScrollFadeSection>
        <section className="w-screen flex flex-col md:flex-row items-center justify-center bg-[#f7f3ef] py-10 sm:py-14 md:py-20 mt-16 sm:mt-14 px-2 sm:px-4">
          <div className="w-full md:w-[40%] flex items-center justify-center max-w-md mx-auto md:mx-0 mb-4 md:mb-0">
            <div className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] flex items-center justify-center">
              <Image
                src='/images/homepage/newsletter.jpg'
                alt='Newsletter Subscribe'
                width={340}
                height={260}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-[60%] bg-white flex flex-col justify-center items-start max-w-4xl mx-auto md:mx-0 md:pl-8 mt-2 md:mt-0 h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] px-3 xs:px-4 pt-4 pb-4 md:pb-0">
            <h2 className="text-[#6b6b6b] text-[15px] xs:text-[16px] sm:text-[18px] md:text-[18px] font-semibold leading-tight mb-4 sm:mb-6 text-left" style={{lineHeight: '1.3'}}>
              Subscribe to our Newsletter to get the latest news and updates from us.
            </h2>
            <form className="flex flex-col xs:flex-row gap-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-3 rounded border border-[#6b6b6b] bg-white text-[#6b6b6b] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#6b6b6b] shadow-none"
                style={{ boxShadow: 'none' }}
                required
              />
              <Link 
                href="#" 
                className="inline-block border border-[#b08a47] text-[#171717] text-[13px] sm:text-[15px] md:text-[15px] font-medium px-4 sm:px-6 md:px-6 py-2 sm:py-2.5 md:py-2.5 rounded transition-all hover:bg-[#b08a47] hover:text-white mb-0 w-fit tracking-wide whitespace-nowrap"
              >
                Subscribe
              </Link>
            </form>
          </div>
        </section>
        </ScrollFadeSection> */}
        
        {/* FAQ Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col md:flex-row items-center justify-center bg-[#f7f3ef] py-10 sm:py-16 md:py-24 px-2 sm:px-4 md:px-8">
          {/* Image */}
          <div className="w-full md:w-[44%] flex items-center justify-center max-w-xl mx-auto md:mx-0 mb-8 md:mb-0">
            <div className="w-full h-[340px] xs:h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px] flex items-stretch">
              <Image
                src="/images/homepage/faq-banner.webp"
                alt="FAQ Banner"
                width={600}
                height={700}
                className="object-cover rounded-2xl w-full h-full shadow-lg"
                priority
              />
            </div>
          </div>
          {/* FAQ Card */}
          <div className="w-full md:w-[56%] flex flex-col justify-center items-start max-w-2xl mx-auto md:mx-0 md:pl-16 mt-4 md:mt-0">
            <span className="text-[#b08a47] text-[15px] sm:text-[16px] md:text-[14px] font-medium tracking-widest uppercase mb-2 sm:mb-3">FAQ MESSAGE</span>
            <h2 className="text-[#171717] text-[32px] xs:text-[38px] sm:text-[44px] md:text-[26px] font-semibold leading-tight mb-4 sm:mb-6 md:mb-4" style={{lineHeight: '1.1'}}>
              Your Trusted Real Estate Partner
            </h2>
            <div className="w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 md:mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[20px] sm:text-[20px] md:text-[18px] font-semibold text-[#171717]">
                  How do I invest with Toux properties?
                </h3>
              </div>
              <p className="text-[#6b6b6b] text-base sm:text-lg md:text-base leading-relaxed mb-4 md:mb-2">
                Investing with Toux properties is one of the most rewarding ways of investing your 
                capital without any hassle. There are several options, each catering to different 
                investment strategies and capital requirements. These pooled investment vehicles 
                gather capital from multiple investors to acquire, manage, and develop real estate assets. 
                We usually have higher minimum investment requirements and suitable for accredited investors.
              </p>
              <Link href="/services/faq" className="inline-block border border-[#b08a47] text-[#171717] text-[15px] sm:text-[16px] md:text-[14px] font-medium px-6 sm:px-8 md:px-6 py-2.5 sm:py-3 md:py-2.5 rounded transition-all hover:bg-[#b08a47] hover:text-white w-fit tracking-wide whitespace-nowrap">
                READ MORE
              </Link>
            </div>
          </div>
        </section>
        </ScrollFadeSection>
        
        {/* Stats Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col items-center justify-center bg-[#f7f3ef] py-12 sm:py-20">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-0">
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-[#b08a47] text-[40px] sm:text-[60px] md:text-[80px] font-semibold leading-none">
                <CountUp end={200} duration={2} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="mt-6 text-[#6b6b6b] text-lg sm:text-xl font-medium">Square Meters</span>
              <hr className="w-full max-w-[320px] border-t-2 border-[#b08a47] mt-4" />
            </div>
            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-[#b08a47] text-[40px] sm:text-[60px] md:text-[80px] font-semibold leading-none">
                <CountUp end={12} duration={2} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="mt-6 text-[#6b6b6b] text-lg sm:text-xl font-medium">Years of Experience</span>
              <hr className="w-full max-w-[320px] border-t-2 border-[#b08a47] mt-4" />
            </div>
            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center px-4">
              <span className="text-[#b08a47] text-[40px] sm:text-[60px] md:text-[80px] font-semibold leading-none">
                <CountUp end={30} duration={2} enableScrollSpy scrollSpyOnce suffix="+" />
              </span>
              <span className="mt-6 text-[#6b6b6b] text-lg sm:text-xl font-medium">Skilled Professionals</span>
              <hr className="w-full max-w-[320px] border-t-2 border-[#b08a47] mt-4" />
            </div>
          </div>
        </section>
        </ScrollFadeSection>
        
        {/* Gallery Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-8 mt-8"
          style={{ minHeight: '420px', height: '70vh', maxHeight: '700px' }}
        >
          {/* Left Tall Image */}
          <div className="flex-1 min-w-[220px] max-w-[420px] flex items-stretch">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/homepage/gallery03.webp"
                alt="Gallery Left"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Middle Images */}
          <div className="flex flex-col flex-1 min-w-[220px] max-w-[420px] gap-4 sm:gap-6 h-full">
            <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/homepage/gallery01.jpeg"
                alt="Gallery Top Middle"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/homepage/gallery04.webp"
                alt="Gallery Bottom Middle"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Right Tall Image */}
          <div className="flex-1 min-w-[220px] max-w-[420px] flex items-stretch">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/homepage/gallery02.webp"
                alt="Gallery Right"
                fill
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </section>
        </ScrollFadeSection>

        {/* Testimonial Section */}
        <ScrollFadeSection>
        <section className="w-full bg-[#f7f3ef] py-16 px-2 sm:px-8 flex flex-col items-center">
          <span className="text-[#b08a47] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3" style={{letterSpacing: '0.15em'}}>
            Clients Testimonial
          </span>
          <h2 className="text-[#171717] text-2xl sm:text-4xl font-semibold mb-12 text-center leading-tight">
            Building communities through<br className="hidden sm:block" /> real estate
          </h2>
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Card 1 */}
            <div className="bg-transparent flex flex-col items-start min-w-[220px] max-w-xs mx-auto">
              <div className="flex items-center mb-2">
                <span className="text-[#171717] text-xl font-semibold mr-2">Abraham<br/>U.</span>
                <span className="text-[#d3cdc6] text-5xl ml-2"><FontAwesomeIcon icon={faQuoteRight} size="2x" /></span>
              </div>
              <p className="text-[#171717] text-base font-normal leading-relaxed">I had a pleasant experience working with Toux Properties. They were very helpful, answered all questions and professionals in their dealings. I recommend them as a trusted company to deal with.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-transparent flex flex-col items-start min-w-[220px] max-w-xs mx-auto">
              <div className="flex items-center mb-2">
                <span className="text-[#171717] text-xl font-semibold mr-2">Frances<br/>A.</span>
                <span className="text-[#d3cdc6] text-5xl ml-2"><FontAwesomeIcon icon={faQuoteRight} size="2x" /></span>
              </div>
              <p className="text-[#171717] text-base font-normal leading-relaxed">Amazing customer service! Never late and very helpful to clients needs. They have the best house I’ve seen so far in my house search.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-transparent flex flex-col items-start min-w-[220px] max-w-xs mx-auto">
              <div className="flex items-center mb-2">
                <span className="text-[#171717] text-xl font-semibold mr-2">Tayo<br/>Oladiran</span>
                <span className="text-[#d3cdc6] text-5xl ml-2"><FontAwesomeIcon icon={faQuoteRight} size="2x" /></span>
              </div>
              <p className="text-[#171717] text-base font-normal leading-relaxed">They are very straightforward and helpful. Truthfulness pays off in the long term. Thank you for being transparent in your dealings.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-transparent flex flex-col items-start min-w-[220px] max-w-xs mx-auto">
              <div className="flex items-center mb-2">
                <span className="text-[#171717] text-xl font-semibold mr-2">Samuel<br/>B.</span>
                <span className="text-[#d3cdc6] text-5xl ml-2"><FontAwesomeIcon icon={faQuoteRight} size="2x" /></span>
              </div>
              <p className="text-[#171717] text-base font-normal leading-relaxed">Just give them your housing project to develop and go and sleep. If your expection is not exceeded, then it’s not Toux properties. I highly recommend them.</p>
            </div>
          </div>
        </section>
        </ScrollFadeSection>

        <Footer />
        
        
      </div>
    </>
  );
}
