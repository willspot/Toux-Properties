"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../../utils/auth";
import Image from "next/image";
import NavBar from "../../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faBuilding, faCouch, faImage, faUpload, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../../Footer";

type Property = {
  id: number;
  property_id: string;
  tag: string;
  price: string;
  currency: string;
  property_type: string;
  marketed_by: string;
  status: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  year_built: string;
  exterior: string;
  interior: string;
  features: string;
  bathrooms: string | number;
  bedrooms: string | number;
  total_rooms: string;
  main_image: string | null;
  gallery_images: string[];
  [key: string]: unknown;
};

export default function EditListingCpanel() {
  const [activeTab, setActiveTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSingleImage, setSelectedSingleImage] = useState<File | null>(null);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState<File[]>([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [existingMainImage, setExistingMainImage] = useState<string | null>(null);
  const [propertyIdSearch, setPropertyIdSearch] = useState('');
  const [searchedPropertyId, setSearchedPropertyId] = useState<string | null>(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [formData, setFormData] = useState({
    tag: '',
    price: '',
    currency: 'NGN',
    property_type: '',
    marketed_by: '',
    status: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    year_built: '',
    exterior: '',
    interior: '',
    features: '',
    bathrooms: '',
    bedrooms: '',
    total_rooms: '',
  });
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string | string[] } | null>(null);

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

  // Property search handler
  const handlePropertySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchMessage('');
    setSearchedPropertyId(null);
    setAlert(null);
    if (!propertyIdSearch.trim()) {
      setSearchMessage('Please enter a Property ID');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`);
      const data = await res.json();
      if (data.success) {
        const found = data.data.find((p: Property) => p.property_id === propertyIdSearch);
        if (found) {
          setSearchedPropertyId(found.id);
          setFormData({
            tag: found.tag || '',
            price: found.price || '',
            currency: found.currency || 'NGN',
            property_type: found.property_type || '',
            marketed_by: found.marketed_by || '',
            status: found.status || '',
            address: found.address || '',
            city: found.city || '',
            state: found.state || '',
            country: found.country || '',
            zip_code: found.zip_code || '',
            year_built: found.year_built || '',
            exterior: found.exterior || '',
            interior: found.interior || '',
            features: found.features || '',
            bathrooms: found.bathrooms || '',
            bedrooms: found.bedrooms || '',
            total_rooms: found.total_rooms || '',
          });
          setExistingMainImage(found.main_image || null);
          setExistingGalleryImages(found.gallery_images || []);
          setSelectedSingleImage(null);
          setSelectedGalleryImages([]);
          setSearchMessage('Property found! You can now edit and update.');
        } else {
          setSearchMessage('Property not found.');
        }
      } else {
        setSearchMessage('Error fetching properties.');
      }
    } catch {
      setSearchMessage('Network error. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedSingleImage(file);
      setExistingMainImage(null); // Remove existing main image preview
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedGalleryImages(prev => [...prev, ...files]);
  };

  const removeSingleImage = () => {
    setSelectedSingleImage(null);
    setExistingMainImage(null);
    const input = document.getElementById('single-image') as HTMLInputElement;
    if (input) input.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setSelectedGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index: number) => {
    setExistingGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const addMoreImages = () => {
    const input = document.getElementById('gallery-images') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };


  // Update property handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);
    if (!searchedPropertyId) {
      setAlert({ type: 'error', message: ['Please search and select a property to update.'] });
      setIsSubmitting(false);
      return;
    }
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    // Main image
    if (selectedSingleImage) {
      form.append('main_image', selectedSingleImage);
    } else if (existingMainImage) {
      form.append('existing_main_image', existingMainImage);
    }
    // Gallery images
    selectedGalleryImages.forEach((file) => {
      form.append('images[]', file);
    });
    form.append('existing_gallery_images', JSON.stringify(existingGalleryImages));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${searchedPropertyId}`, {
        method: 'POST', // Laravel expects POST with _method=PATCH for FormData
        body: (() => { form.append('_method', 'PATCH'); return form; })(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAlert({ type: 'success', message: 'Property updated successfully!' });
      } else {
        if (data.errors && typeof data.errors === 'object') {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setAlert({ type: 'error', message: errorMessages });
        } else {
          setAlert({ type: 'error', message: [data.message || 'An error occurred.'] });
        }
      }
    } catch {
      setAlert({ type: 'error', message: ['Network error. Please try again.'] });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-2 sm:pt-4 px-4 sm:px-16">
        {/* Property Search Section */}
        <section className="w-full max-w-6xl mx-auto py-4">
          <form onSubmit={handlePropertySearch} className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <input
              type="text"
              placeholder="Enter Property ID to Edit"
              value={propertyIdSearch}
              onChange={e => setPropertyIdSearch(e.target.value)}
              className="px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500 w-full sm:w-80"
              required
            />
            <button
              type="submit"
              className="bg-[#b08a47] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#9a7a3d] transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
              Search
            </button>
          </form>
          {searchMessage && <div className="mb-4 text-center text-base font-medium text-[#b08a47]">{searchMessage}</div>}
        </section>
        {/* Edit Listing Section */}
        <section className="w-full max-w-6xl mx-auto py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#171717]">Edit Property</h3>
              <p className="text-red-900"><i>Note: Fill every details in every tab before clicking update...</i></p>
            </div>
            {/* Tabs */}
            <div className="mb-8">
              <ul className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200">
                {[
                  { id: 1, title: "Listing Details", icon: faList },
                  { id: 2, title: "Gallery", icon: faImage },
                  { id: 3, title: "Utilities & Building", icon: faBuilding },
                  { id: 4, title: "Interior", icon: faCouch },
                ].map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#b08a47] text-white'
                          : 'text-gray-600 hover:text-[#b08a47] hover:bg-gray-50'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                        {tab.id}
                      </span>
                      <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {alert && (
              <div className={`mb-6 p-4 rounded-lg text-center font-medium ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                {Array.isArray(alert.message) ? (
                  <ul className="list-disc list-inside text-left inline-block">
                    {alert.message.map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                ) : (
                  alert.message
                )}
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Tab 1: Listing Details */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faList} className="text-[#b08a47] text-xl" />
                    <h4 className="text-xl font-semibold text-[#171717]">Listing Details:</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                      <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} placeholder="e.g: For Sale" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <div className="flex gap-2">
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="px-3 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent bg-white"
                          required
                        >
                          <option value="NGN">₦ NGN</option>
                          <option value="USD">$ USD</option>
                          <option value="EUR">€ EUR</option>
                        </select>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="e.g: 95,000,000"
                          className="flex-1 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <input type="text" name="property_type" value={formData.property_type} onChange={handleInputChange} placeholder="e.g: Condominiums" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Marketed By</label>
                      <input type="text" name="marketed_by" value={formData.marketed_by} onChange={handleInputChange} placeholder="e.g: Toux Properties" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <input type="text" name="status" value={formData.status} onChange={handleInputChange} placeholder="e.g: Available" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g: 90 & 100 Briar Patch Road" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g: East Hampton" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="e.g: New York" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="e.g: United States" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                      <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} placeholder="e.g: 11937" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                  </div>
                </div>
              )}
              {/* Tab 2: Gallery */}
              {activeTab === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faImage} className="text-[#b08a47] text-xl" />
                    <h4 className="text-xl font-semibold text-[#171717]">Gallery Upload</h4>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Image (Single: 1920x1280)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#b08a47] transition-colors">
                        {selectedSingleImage ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faImage} className="text-[#b08a47] text-xl" />
                                <div className="text-left">
                                  <p className="font-medium text-gray-900">{selectedSingleImage.name}</p>
                                  <p className="text-sm text-gray-500">{(selectedSingleImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={removeSingleImage}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </div>
                          </div>
                        ) : existingMainImage ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${propertyIdSearch}/${existingMainImage}`}
                                  alt="Main Image"
                                  width={120}
                                  height={80}
                                  className="rounded object-cover border"
                                />
                                <div className="text-left">
                                  <p className="font-medium text-gray-900">{existingMainImage}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={removeSingleImage}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label htmlFor="single-image" className="cursor-pointer block">
                            <FontAwesomeIcon icon={faUpload} className="text-3xl text-gray-400 mb-2" />
                            <input
                              type="file"
                              name="upload_img"
                              accept="image/*"
                              onChange={handleSingleImageChange}
                              className="hidden"
                              id="single-image"
                            />
                            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                          </label>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Gallery (Multiple: 1920x1280)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#b08a47] transition-colors">
                        {existingGalleryImages.length > 0 && (
                          <div className="space-y-3">
                            <div className="text-left">
                              <p className="font-medium text-gray-900 mb-2">Existing Images ({existingGalleryImages.length})</p>
                              {existingGalleryImages.map((img, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2">
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${propertyIdSearch}/${img}`}
                                      alt={`Gallery ${index + 1}`}
                                      width={80}
                                      height={60}
                                      className="rounded object-cover border"
                                    />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{img}</p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeExistingGalleryImage(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedGalleryImages.length > 0 && (
                          <div className="space-y-3">
                            <div className="text-left">
                              <p className="font-medium text-gray-900 mb-2">New Images ({selectedGalleryImages.length})</p>
                              {selectedGalleryImages.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2">
                                  <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faImage} className="text-[#b08a47]" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <label htmlFor="gallery-images" className="cursor-pointer block mt-4">
                          <FontAwesomeIcon icon={faUpload} className="text-3xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Click to upload multiple images</span>
                          <input
                            type="file"
                            name="upload_gallery"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryImagesChange}
                            className="hidden"
                            id="gallery-images"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={addMoreImages}
                          className="bg-[#b08a47] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9a7a3d] transition-colors mt-2"
                        >
                          <FontAwesomeIcon icon={faUpload} className="mr-2" />
                          Add More Images
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Tab 3: Utilities & Building */}
              {activeTab === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faBuilding} className="text-[#b08a47] text-xl" />
                    <h4 className="text-xl font-semibold text-[#171717]">Utilities & Building:</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
                      <input type="text" name="year_built" value={formData.year_built} onChange={handleInputChange} placeholder="e.g: 2022" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exterior</label>
                      <input type="text" name="exterior" value={formData.exterior} onChange={handleInputChange} placeholder="e.g: 11.2" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interior</label>
                      <input type="text" name="interior" value={formData.interior} onChange={handleInputChange} placeholder="e.g: 13,800" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                  </div>
                </div>
              )}
              {/* Tab 4: Interior */}
              {activeTab === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faCouch} className="text-[#b08a47] text-xl" />
                    <h4 className="text-xl font-semibold text-[#171717]">Interior:</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="sm:col-span-2 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <textarea name="features" value={formData.features} onChange={handleInputChange} placeholder="e.g: Balcony, Doorman, Fitness Room, Granite Countertops, Library, Pool, Spa / Hot Tub, Gardens, Hardwood Flooring, Porte-Cochere, City Strip Views, Concierge Services, Park View" rows={3} className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                      <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} placeholder="e.g: 6" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                      <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} placeholder="e.g: 5" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Rooms</label>
                      <input type="text" name="total_rooms" value={formData.total_rooms} onChange={handleInputChange} placeholder="e.g: 11" className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b08a47] focus:border-transparent placeholder-gray-500" required />
                    </div>
                  </div>
                </div>
              )}
              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#b08a47] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#9a7a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    'Update Property'
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}