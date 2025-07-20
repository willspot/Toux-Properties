"use client";
import { useState } from "react";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import Link from "next/link";

export default function AgentAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage('Login successful!');
        // Store the token in localStorage
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = '/account/cpanel';
        }, 1500);
      } else {
        setMessageType('error');
        setMessage(data.message || 'Login failed. Please check your credentials.');
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
        
        {/* Login Section */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mx-auto my-12">
          <h2 className="text-2xl font-bold text-[#171717] mb-2">
            Sign in
          </h2>
          <p className="text-[#b08a47] text-base font-medium mb-6">
            Sign In With Toux Properties
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
              <label htmlFor="email" className="text-[#171717] text-sm font-semibold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded border border-[#d3cdc6] bg-[#f7f3ef] text-[#171717] text-base focus:outline-none focus:ring-2 focus:ring-[#b08a47] placeholder-[#b8b8b8]"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 rounded bg-[#b08a47] text-white font-semibold text-lg shadow transition-all duration-200 hover:bg-[#a07a3a] focus:outline-none focus:ring-2 focus:ring-[#b08a47] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="w-full flex flex-col items-center mt-6">
            <span className="text-[#171717] text-sm">Become an Agent? <Link href="/account/register" className="text-[#b08a47] font-semibold hover:underline">Register Now</Link></span>
          </div>
        </div>
        
        
        <Footer />
        
        
      </div>
    </>
  );
}
