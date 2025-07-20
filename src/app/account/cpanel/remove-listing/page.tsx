"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../../utils/auth";
import Image from "next/image";
import NavBar from "../../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../../Footer";

interface Property {
  id: number;
  property_id: string;
  main_image: string;
  tag: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export default function RemoveListingCpanel() {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const [propertyId, setPropertyId] = useState('');
  const [searchedProperty, setSearchedProperty] = useState<Property | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/account/agent-account");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f3ef]">
        <div className="w-12 h-12 border-4 border-[#b08a47] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyId.trim()) {
      setMessage('Please enter a Property ID');
      return;
    }
    setIsSearching(true);
    setMessage('');
    setSearchedProperty(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`);
      const data = await res.json();
      if (data.success) {
        const found = data.data.find((p: Property) => p.property_id === propertyId);
        if (found) {
          setSearchedProperty(found);
          setMessage('Property found successfully!');
        } else {
          setMessage('Property not found.');
        }
      } else {
        setMessage('Error fetching properties.');
      }
    } catch {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleDelete = async () => {
    if (!searchedProperty) return;
    setIsDeleting(true);
    setMessage('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${searchedProperty.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Property ${searchedProperty.property_id} deleted successfully!`);
        setSearchedProperty(null);
      } else {
        setMessage(data.message || 'Failed to delete property.');
      }
    } catch {
      setMessage('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-2 sm:pt-4 px-4 sm:px-16">
        {/* Remove Listing Section */}
        <section className="w-full max-w-6xl mx-auto py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#171717]">Remove Property Listing</h3>
            </div>
            {/* Tabs */}
            <div className="mb-8">
              <ul className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200">
                <li>
                  <button className="flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium bg-[#b08a47] text-white">
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete Property Information</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FontAwesomeIcon icon={faSearch} className="text-[#b08a47] text-xl" />
                  <h4 className="text-xl font-semibold text-[#171717]">Search Property Information:</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property ID</label>
                    <input
                      type="text"
                      name="product_id"
                      id="product_id"
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      placeholder="e.g: Property ID"
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                {/* Search Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-[#b08a47] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#9a7a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
            {/* Delete Property Section */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FontAwesomeIcon icon={faTrash} className="text-[#b08a47] text-xl" />
                <h4 className="text-xl font-semibold text-[#171717]">Delete Property Information:</h4>
              </div>
              {searchedProperty ? (
                <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${searchedProperty.property_id}/${searchedProperty.main_image}`}
                      alt={searchedProperty.tag}
                      width={80}
                      height={60}
                      className="rounded object-cover border"
                    />
                    <div>
                      <div className="text-base font-semibold text-[#171717]">{searchedProperty.property_id}</div>
                      <div className="text-sm text-gray-600">{searchedProperty.address}, {searchedProperty.city}, {searchedProperty.state}, {searchedProperty.country}</div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={() => setShowConfirm(true)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      Delete Property
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <FontAwesomeIcon icon={faSearch} className="text-3xl text-gray-400 mb-2" />
                  <p className="text-gray-600">Search for a property to delete</p>
                </div>
              )}
              {/* Custom Confirmation Modal */}
              {showConfirm && searchedProperty && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
                    <p className="text-lg text-gray-900 font-semibold mb-4">Are you sure you want to delete property <span className="text-red-600">{searchedProperty.property_id}</span>?</p>
                    <div className="flex gap-6 mt-2">
                      <button
                        className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Yes'}
                      </button>
                      <button
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-medium hover:bg-gray-300"
                        onClick={() => setShowConfirm(false)}
                        disabled={isDeleting}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-lg mt-4 text-center font-medium ${
                  message.includes('deleted successfully')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}