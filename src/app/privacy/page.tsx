"use client";
import Image from "next/image";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              Privacy Policy
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Link href="/" className="text-white text-lg sm:text-xl font-medium hover:text-[#b08a47] transition-colors underline-offset-4">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-base sm:text-lg mx-1" />
            <span className="text-white text-lg sm:text-xl font-normal">
              Privacy Policy
            </span>
          </div>
        </div>
        {/* Optional: subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* Privacy Policy Section */}
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#f7f3ef] py-10 px-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-4 text-center">
              Privacy Policy
            </h2>
            <div className="w-full text-[#171717] text-base flex flex-col gap-6">
              <p>
                At Toux Properties, we are dedicated to protecting your privacy and safeguarding the personal information you share with us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or interact with us online. By using our website and providing us with your information, you consent to the practices described in this policy.
              </p>
              <h3 className="text-lg font-semibold mb-2">Information Collection:</h3>
              <p>
                When you visit our website, we may collect personal information such as your name, email address, phone number, and any other details you choose to provide. We also gather non-personal information, including your IP address, browser type, and device information, to help us improve our website and services.
              </p>
              <h3 className="text-lg font-semibold mb-2">Use of Information:</h3>
              <p>
                We use the information we collect to offer you a more personalized experience and to communicate with you about our products, services, and promotions. Additionally, we may use your information to process transactions, respond to inquiries, and enhance the functionality and security of our website.
              </p>
              <h3 className="text-lg font-semibold mb-2">Information Sharing:</h3>
              <p>
                We recognize the importance of maintaining the confidentiality of your personal information. We will not sell, rent, or trade your information to third parties without your consent, except as required by law or to fulfill our contractual obligations. However, we may share your information with trusted third-party service providers who assist us in managing our website and conducting our business operations.
              </p>
              <h3 className="text-lg font-semibold mb-2">Data Security:</h3>
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We continuously review and update our security practices to ensure the integrity and confidentiality of your data.
              </p>
              <h3 className="text-lg font-semibold mb-2">Your Choices:</h3>
              <p>
                You have the right to review, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in our emails.
              </p>
              <h3 className="text-lg font-semibold mb-2">Changes to the Privacy Policy:</h3>
              <p>
                We reserve the right to update or revise this Privacy Policy as necessary. Any changes will take effect immediately upon posting the revised policy on our website.
              </p>
              <p>
                If you have any questions or concerns about our Privacy Policy or how we manage your personal information, please contact us.
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}  
