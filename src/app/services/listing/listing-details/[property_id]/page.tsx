"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import NavBar from "../../../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faArrowRight, faExpand, faCompress, faSearchPlus, faSearchMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../../../Footer";
import Link from "next/link";

type Property = {
  property_id: string;
  tag: string;
  price: string;
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
  bathrooms: number;
  bedrooms: number;
  total_rooms: string;
  main_image: string | null;
  gallery_images: string[];
  currency: string;
  [key: string]: unknown;
};

export default function ListingDetails() {
  const { property_id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryModalRef = useRef<HTMLDivElement>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [aspectFit, setAspectFit] = useState(true);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{x: number, y: number, panX: number, panY: number} | null>(null);

  // Add refs for scroll sections
  const overviewRef = useRef<HTMLDivElement>(null!);
  const detailsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);

  // Scroll handler
  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactAlert, setContactAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleContactInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactAlert(null);
    if (!property) {
      setContactAlert({ type: 'error', message: 'Property not loaded. Please try again.' });
      setContactLoading(false);
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact-property`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          property_id: property.property_id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContactAlert({ type: 'success', message: 'Your message has been sent successfully!' });
        setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setContactAlert({ type: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch {
      setContactAlert({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setContactLoading(false);
      setTimeout(() => setContactAlert(null), 6000);
    }
  };

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`);
        const data = await res.json();
        if (data.success) {
          const found = data.data.find((p: Property) => p.property_id === property_id);
          setProperty(found || null);
        } else {
          setProperty(null);
        }
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    if (property_id) fetchProperty();
  }, [property_id]);

  // Fullscreen controls
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleAspectToggle = () => setAspectFit((fit) => !fit);
  const handleExitFullscreen = () => {
    setFullscreenIndex(null);
    setZoom(1);
    setAspectFit(true);
  };

  // Panning handlers
  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1 && aspectFit) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX,
      panY,
    };
  };
  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPanX(dragStart.current.panX + dx);
    setPanY(dragStart.current.panY + dy);
  };
  const handleImageMouseUp = () => {
    setIsDragging(false);
    dragStart.current = null;
  };
  // Touch events for mobile
  const handleImageTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 && aspectFit) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      panX,
      panY,
    };
  };
  const handleImageTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPanX(dragStart.current.panX + dx);
    setPanY(dragStart.current.panY + dy);
  };
  const handleImageTouchEnd = () => {
    setIsDragging(false);
    dragStart.current = null;
  };

  // Reset pan on exit or image change
  useEffect(() => {
    setPanX(0);
    setPanY(0);
  }, [fullscreenIndex, aspectFit, zoom]);

  // Move loading and error UI here, after all hooks
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found.</div>;

  const galleryImages = property.gallery_images || [];
  const mainImageUrl = property.main_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${property.property_id}/${property.main_image}` : "/images/listing/big.jpg";

  // Currency symbol helper
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'NGN':
      default: return '₦';
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-2 md:pt-0 sm:pt-4 px-4 sm:px-16">
        {/* Listing Details Section */}
        <div className="w-full flex justify-center mt-4">
          <div className="w-full max-w-6xl relative bg-white rounded-2xl shadow-md overflow-hidden min-h-[440px] flex items-center justify-center">
            {/* Main Listing Image */}
            <Image
              src={mainImageUrl}
              alt={property.tag}
              fill
              className="object-cover w-full h-full rounded-2xl"
              priority
            />
            {/* Overlay: Tag */}
            <span className="absolute top-4 left-4 bg-red-600 text-white rounded-lg px-4 py-2 text-base font-semibold shadow z-20">
              {property.tag}
            </span>
            {/* Overlay: View all Photos */}
            <button
              className="absolute bottom-4 right-4 bg-white text-gray-800 rounded-lg px-4 py-2 text-base font-medium shadow flex items-center gap-2 z-20 cursor-pointer transition hover:bg-gray-100 hover:shadow-lg"
              onClick={() => setGalleryOpen(true)}
            >
              <FontAwesomeIcon icon={faImages} className="w-5 h-5" />
              View all {galleryImages.length} Photos
            </button>
          </div>
        </div>

        {/* Gallery Modal */}
        {galleryOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={e => {
              if (galleryModalRef.current && !galleryModalRef.current.contains(e.target as Node)) {
                setGalleryOpen(false);
              }
            }}
          >
            <div ref={galleryModalRef as React.RefObject<HTMLDivElement>} className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
              <button className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-red-600" onClick={() => setGalleryOpen(false)}>&times;</button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500">No gallery images.</div>
                ) : (
                  galleryImages.map((img: string, idx: number) => (
                    <Image
                      key={idx}
                      src={property ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${property.property_id}/${img}` : ''}
                      alt={`Gallery ${idx + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full h-60 cursor-pointer transition-transform hover:scale-105"
                      onClick={() => {
                        setFullscreenIndex(idx);
                        setZoom(1);
                        setAspectFit(true);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Image Modal */}
        {fullscreenIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <button className="absolute top-6 right-8 text-3xl text-blue-900 hover:text-red-400 z-50" onClick={handleExitFullscreen}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={property ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${property.property_id}/${galleryImages[fullscreenIndex]}` : ''}
                alt={`Gallery Fullscreen ${fullscreenIndex + 1}`}
                width={900}
                height={700}
                style={{
                  objectFit: aspectFit ? 'contain' : 'cover',
                  width: zoom * 100 + '%',
                  height: zoom * 100 + '%',
                  maxWidth: zoom > 1 ? 'none' : '90vw',
                  maxHeight: zoom > 1 ? 'none' : '80vh',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
                  cursor: (zoom > 1 || !aspectFit) ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  transform: `translate(${panX}px, ${panY}px)`
                }}
                className="mx-auto transition-all duration-300"
                onMouseDown={handleImageMouseDown}
                onMouseMove={handleImageMouseMove}
                onMouseUp={handleImageMouseUp}
                onMouseLeave={handleImageMouseUp}
                onTouchStart={handleImageTouchStart}
                onTouchMove={handleImageTouchMove}
                onTouchEnd={handleImageTouchEnd}
              />
              {/* Controls Bar */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 bg-white/90 rounded-full px-6 py-3 shadow-lg border z-50">
                <button onClick={handleAspectToggle} className="p-2 rounded-full hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={aspectFit ? faExpand : faCompress} className="w-6 h-6 text-black" />
                </button>
                <button onClick={handleZoomOut} className="p-2 rounded-full hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faSearchMinus} className="w-6 h-6 text-black" />
                </button>
                <span className="font-semibold text-lg mx-2 text-black">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 rounded-full hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faSearchPlus} className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overview Section */}
        <div ref={overviewRef} className="w-full flex justify-center mt-8">
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
            {/* Details With Navigation */}
            <div className="flex-1">
              {/* Navigation Tabs */}
              <div className="flex gap-8 border-b border-[#b08a47] mb-6">
                <button
                  className="pb-1.5 text-base font-semibold text-[#171717] border-b-2 border-[#b08a47] focus:outline-none"
                  onClick={() => handleScrollTo(overviewRef)}
                  type="button"
                >
                  OVERVIEW
                </button>
                <button
                  className="pb-1.5 text-base font-medium text-[#b8b8b8] hover:text-[#b08a47] focus:outline-none"
                  onClick={() => handleScrollTo(detailsRef)}
                  type="button"
                >
                  PROPERTY DETAILS
                </button>
                <button
                  className="pb-1.5 text-base font-medium text-[#b8b8b8] hover:text-[#b08a47] focus:outline-none"
                  onClick={() => handleScrollTo(contactRef)}
                  type="button"
                >
                  LET&apos;S GET IN TOUCH
                </button>
              </div>
              {/* Address */}
              <h2 className="text-2xl font-semibold text-[#171717] leading-tight mb-1">
                {property.address}<br/>
                {property.city}, {property.state}, {property.zip_code}<br/>
                {property.country}
              </h2>
              {/* Property Info Grid */}
              <div className="flex flex-wrap gap-6 mt-6 mb-2">
                <div>
                  <div className="text-[#b08a47] text-sm font-semibold tracking-widest mb-0.5">PRICE</div>
                  <div className="text-xl font-semibold text-[#171717]">{getCurrencySymbol(property.currency)}{Number(property.price).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[#b08a47] text-sm font-semibold tracking-widest mb-0.5">BEDROOMS</div>
                  <div className="text-lg font-medium text-[#171717]">{property.bedrooms}</div>
                </div>
                <div>
                  <div className="text-[#b08a47] text-sm font-semibold tracking-widest mb-0.5">BATHROOMS</div>
                  <div className="text-lg font-medium text-[#171717]">{property.bathrooms}</div>
                </div>
                <div>
                  <div className="text-[#b08a47] text-sm font-semibold tracking-widest mb-0.5">INTERIOR</div>
                  <div className="text-lg font-medium text-[#171717]">{property.interior} Sq Ft.</div>
                </div>
              </div>
              <div className="mt-1 mb-8">
                <div className="text-[#b08a47] text-sm font-semibold tracking-widest mb-0.5">EXTERIOR</div>
                <div className="text-lg font-medium text-[#171717]">{property.exterior} Acre(s)</div>
              </div>
            </div>
            {/* Enquire Box */}
            <div className="w-full md:w-[300px] flex flex-col gap-4 mt-6 md:mt-0">
              <div className="bg-[#0a2240] rounded-xl shadow-md flex flex-col justify-center px-4 py-4">
                <div className="text-white text-lg font-semibold mb-1">
                  Let&apos;s Get in Touch
                </div>
                <button
                  className="flex items-center justify-between bg-transparent text-white text-base font-medium mt-1 group"
                  type="button"
                  onClick={() => handleScrollTo(contactRef)}
                >
                  <span>
                    SEND MESSAGE
                  </span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Property Details Section */}
        <div ref={detailsRef} className="w-full flex justify-center mt-10">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md px-6 py-8">
            {/* Title */}
            <h3 className="text-2xl font-serif font-normal text-[#171717] mb-6 border-b border-[#b08a47] pb-2">
              Amenities & Features
            </h3>
            {/* Listing Details */}
            <div className="mb-6">
              <div className="text-[#b08a47] text-base font-semibold mb-2">
                Listing Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-[15px]">
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">PROPERTY ID</div>
                  <div className="text-[#171717] font-medium">{property.property_id}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">TAG</div>
                  <div className="text-[#171717] font-medium">{property.tag}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">PRICE</div>
                  <div className="text-[#171717] font-medium">{getCurrencySymbol(property.currency)}{Number(property.price).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">PROPERTY TYPE</div>
                  <div className="text-[#171717] font-medium">{property.property_type}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">MARKETED BY</div>
                  <div className="text-[#171717] font-medium leading-tight">{property.marketed_by}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">STATUS</div>
                  <div className="text-[#171717] font-medium">{property.status}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">Address</div>
                  <div className="text-[#171717] font-medium">{property.address}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">City</div>
                  <div className="text-[#171717] font-medium">{property.city}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">State</div>
                  <div className="text-[#171717] font-medium">{property.state}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">COUNTRY</div>
                  <div className="text-[#171717] font-medium">{property.country}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">Zip Code</div>
                  <div className="text-[#171717] font-medium">{property.zip_code}</div>
                </div>
              </div>
            </div>
            {/* Utilities & Building */}
            <div className="mb-6">
              <div className="text-[#b08a47] text-base font-semibold mb-2">
                Utilities & Building
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-[15px]">
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">YEAR BUILT</div>
                  <div className="text-[#171717] font-medium">{property.year_built}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">Exterior</div>
                  <div className="text-[#171717] font-medium">{property.exterior} Acre(s)</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">Interior</div>
                  <div className="text-[#171717] font-medium">{property.interior} Sq Ft.</div>
                </div>
              </div>
            </div>
            {/* Interior */}
            <div>
              <div className="text-[#b08a47] text-base font-semibold mb-2">
                Interior
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-[15px]">
                <div className="md:col-span-2">
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">FEATURES</div>
                  <div className="text-[#171717] font-medium leading-tight">{property.features}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">BATHROOMS</div>
                  <div className="text-[#171717] font-medium">{property.bathrooms}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">BEDROOMS</div>
                  <div className="text-[#171717] font-medium">{property.bedrooms}</div>
                </div>
                <div>
                  <div className="text-[#b8b8b8] text-xs font-semibold mb-1">TOTAL ROOMS</div>
                  <div className="text-[#171717] font-medium">{property.total_rooms}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Form Section */}
        <div ref={contactRef} className="w-full flex justify-center mt-12 mb-16">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md px-6 py-10 flex flex-col items-center">
                <h2 className="text-2xl font-serif font-normal text-[#171717] mb-8 w-full text-left">
                    Let&apos;s get in touch
                </h2>

                <form className="w-full flex flex-col gap-6" onSubmit={handleContactSubmit}>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col">
                            <label className="text-[#b8b8b8] text-sm font-normal mb-1">
                                First Name
                            </label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={contactForm.firstName}
                                onChange={handleContactInput}
                                required
                                className="border-b border-[#b8b8b8] bg-transparent px-0 py-1.5 text-[#6b6b6b] text-base focus:outline-none focus:border-[#b08a47] transition-colors" 
                            />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="text-[#b8b8b8] text-sm font-normal mb-1">
                                Last Name
                            </label>
                            <input 
                                type="text"
                                name="lastName"
                                value={contactForm.lastName}
                                onChange={handleContactInput}
                                required
                                className="border-b border-[#b8b8b8] bg-transparent px-0 py-1.5 text-[#6b6b6b] text-base focus:outline-none focus:border-[#b08a47] transition-colors" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col">
                            <label className="text-[#b8b8b8] text-sm font-normal mb-1">
                                Email Address
                            </label>
                            <input 
                                type="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactInput}
                                required
                                className="border-b border-[#b8b8b8] bg-transparent px-0 py-1.5 text-[#6b6b6b] text-base focus:outline-none focus:border-[#b08a47] transition-colors" 
                            />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="text-[#b8b8b8] text-sm font-normal mb-1">
                                Phone number (Optional)
                            </label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={contactForm.phone}
                                onChange={handleContactInput}
                                className="border-b border-[#b8b8b8] bg-transparent px-0 py-1.5 text-[#6b6b6b] text-base focus:outline-none focus:border-[#b08a47] transition-colors" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <label className="text-[#171717] text-sm font-medium mb-2">
                            Message (Optional)
                        </label>
                        <textarea 
                            rows={4} 
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInput}
                            className="border border-[#b8b8b8] rounded resize-none px-3 py-2 text-[#6b6b6b] text-base bg-transparent focus:outline-none focus:border-[#b08a47] transition-colors" 
                            placeholder={`I'm interested in the property at ${property.address}, ${property.city}, ${property.state}, ${property.country}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <button 
                            type="submit" 
                            className="w-full sm:w-fit px-8 py-2.5 bg-[#0a2240] text-white text-base font-semibold rounded shadow flex items-center justify-center gap-3 hover:bg-[#0d2a54] transition-colors"
                            disabled={contactLoading}
                        >
                            {contactLoading ? 'Sending...' : 'SEND MESSAGE'}
                            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                        </button>
                    </div>

                    {contactAlert && (
                      <div className={`mt-2 text-center text-base font-medium ${contactAlert.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{contactAlert.message}</div>
                    )}
                </form>

                <div className="w-full mt-8 text-sm text-[#6b6b6b]">
                    <p className="mb-2">
                        By submitting this form, you acknowledge that you accept the Toux Properties 
                        <Link href="/privacy" className="text-[#0a2240] underline font-medium">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <p className="mb-2 text-xs">
                        This site is protected by reCAPTCHA and the Google 
                        <Link href="/privacy" className="text-[#0a2240] underline font-medium">
                            Privacy Policy
                        </Link> 
                        apply.
                    </p>
                    <p className="mt-6 text-xs">
                        Yes, I would like more information from Toux Properties. Please use and/or share 
                        my information with a 
                        <span className="italic">
                            Toux Properties
                        </span> 
                        agent to contact me about my real estate needs.
                    </p>
                    <p className="mt-2 text-xs">
                        By clicking SEND MESSAGE, I agree a 
                        <span className="italic">
                            Toux Properties
                        </span> 
                        Agent may contact me by phone or text message including by automated means about 
                        real estate services, and that I can access real estate services without providing my 
                        phone number. I acknowledge that I have read and agree to the 
                        <Link href="/privacy" className="text-[#0a2240] underline font-medium">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
            
            <Footer />
        </div>
    </>
  );
}
