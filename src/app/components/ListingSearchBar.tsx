"use client";
import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown, FiX } from "react-icons/fi";

const currencyOptions = [
  { label: "₦ NGN", value: "NGN" },
  { label: "$ USD", value: "USD" },
  { label: "€ EUR", value: "EUR" },
];

export type ListingFilters = {
  search?: string;
  type?: "all" | "buy" | "rent";
  min_price?: string;
  max_price?: string;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
};

export default function ListingSearchBar({
  onSearch,
  onFilterChange,
  filterState,
}: {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: ListingFilters) => void;
  filterState?: ListingFilters;
}) {
  // State
  const [search, setSearch] = useState(filterState?.search || "");
  const [activeTab, setActiveTab] = useState<"all" | "buy" | "rent">(filterState?.type || "all");
  const [showPrice, setShowPrice] = useState(false);
  const [showBedsBaths, setShowBedsBaths] = useState(false);

  // Controlled filter values from parent
  const currency = filterState?.currency || "NGN";
  const minPrice = filterState?.min_price || "";
  const maxPrice = filterState?.max_price || "";
  const bedrooms = filterState?.bedrooms || 0;
  const bathrooms = filterState?.bathrooms || 0;

  // Count active filters
  const filterCount =
    (bedrooms > 0 ? 1 : 0) +
    (bathrooms > 0 ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0);

  // Button display
  const bedsBathsLabel =
    bedrooms > 0 || bathrooms > 0
      ? [
          bedrooms > 0 ? `${bedrooms}BD` : null,
          bathrooms > 0 ? `${bathrooms}BA` : null,
        ]
          .filter(Boolean)
          .join(", ")
      : "Beds & Baths";

  function formatNumberShort(n: string | number) {
    const num = typeof n === 'string' ? parseFloat(n) : n;
    if (isNaN(num)) return n;
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'K';
    return num.toString();
  }

  const priceLabel =
    minPrice || maxPrice
      ? `${currencyOptions.find((c) => c.value === currency)?.label.split(" ")[0] || ""} ${minPrice ? formatNumberShort(minPrice) : "Min"} - ${maxPrice ? formatNumberShort(maxPrice) : "Max"}`
      : "Price Range";

  // Handlers
  const handleTab = (tab: "all" | "buy" | "rent") => {
    setActiveTab(tab);
    onFilterChange?.({ type: tab });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(search);
  };

  // You can call onFilterChange with the current filter state if needed

  const priceRef = useRef<HTMLDivElement>(null);
  const bedsBathsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showPrice && priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setShowPrice(false);
      }
      if (showBedsBaths && bedsBathsRef.current && !bedsBathsRef.current.contains(event.target as Node)) {
        setShowBedsBaths(false);
      }
    }
    if (showPrice || showBedsBaths) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPrice, showBedsBaths]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-8">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex-1 flex items-center border-b border-gray-400">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          className="flex-1 bg-transparent text-gray-900 outline-none py-2 text-base"
          placeholder="Country, State, City, Address, Zip Code or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
        {/* All/Buy/Rent */}
        {["all", "buy", "rent"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab as "all" | "buy" | "rent")}
            className={`px-4 py-2 border text-sm font-semibold uppercase ${
              activeTab === tab
                ? "bg-[#0a2342] text-white border-[#0a2342]"
                : "bg-white text-[#0a2342] border-[#0a2342]"
            } rounded transition`}
          >
            {tab === "all"
              ? "All"
              : tab === "rent"
              ? "Rent"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

        {/* Price Range */}
        <div className="relative" ref={priceRef}>
          <button
            type="button"
            onClick={() => {
              setShowPrice((v) => !v);
              setShowBedsBaths(false);
            }}
            className={`px-4 py-2 border text-sm font-semibold uppercase flex items-center gap-1 ${
              showPrice ? "bg-[#0a2342] text-white border-[#0a2342]" : "bg-white text-[#0a2342] border-[#0a2342]"
            } rounded transition`}
          >
            {priceLabel}
            <FiChevronDown />
          </button>
          {showPrice && (
            <div className="absolute left-0 mt-2 w-64 bg-[#0a2342] border border-gray-200 rounded shadow-lg z-30 p-4">
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-1">Currency</label>
                <select
                  className="w-full border rounded px-2 py-1 bg-white text-[#0a2342]"
                  value={currency}
                  onChange={(e) => onFilterChange?.({ currency: e.target.value })}
                >
                  {currencyOptions.map((c) => (
                    <option key={c.value} value={c.value} className="text-[#0a2342] bg-white">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-1">Min Amount</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={minPrice}
                  placeholder="Min Amount"
                  onChange={(e) => onFilterChange?.({ min_price: e.target.value })}
                  min={0}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Max Amount</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={maxPrice}
                  placeholder="Max Amount"
                  onChange={(e) => onFilterChange?.({ max_price: e.target.value })}
                  min={0}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="text-xs text-gray-500 hover:underline"
                  onClick={() => {
                    onFilterChange?.({ min_price: "", max_price: "" });
                  }}
                  type="button"
                >
                  Clear
                </button>
                <button
                  className="text-xs px-3 py-1 bg-[#0a2342] text-white rounded"
                  onClick={() => setShowPrice(false)}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Beds & Baths */}
        <div className="relative" ref={bedsBathsRef}>
          <button
            type="button"
            onClick={() => {
              setShowBedsBaths((v) => !v);
              setShowPrice(false);
            }}
            className={`px-4 py-2 border text-sm font-semibold uppercase flex items-center gap-1 min-w-[140px] justify-start ${
              showBedsBaths ? "bg-[#0a2342] text-white border-[#0a2342]" : "bg-white text-[#0a2342] border-[#0a2342]"
            } rounded transition`}
          >
            <span className="truncate">{bedsBathsLabel}</span>
            <FiChevronDown />
          </button>
          {showBedsBaths && (
            <div className="absolute left-0 mt-2 w-72 bg-[#0a2342] text-white border border-gray-200 rounded shadow-lg z-30 p-6">
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setShowBedsBaths(false)}
                type="button"
              >
                <FiX size={20} />
              </button>
              <div className="mb-6">
                <label className="block text-base font-semibold mb-2">Bedrooms</label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={bedrooms}
                  onChange={(e) => onFilterChange?.({ bedrooms: Number(e.target.value) })}
                  className="w-full accent-[#c7a256]"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>0+</span>
                  <span>5+</span>
                </div>
              </div>
              <div>
                <label className="block text-base font-semibold mb-2">Bathrooms</label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={bathrooms}
                  onChange={(e) => onFilterChange?.({ bathrooms: Number(e.target.value) })}
                  className="w-full accent-[#c7a256]"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>0+</span>
                  <span>5+</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="text-xs text-gray-300 hover:underline"
                  onClick={() => {
                    onFilterChange?.({ bedrooms: 0, bathrooms: 0 });
                  }}
                  type="button"
                >
                  Clear
                </button>
                <button
                  className="text-xs px-3 py-1 bg-[#c7a256] text-[#0a2342] rounded"
                  onClick={() => setShowBedsBaths(false)}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters Button */}
        <button
          className={`px-4 py-2 border text-sm font-semibold uppercase rounded transition ${
            filterCount > 0
              ? "bg-[#0a2342] text-white border-[#0a2342]"
              : "bg-white text-[#0a2342] border-[#0a2342]"
          }`}
        >
          Filters{filterCount > 0 ? ` (${filterCount})` : ""}
        </button>
      </div>
    </div>
  );
}
