import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const CATEGORY_KEYWORDS = [
  { keyword: "men kurta", path: "/men/men_kurte/kurta", label: "Explore all Men Kurtas" },
  { keyword: "men shirt", path: "/men/men_shirt/shirt", label: "Explore all Men shirt" },
  { keyword: "kurta", path: "/men/men_kurte/kurta", label: "Explore Kurta" },
  { keyword: "saree", path: "/all-products_page", label: "Explore all Sarees" },
  { keyword: "gopi dress", path: "/women/gopi_dress/gopi", label: "Explore Gopi Dresses" },
  { keyword: "blouse", path: "/women/blousess/blous_e", label: "Explore Blouses" },
  { keyword: "kurti", path: "/women/kurti/kurtis", label: "Explore Kurti" },
  { keyword: "jacket", path: "/women/jacket/jackets", label: "Explore Jackets" },
  { keyword: "Dcot", path: "/women/dcoat/dcoats", label: "Explore D`Cot" }

];

export default function NavigationSearchDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryLink, setCategoryLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const performSearch = async (term) => {
    if (term.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      setCategoryLink(null);
      return;
    }

    // Check for category link
    const matchedCategory = CATEGORY_KEYWORDS.find((cat) =>
      term.toLowerCase().includes(cat.keyword)
    );
    setCategoryLink(matchedCategory || null);

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/search`, {
        params: { query: term },
      });
      setSearchResults(res.data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search failed:", err);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the search
    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(term);
    }, 300); // 300ms debounce
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto md:mx-0">
      <input
        type="text"
        className="w-full border rounded-md px-3 py-2"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => (searchResults.length > 0 || categoryLink) && setShowDropdown(true)}
      />

      {(showDropdown && (categoryLink || searchResults.length > 0)) && (
        <ul className="absolute z-50 bg-white border rounded-md w-full mt-1 max-h-72 overflow-auto shadow-md">
          {loading && (
            <li className="p-3 text-center text-gray-500">Searching...</li>
          )}

          {!loading && categoryLink && (
            <li
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-purple-50 bg-purple-100 text-purple-900 font-medium border-b"
              onClick={() => {
                navigate(categoryLink.path);
                setShowDropdown(false);
              }}
            >
              <span>{categoryLink.label}</span>
            </li>
          )}

          {!loading &&
            searchResults.map((product) => {
              const images = product.colorVariants?.[0]?.images || [];
              const frontImage =
                images.find((img) => img.label === "front")?.url || "https://via.placeholder.com/50";

              return (
                <li
                  key={product._id}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={frontImage}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm truncate">{product.title}</span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
