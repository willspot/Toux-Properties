"use client";
import Image from "next/image";
import NavBar from "../NavBar";
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer";
import ScrollFadeSection from "../components/ScrollFadeSection";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
        <NavBar />
        {/* Hero Section */}
        <section className="w-screen h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] xl:h-[500px] relative flex items-center justify-center bg-black overflow-hidden">
            <Image
                src="/images/about/about.png"
                alt="About Us Hero Background"
                fill
                className="object-cover w-full h-full opacity-80"
                priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-center drop-shadow-lg">
                    About Us
                </h1>
                <div className="flex items-center gap-2 mt-2">
                    <Link href="/" className="text-white text-lg sm:text-xl font-medium hover:text-[#b08a47] transition-colors underline-offset-4">
                        Home
                    </Link>
                    <FontAwesomeIcon icon={faArrowRight} className="text-white text-base sm:text-lg mx-1" />
                    <span className="text-white text-lg sm:text-xl font-normal">
                        About Us
                    </span>
                </div>
            </div>
            {/* Optional: subtle overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/60" />
        </section>
        
        <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">
            
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
                    Your key to real estate success.
                </h2>
                <p className="text-[#171717]/70 text-sm xs:text-base sm:text-base md:text-lg font-normal mb-6 sm:mb-8 max-w-xl">
                    Welcome to Toux Properties, where we believe in creating more than just houses. 
                    We craft forever homes while prioritizing your well-being and peace of mind. 
                    We understand that finding all home is more than just a transaction, it&apos;s 
                    about building a foundation for your future. That&apos;s why we are committed to 
                    guiding you through every step of the way bringing you living spaces that promotes 
                    happiness.

                    Our team of experts is dedicated to curating homes that are not only aesthetically 
                    pleasing but also functional, sustainable, eco-friendly and tailored to meet the unique 
                    needs of smart modern living. We take pride in our attention to details, ensuring that 
                    every home we offer is not just a place to live, but a place to thrive.

                    At Toux properties, you&apos;re not just another client, you&apos;re a part of our family. 
                    Join us on this exciting journey and together we can help you find the perfect place to call 
                    your home. Toux Properties — better housing, better living.
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
                {/* <Link href="/about-us" className="inline-block border border-[#b08a47] text-[#171717] text-[15px] sm:text-[16px] font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded transition-all hover:bg-[#b08a47] hover:text-white mb-0 w-fit tracking-wide">READ MORE</Link> */}
            </div>
            </section>
            </ScrollFadeSection>

            {/* Core Values, Vision, Mission Section */}
            <ScrollFadeSection>
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
              {/* Core Values */}
              <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col justify-start items-start min-w-[260px] max-w-md">
                <h3 className="text-xl font-semibold text-[#171717] mb-4">Core Values</h3>
                <ul className="flex flex-col gap-3">
                  {['Excellence', 'Integrity', 'Accountability', 'Professionalism', 'Innovation and creativity'].map((value) => (
                    <li key={value} className="flex items-center gap-3 text-base text-[#171717] font-medium">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-white text-sm" />
                      </span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Vision */}
              <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col justify-start items-start min-w-[260px] max-w-md">
                <h3 className="text-xl font-semibold text-[#171717] mb-4">Our Vision</h3>
                <p className="text-[#171717] text-base font-normal text-left">To be the leading real estate company dedicated to elevating quality of life by providing superior housing solutions founded on professionalism, integrity and affordability.</p>
              </div>
              {/* Mission */}
              <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col justify-start items-start min-w-[260px] max-w-md">
                <h3 className="text-xl font-semibold text-[#171717] mb-4">Our Mission</h3>
                <p className="text-[#171717] text-base font-normal text-left">Leveraging innovative technology to develop sustainable properties that exemplify class, comfort, and style that exceed clients expectation.</p>
              </div>
            </div>
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

            <Footer />
        </div>
    </>
    );
} 