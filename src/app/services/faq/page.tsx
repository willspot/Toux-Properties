"use client";
import Image from "next/image";
import NavBar from "../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../Footer";
import Link from "next/link";

export default function FAQ() {
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
              Faq
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Link href="/" className="text-white text-lg sm:text-xl font-medium hover:text-[#b08a47] transition-colors underline-offset-4">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-base sm:text-lg mx-1" />
            <span className="text-white text-lg sm:text-xl font-normal">
              Faq
            </span>
          </div>
        </div>
        {/* Optional: subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* FAQ Section */}
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#f7f3ef] py-10 px-4 overflow-x-hidden">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-4 text-center">
              How do I invest with Toux properties?
            </h2>
            <div className="w-full text-[#171717] text-base flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Investment options with Toux properties:</h3>
                <p>
                  Investing with Toux properties is one of the most rewarding ways of investing your 
                  capital without any hassle. There are several options, each catering to different 
                  investment strategies and capital requirements. Here are some common investment 
                  options available for you.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Private Equity Real Estate Funds:</h4>
                <p>
                  These pooled investment vehicles gather capital from multiple investors to acquire, manage, and develop real estate assets. We usually have higher minimum investment requirements and suitable for accredited investors.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Direct Property Investment</h4>
                <div className="ml-4 flex flex-col gap-3">
                  <div>
                    <h5 className="font-medium">Residential Properties:</h5>
                    <p>Investing directly in single-family homes, condos, or multi-family units to rent out or renovate and sell or purchase at the earliest/cheapest stage to do secondary sales later.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Commercial Properties:</h5>
                    <p>Purchasing office buildings, retail spaces, warehouses, or industrial properties for leasing purposes.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Vacation Rentals:</h5>
                    <p>We acquire properties in strategic areas to rent out for Shortlet purposes.</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Joint Ventures and Partnerships:</h4>
                <p>
                  Investors can also partner with us to co-invest in properties or projects, sharing both the risks and rewards. The terms and conditions varies on the type of project to be executed.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Crowdfunding:</h4>
                <p>
                  This allow investors to pool money to fund specific projects or properties. Generally, these investments are made in exchange for equity or a share of rental income.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Real Estate Syndications:</h4>
                <p>
                  In syndication, group of investors comes together to invest in a larger property. A syndicator or sponsor (we) manage the investment, taking care of operations, while investors contribute capital and receive returns.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-1">Distress Sales Investment:</h4>
                <p>
                  This involves finding undervalued or distress sale properties, securing them under contract, and selling the contract to another investor, making a profit without necessarily owning the property.
                </p>
              </div>
              <div>
                <p>
                  By understanding these options, you can choose the investment strategy or option that best aligns with your financial goals, risk tolerance, and investment horizon. Please always consider conducting thorough research or contact us at <Link href="mailto:info@touxproperties.com" className="text-[#b08a47] underline hover:text-[#a07a3a]">info@touxproperties.com</Link> to guide you on the best real estate investment opportunity to leverage on.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}  
