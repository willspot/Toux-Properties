import NavBar from "../../NavBar";
import Footer from "../../Footer";

export default function SalesPartnership() {
  return (
    <>
      <NavBar />

      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-4 sm:pt-8 px-4 sm:px-16">

        {/* Sales Partner Form Section */}
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#f7f3ef] py-10 px-4 overflow-x-hidden">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-2 text-center">
              BECOME AN INDEPENDENT SALES PARTNER
            </h2>
            <p className="text-[#6b6b6b] text-base mb-6 text-center">
              Would you like to become an independent sales partner with Toux Properties?<br />
              Kindly proceed to fill the form below. If your application is approved, you will receive a 
              confirmation email, alongside an invitation to proceed with documentation.
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
                  Reference 1 (Name) <span className="text-red-600">&#42;</span>
                </label>
                <input type="text" required placeholder="Enter reference 1 name" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Reference 1 Phone Number <span className="text-red-600">&#42;</span>
                </label>
                <input type="tel" required placeholder="Enter reference 1 phone number" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Reference 2 (Name)
                </label>
                <input type="text" placeholder="Enter reference 2 name" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
              </div>

              <div className="flex flex-col">
                <label className="text-[#171717] font-medium mb-1">
                  Reference 2 Phone Number
                </label>
                <input type="tel" placeholder="Enter reference 2 phone number" className="rounded-lg border border-[#b08a47] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b08a47] text-[#171717] bg-[#f7f3ef]" />
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