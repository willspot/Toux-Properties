import NavBar from "../../../NavBar";
import Footer from "../../../Footer";

export default function Invest() {
  return (
    <>
      <NavBar />

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* Sales Partner Form Section */}
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#f7f3ef] py-10 px-4 overflow-x-hidden">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-2 text-center">
                INVESTOR INTEREST FORM
            </h2>
            <p className="text-[#6b6b6b] text-base mb-6 text-center">
                Would you like to become an investor in Toux Properties?<br/>
                Kindly proceed to fill the form below. If your application is approved, 
                you will receive a confirmation email, alongside an invitation to proceed with 
                documentation.
            </p>
            <form className="w-full flex flex-col gap-4">

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  First Name <span className="text-red-600">&#42;</span>
                </label>
                <input type="text" required placeholder="Enter your first name" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Last Name <span className="text-red-600">&#42;</span>
                </label>
                <input type="text" required placeholder="Enter your last name" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Email Address <span className="text-red-600">&#42;</span>
                </label>
                <input type="email" required placeholder="Enter your email address" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Phone Number <span className="text-red-600">&#42;</span>
                </label>
                <input type="tel" required placeholder="Enter your phone number" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Preferred Contact Method <span className="text-red-600">&#42;</span>
                </label>
                <select required className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]">
                  <option value="">Select an option</option>
                  <option value="email">EMAIL</option>
                  <option value="phone">PHONE</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Phone Call (specify best time)
                </label>
                <input type="tel" placeholder="Phone Call (specify best time)" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Country <span className="text-red-600">&#42;</span>
                </label>
                <input type="text" required placeholder="Country" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  State <span className="text-red-600">&#42;</span>
                </label>
                <input type="text" required placeholder="State" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    When are you looking to invest?
                </label>
                <input type="text" placeholder="When are you looking to invest?" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    How long are you looking to invest in years?
                </label>
                <input type="text" placeholder="How long are you looking to invest in years?" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Investment Option <span className="text-red-600">&#42;</span>
                </label>
                <select required className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]">
                  <option value="">Select an option</option>
                  <option value="private">PRIVATE EQUITY REAL ESTATE FUNDS</option>
                  <option value="residential">RESIDENTIAL PROPERTIES</option>
                  <option value="commercial">COMMERCIAL PROPERTIES</option>
                  <option value="vacation">VACATION RENTALS</option>
                  <option value="joint">JOINT VENTURES AND PARTNERSHIPS</option>
                  <option value="crowdfunding">CROWDFUNDING</option>
                  <option value="syndications">REAL ESTATE SYNDICATIONS</option>
                  <option value="distress">DISTRESS SALES INVESTMENT</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Estimated Investment Amount
                </label>
                <input type="text" placeholder="Estimated Investment Amount" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                    Occupation/Industry
                </label>
                <input type="text" placeholder="Occupation/Industry" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  How did you hear about us? <span className="text-red-600">&#42;</span>
                </label>
                <select required className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]">
                  <option value="">Select an option</option>
                  <option value="website">TOUX PROPERTIES WEBSITE</option>
                  <option value="online">ONLINE CAMPAIGN</option>
                  <option value="referral">REFERRAL</option>
                </select>
              </div>

              <button type="submit" className="mt-4 bg-[#b08a47] text-white font-semibold py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-[#b08a47] hover:border hover:border-[#b08a47] shadow hover:shadow-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
    
        <Footer />
      </div>
    </>
  );
} 