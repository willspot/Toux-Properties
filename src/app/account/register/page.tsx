"use client";
import { useState } from "react";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    agentCode: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [agentCodeError, setAgentCodeError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear agent code error when user types
    if (name === 'agentCode') {
      setAgentCodeError('');
    }
  };

  const validateAgentCode = (code: string) => {
    return code === process.env.NEXT_PUBLIC_AGENT_CODE;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setAgentCodeError('');

    // Validate agent code
    if (!validateAgentCode(formData.agentCode)) {
      setAgentCodeError('Invalid agent code. Please enter the correct agent code.');
      setIsLoading(false);
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          phone: formData.phone,
          agent_code: formData.agentCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage('Registration successful! You can now sign in.');
        // Clear form
        setFormData({
          agentCode: '',
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/account/agent-account';
        }, 2000);
      } else {
        setMessageType('error');
        if (data.errors) {
          // Handle validation errors
          const errorMessages = Object.values(data.errors).flat();
          setMessage(errorMessages.join(', '));
        } else {
          setMessage(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch {
      setMessageType('error');
      setMessage('Error connecting to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-2 sm:pt-4 px-4 sm:px-16">
        
        {/* Register Section */}
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mx-auto my-12">
            <h2 className="text-2xl font-bold text-[#171717] mb-2">
                Sign up
            </h2>
            <p className="text-[#b08a47] text-base font-medium mb-6">
                Sign up With Toux Properties
            </p>
            
            {message && (
              <div className={`w-full p-3 rounded-md mb-4 ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="agentCode" className="text-[#171717] text-sm font-semibold">
                        Agent Code *
                    </label>
                    <input
                        type="text"
                        id="agentCode"
                        name="agentCode"
                        value={formData.agentCode}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded border ${
                          agentCodeError 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-[#d3cdc6] bg-[#f7f3ef]'
                        } text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]`}
                        placeholder="Enter agent code"
                    />
                    {agentCodeError && (
                      <p className="text-red-600 text-sm mt-1">{agentCodeError}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="firstname" className="text-[#171717] text-sm font-semibold">
                        Agent Firstname
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="Agent Firstname"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="lastname" className="text-[#171717] text-sm font-semibold">
                        Agent Lastname
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="Agent Lastname"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#171717] text-sm font-semibold">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="Email address"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[#171717] text-sm font-semibold">
                        Agent Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="Agent Phone Number"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#171717] text-sm font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="New Password"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-[#171717] text-sm font-semibold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                        placeholder="Confirm Password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-2 rounded bg-[#b08a47] text-white font-semibold text-lg shadow transition-all duration-200 hover:bg-[#a07a3a] focus:outline-none focus:ring-2 focus:ring-[#b08a47] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating account...' : 'Sign up'}
                </button>
            </form>
            <div className="w-full flex flex-col items-center mt-6">
                <span className="text-[#171717] text-sm">
                    Already have an account? 
                    <Link href="/account/agent-account" className="text-[#b08a47] font-semibold hover:underline">
                        Sign in
                    </Link>
                </span>
            </div>
        </div>
        
        
        <Footer />
        
        
      </div>
    </>
  );
}
