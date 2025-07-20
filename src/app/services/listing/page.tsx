"use client";
import Image from "next/image";
import NavBar from "../../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../Footer";
import ScrollFadeSection from "../../components/ScrollFadeSection";
import ListingSearchBar from "../../components/ListingSearchBar";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
// Import ListingFilters type
import type { ListingFilters } from "../../components/ListingSearchBar";

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
};

export default function Listing() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ListingFilters>({
    search: "",
    type: "all",
    min_price: "",
    max_price: "",
    currency: "NGN",
    bedrooms: 0,
    bathrooms: 0,
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 15;
  const [lastPage, setLastPage] = useState(1);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.type && filters.type !== "all") params.append("type", filters.type);
      if (filters.min_price) params.append("min_price", filters.min_price);
      if (filters.max_price) params.append("max_price", filters.max_price);
      if (filters.currency) params.append("currency", filters.currency);
      if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString());
      if (filters.bathrooms) params.append("bathrooms", filters.bathrooms.toString());
      params.append("page", page.toString());
      params.append("per_page", perPage.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
        setTotal(data.total);
        setLastPage(data.last_page);
      } else {
        setProperties([]);
        setTotal(0);
        setLastPage(1);
      }
    } catch {
      setProperties([]);
      setTotal(0);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Handler for ListingSearchBar
  const handleFilterChange = (newFilters: Partial<ListingFilters>) => {
    setFilters((prev: ListingFilters) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const viewingTo = Math.min(page * perPage, total);
  // const viewingFrom = total === 0 ? 0 : (page - 1) * perPage + 1;
  const locationText = filters.search ? filters.search : "All locations";
  const homesText = `Viewing ${viewingTo} of ${total.toLocaleString()} Homes for Sale in ${locationText}`;
  const homesDesc = "Showing listings marketed by all brokers in the searched area.";

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
      <div className="w-full overflow-x-hidden bg-[#f7f3ef] min-h-screen flex flex-col items-center justify-start pt-2 sm:pt-4 px-4 sm:px-16">
        <ListingSearchBar
          onSearch={(search) => handleFilterChange({ search })}
          onFilterChange={handleFilterChange}
          filterState={filters}
        />
        
        {/* Property Details Section */}
        <ScrollFadeSection>
        <section className="w-screen flex flex-col items-center justify-center bg-[#f7f3ef] py-8 sm:py-10 px-2 sm:px-4 md:py-16 md:px-8 mb-40">
          {/* Always show summary text */}
        <div className="w-full text-left text-gray-900 text-base font-medium mb-4">
          {homesText}
          <p className="w-full text-left text-gray-500 text-sm font-normal">
          {homesDesc}
          </p>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 lg:gap-y-20 w-full max-w-7xl mt-4 justify-center items-stretch">
            {loading ? (
              <div className="col-span-full text-center text-lg text-gray-500">Loading...</div>
            ) : properties.length === 0 ? (
              <div className="col-span-full text-center text-lg text-gray-500">No property yet.</div>
            ) : (
              properties.map((property) => (
                <Link key={property.property_id} href={`/services/listing/listing-details/${property.property_id}`} className="block">
                  <div className="relative w-full max-w-[400px] mx-auto flex flex-col overflow-visible pb-20">
                    {/* Label */}
                    <span className="absolute top-4 left-4 bg-red-500 text-white rounded px-3 py-1 text-xs sm:text-sm font-medium shadow z-10">
                      {property.tag}
                    </span>
                    {/* Image Box */}
                    <div className="relative bg-white rounded-2xl shadow-lg w-full h-[220px] xs:h-[240px] md:h-[260px]">
                      <Image 
                        src={property.main_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/uploads/${property.property_id}/${property.main_image}` : "/images/homepage/pr1.webp"} 
                        alt={property.tag}
                        fill 
                        className="object-cover rounded-2xl w-full h-full" 
                      />
                      {/* Details Box */}
                      <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 translate-y-1/2 w-[92%] sm:w-[90%] bg-white rounded-xl shadow-lg p-4 sm:p-5 flex flex-col gap-3 z-20">
                        <span className="text-base sm:text-lg font-semibold text-[#171717] bg-[#f7f3ef] px-2 py-1 rounded w-fit">
                          {getCurrencySymbol(property.currency)}{Number(property.price).toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2 text-[#171717] text-sm sm:text-base">
                          <FontAwesomeIcon icon={faLocationDot} className="text-[#171717] w-3 text-[14px] leading-none" />
                          <span>{property.state}, {property.country}</span>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6 text-[#171717] text-sm sm:text-base">
                          <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBed} className="text-[#171717] w-4 text-[16px]" />{property.bedrooms}</span>
                          <span className="flex items-center gap-1"><FontAwesomeIcon icon={faBath} className="text-[#171717] w-4 text-[16px]" />{property.bathrooms}</span>
                        </div>
                        <hr />
                        <span className="text-[#171717] text-sm sm:text-base mt-2">{property.tag}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
        </ScrollFadeSection>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex justify-center text-gray-900 mb-10 items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-2 py-1"
            >
              &lt;
            </button>
            {(() => {
              const pages = [];
              for (let i = 1; i <= lastPage; i++) {
                if (
                  i === 1 ||
                  i === lastPage ||
                  (i >= page - 2 && i <= page + 2)
                ) {
                  pages.push(i);
                } else if (
                  (i === page - 3 && page - 3 > 1) ||
                  (i === page + 3 && page + 3 < lastPage)
                ) {
                  pages.push("...");
                }
              }
              return pages.map((p, idx) =>
                p === "..." ? (
                  <span key={idx} className="px-2">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => handlePageChange(Number(p))}
                    className={`px-2 py-1 ${page === p ? "border-b-2 border-yellow-500 font-bold" : ""}`}
                  >
                    {p}
                  </button>
                )
              );
            })()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === lastPage}
              className="px-2 py-1"
            >
              &gt;
            </button>
          </div>
        )}

        <Footer />
        
        
      </div>
    </>
  );
}
