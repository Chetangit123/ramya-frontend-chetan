// import { Fragment, useEffect, useState } from "react";
// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import Pagination from "@mui/material/Pagination";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// import { filters, singleFilter, sortOptions } from "./FilterData";
// import ProductCard from "../ProductCard/ProductCard";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { findProducts } from "../../../../Redux/Customers/Product/Action";
// import BackdropComponent from "../../BackDrop/Backdrop";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Product() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const param = useParams();
//   const location = useLocation();

//   const decodedQueryString = decodeURIComponent(location.search);
//   const searchParams = new URLSearchParams(decodedQueryString);
//   const colorValue = searchParams.get("color") || "";
//   const sizeValue = searchParams.get("size") || "";
//   const price = searchParams.get("price") || "";
//   const discount = searchParams.get("disccout") || "";
//   const sortValue = searchParams.get("sort") || "";
//   const pageNumber = Number(searchParams.get("page")) || 1;
//   const stock = searchParams.get("stock") || "";

//   const customersProduct = useSelector((store) => store.customersProduct.products) || {
//     content: [],
//     totalPages: 1,
//   };
//   const loading = useSelector((store) => store.customersProduct.loading);

//   // Build fetch/filter data for API query
//   useEffect(() => {
//     const [minPrice, maxPrice] = price
//       ? price.split("-").map(Number)
//       : [0, 100000];
//     const data = {
//       category: param.lavelThree,
//       colors: colorValue || [],
//       sizes: sizeValue || [],
//       minPrice: minPrice || 0,
//       maxPrice: maxPrice || 100000,
//       minDiscount: discount || 0,
//       sort: sortValue || "price_low",
//       pageNumber,
//       pageSize: 50,
//       stock,
//     };
//     dispatch(findProducts(data));
//     console.log(data, "data")
//   }, [
//     param.lavelThree,
//     colorValue,
//     sizeValue,
//     price,
//     discount,
//     sortValue,
//     stock,
//     pageNumber,
//     dispatch,
//   ]);
//   // Filter checkbox handler
//   const handleFilter = (value, sectionId) => {
//     const searchParams = new URLSearchParams(location.search);
//     let filterValues = searchParams.getAll(sectionId);

//     if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
//       filterValues = filterValues[0]
//         .split(",")
//         .filter((item) => item !== value);
//       if (filterValues.length === 0) {
//         searchParams.delete(sectionId);
//       } else {
//         searchParams.set(sectionId, filterValues.join(","));
//       }
//     } else {
//       filterValues.push(value);
//       searchParams.set(sectionId, filterValues.join(","));
//     }
//     // Reset page on filter change
//     searchParams.delete("page");
//     navigate({ search: `?${searchParams.toString()}` });
//   };

//   // Filter radio handler
//   const handleRadioFilterChange = (e, sectionId) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set(sectionId, e.target.value);
//     // Reset page on radio change
//     searchParams.delete("page");
//     navigate({ search: `?${searchParams.toString()}` });
//   };

//   // Sort handler
//   const handleSortChange = (value) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set("sort", value);
//     searchParams.delete("page");
//     navigate({ search: `?${searchParams.toString()}` });
//   };

//   // Pagination handler
//   const handlePaginationChange = (event, value) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set("page", value);
//     navigate({ search: `?${searchParams.toString()}` });
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     navigate({ search: "" });
//   };

//   return (
//     <div className="bg-white -z-20">
//       {/* Mobile filter dialog */}
//       <Transition.Root show={mobileFiltersOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-40 lg:hidden"
//           onClose={setMobileFiltersOpen}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-40 flex">
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="translate-x-full"
//             >
//               <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//                 <div className="flex items-center justify-between px-4">
//                   <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                   <button
//                     type="button"
//                     className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                     onClick={() => setMobileFiltersOpen(false)}
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>

//                 {/* Reset filters button mobile */}
//                 <div className="px-5 mt-4">
//                   <button
//                     onClick={resetFilters}
//                     className="py-2 px-4 font-semibold rounded w-full"
//                     style={{ backgroundColor: "rgb(85, 31, 61)", color: "white" }}
//                   >
//                     Reset Filters
//                   </button>
//                 </div>

//                 <form className="p-5">
//                   {filters.map((section, idx) => (
//                     <div key={section.id} className="mb-6">
//                       <Disclosure className="border-b border-gray-200 pb-6">
//                         {({ open }) => (
//                           <>
//                             <h3 className="-my-3 flow-root">
//                               <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                                 <span className="font-medium text-gray-900">{section.name}</span>
//                                 <span className="ml-6 flex items-center">
//                                   {open ? (
//                                     <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                                   ) : (
//                                     <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                                   )}
//                                 </span>
//                               </Disclosure.Button>
//                             </h3>
//                             <Disclosure.Panel className="pt-4">
//                               <div className="space-y-4">
//                                 {section.id === "color" ? (
//                                   <Autocomplete
//                                     options={section.options}
//                                     getOptionLabel={(option) => option.label}
//                                     onChange={(event, newValue) => {
//                                       if (newValue) handleFilter(newValue.value, section.id);
//                                     }}
//                                     renderInput={(params) => (
//                                       <TextField
//                                         {...params}
//                                         label={`Search ${section.name}`}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     )}
//                                   />
//                                 ) : (
//                                   section.options.map((option, optionIdx) => (
//                                     <div key={option.value} className="flex items-center">
//                                       <input
//                                         id={`filter-${section.id}-${optionIdx}`}
//                                         name={`${section.id}[]`}
//                                         defaultValue={option.value}
//                                         type="checkbox"
//                                         defaultChecked={option.checked}
//                                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                         onChange={() => handleFilter(option.value, section.id)}
//                                       />
//                                       <label
//                                         htmlFor={`filter-${section.id}-${optionIdx}`}
//                                         className="ml-3 text-sm text-gray-600"
//                                       >
//                                         {option.label}
//                                       </label>
//                                     </div>
//                                   ))
//                                 )}
//                               </div>
//                             </Disclosure.Panel>
//                           </>
//                         )}
//                       </Disclosure>

//                       {idx < filters.length - 1 && (
//                         <hr className="my-4 border-gray-300" />
//                       )}
//                     </div>
//                   ))}

//                   {/* Divider between filters and singleFilter */}
//                   <hr className="my-6 border-gray-300" />

//                   {singleFilter.map((section, idx) => (
//                     <div key={section.id} className="mb-6">
//                       <Disclosure className="border-b border-gray-200 pb-6">
//                         {({ open }) => (
//                           <>
//                             <h3 className="-my-3 flow-root">
//                               <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                                 <span className="font-medium text-gray-900">{section.name}</span>
//                                 <span className="ml-6 flex items-center">
//                                   {open ? (
//                                     <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                                   ) : (
//                                     <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                                   )}
//                                 </span>
//                               </Disclosure.Button>
//                             </h3>
//                             <Disclosure.Panel className="pt-4">
//                               <FormControl>
//                                 <RadioGroup
//                                   aria-labelledby="demo-radio-buttons-group-label"
//                                   name="radio-buttons-group"
//                                   defaultValue=""
//                                 >
//                                   {section.options.map((option, optionIdx) => (
//                                     <FormControlLabel
//                                       key={optionIdx}
//                                       value={option.value}
//                                       control={<Radio />}
//                                       label={option.label}
//                                       onChange={(e) => handleRadioFilterChange(e, section.id)}
//                                     />
//                                   ))}
//                                 </RadioGroup>
//                               </FormControl>
//                             </Disclosure.Panel>
//                           </>
//                         )}
//                       </Disclosure>

//                       {idx < singleFilter.length - 1 && (
//                         <hr className="my-4 border-gray-300" />
//                       )}
//                     </div>
//                   ))}
//                 </form>

//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>

//       <main className="mx-auto px-4 lg:px-14">
//         <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
//           {customersProduct?.content && customersProduct.content.length > 0 && (
//             <h1 className="heading_text_category">
//               {console.log(customersProduct, "customerProduct")}
//               {/* {customersProduct.content[0].title.toLowerCase()} */}
//               {customersProduct.content[0]?.category?.name?.toUpperCase()}
//             </h1>
//           )}
//           <div className="flex items-center">
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                   Sort
//                   <ChevronDownIcon
//                     className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                     aria-hidden="true"
//                   />
//                 </Menu.Button>
//               </div>

//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <div className="py-1">
//                     {sortOptions.map((option) => (
//                       <Menu.Item key={option.name}>
//                         {({ active }) => (
//                           <p
//                             onClick={() => handleSortChange(option.query)}
//                             className={classNames(
//                               option.current
//                                 ? "font-medium text-gray-900"
//                                 : "text-gray-500",
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm cursor-pointer"
//                             )}
//                           >
//                             {option.name}
//                           </p>
//                         )}
//                       </Menu.Item>
//                     ))}
//                   </div>
//                 </Menu.Items>
//               </Transition>
//             </Menu>

//             <button
//               type="button"
//               className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
//             >
//               <span className="sr-only">View grid</span>
//               <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
//             </button>

//             <button
//               type="button"
//               className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//               onClick={() => setMobileFiltersOpen(true)}
//             >
//               <span className="sr-only">Filters</span>
//               <FunnelIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//         </div>

//         <section
//           aria-labelledby="products-heading"
//           className="pb-24 pt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5"
//         >
//           {/* Left filter sidebar */}
//           <aside className="hidden lg:block lg:col-span-1 border rounded-md p-5 filters-sidebar">
//             <button
//               onClick={resetFilters}
//               className="py-2 px-4 font-semibold rounded mb-4 w-full"
//               style={{ backgroundColor: "rgb(85, 31, 61)", color: "white" }}
//             >
//               Reset Filters
//             </button>

//             <form>
//               {filters.map((section, idx) => (
//                 <div key={section.id} className="mb-6"> {/* gap between filters */}
//                   <Disclosure className="border-b border-gray-200 pb-6">
//                     {({ open }) => (
//                       <>
//                         <h3 className="-my-3 flow-root">
//                           <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                             <span className="font-medium text-gray-900">{section.name}</span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                               ) : (
//                                 <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </span>
//                           </Disclosure.Button>
//                         </h3>
//                         <Disclosure.Panel className="pt-4">
//                           <div className="space-y-4">
//                             {section.id === "color" ? (
//                               <Autocomplete
//                                 options={section.options}
//                                 getOptionLabel={(option) => option.label}
//                                 onChange={(event, newValue) => {
//                                   if (newValue) handleFilter(newValue.value, section.id);
//                                 }}
//                                 renderInput={(params) => (
//                                   <TextField
//                                     {...params}
//                                     label={`Search ${section.name}`}
//                                     variant="outlined"
//                                     size="small"
//                                   />
//                                 )}
//                               />
//                             ) : (
//                               section.options.map((option, optionIdx) => (
//                                 <div key={option.value} className="flex items-center">
//                                   <input
//                                     id={`filter-${section.id}-${optionIdx}`}
//                                     name={`${section.id}[]`}
//                                     defaultValue={option.value}
//                                     type="checkbox"
//                                     defaultChecked={option.checked}
//                                     className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                     onChange={() => handleFilter(option.value, section.id)}
//                                   />
//                                   <label
//                                     htmlFor={`filter-${section.id}-${optionIdx}`}
//                                     className="ml-3 text-sm text-gray-600"
//                                   >
//                                     {option.label}
//                                   </label>
//                                 </div>
//                               ))
//                             )}
//                           </div>
//                         </Disclosure.Panel>
//                       </>
//                     )}
//                   </Disclosure>

//                   {idx < filters.length - 1 && (
//                     <hr className="my-4 border-gray-300" />
//                   )}
//                 </div>
//               ))}

//               {/* Divider between filters and singleFilter */}
//               <hr className="my-6 border-gray-300" />

//               {singleFilter.map((section, idx) => (
//                 <div key={section.id} className="mb-6">
//                   <Disclosure className="border-b border-gray-200 pb-6">
//                     {({ open }) => (
//                       <>
//                         <h3 className="-my-3 flow-root">
//                           <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                             <span className="font-medium text-gray-900">{section.name}</span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                               ) : (
//                                 <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </span>
//                           </Disclosure.Button>
//                         </h3>
//                         <Disclosure.Panel className="pt-4">
//                           <FormControl>
//                             <RadioGroup
//                               aria-labelledby="demo-radio-buttons-group-label"
//                               name="radio-buttons-group"
//                               defaultValue=""
//                             >
//                               {section.options.map((option, optionIdx) => (
//                                 <FormControlLabel
//                                   key={optionIdx}
//                                   value={option.value}
//                                   control={<Radio />}
//                                   label={option.label}
//                                   onChange={(e) => handleRadioFilterChange(e, section.id)}
//                                 />
//                               ))}
//                             </RadioGroup>
//                           </FormControl>
//                         </Disclosure.Panel>
//                       </>
//                     )}
//                   </Disclosure>

//                   {idx < singleFilter.length - 1 && (
//                     <hr className="my-4 border-gray-300" />
//                   )}
//                 </div>
//               ))}
//             </form>
//           </aside>


//           {/* Product grid */}
//           <div className="lg:col-span-4">
//             <div className="flex flex-wrap gap-5 justify-center">
//               {customersProduct?.content?.length > 0 ? (
//                 customersProduct.content.map((item, idx) => (
//                   <div key={item._id || idx} className="w-[22%] min-w-[250px]">
//                     <ProductCard product={item} />
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center w-full py-10 text-gray-500 text-xl">
//                   No Products Found.
//                 </div>
//               )}
//             </div>
//             {/* Pagination */}
//             {customersProduct?.totalPages > 1 && (
//               <div className="flex justify-center mt-10">
//                 <Pagination
//                   count={customersProduct.totalPages}
//                   color="primary"
//                   page={pageNumber}
//                   onChange={handlePaginationChange}
//                 />
//               </div>
//             )}
//           </div>
//         </section>

//         <BackdropComponent open={loading} />
//       </main>

//       <style>{`
//         .filters-sidebar {
//           max-height: calc(100vh - 120px);
//           overflow-y: auto;
//           padding-right: 1rem;
//         }
//         .filters-sidebar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .filters-sidebar::-webkit-scrollbar-thumb {
//           background-color: rgba(0,0,0,0.2);
//           border-radius: 3px;
//         }
//       `}</style>
//     </div>
//   );
// }


import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { filters, singleFilter, sortOptions } from "./FilterData";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../../Redux/Customers/Product/Action";
import BackdropComponent from "../../BackDrop/Backdrop";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  // current query values
  const colorValue = searchParams.get("color") || "";
  const sizeValue = searchParams.get("size") || "";
  const price = searchParams.get("price") || "";
  const discount = searchParams.get("disccout") || "";
  const sortValue = searchParams.get("sort") || "";
  const pageNumber = Number(searchParams.get("page")) || 1;
  const stock = searchParams.get("stock") || "";

  const customersProduct = useSelector((store) => store.customersProduct.products) || {
    content: [],
    totalPages: 1,
  };
  const loading = useSelector((store) => store.customersProduct.loading);

  // Build fetch/filter data for API query
  useEffect(() => {
    const [minPrice, maxPrice] = price
      ? price.split("-").map(Number)
      : [0, 100000];
    const data = {
      category: param.lavelThree,
      colors: colorValue ? colorValue.split(",") : [],
      sizes: sizeValue ? sizeValue.split(",") : [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber,
      pageSize: 50,
      stock,
    };
    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorValue,
    sizeValue,
    price,
    discount,
    sortValue,
    stock,
    pageNumber,
    dispatch,
  ]);

  // Filter checkbox handler
  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.get(sectionId)?.split(",") || [];

    if (filterValues.includes(value)) {
      filterValues = filterValues.filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      } else {
        searchParams.set(sectionId, filterValues.join(","));
      }
    } else {
      filterValues.push(value);
      searchParams.set(sectionId, filterValues.join(","));
    }

    searchParams.delete("page");
    navigate({ search: `?${searchParams.toString()}` });
  };

  // Filter radio handler
  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    if (e.target.value === searchParams.get(sectionId)) {
      // allow uncheck
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, e.target.value);
    }
    searchParams.delete("page");
    navigate({ search: `?${searchParams.toString()}` });
  };

  // Sort handler
  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    searchParams.delete("page");
    navigate({ search: `?${searchParams.toString()}` });
  };

  // Pagination handler
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  // Reset all filters
  const resetFilters = () => {
    navigate({ search: "" });
  };

  // helpers for UI checked state
  const getSelectedValues = (id) =>
    (new URLSearchParams(location.search).get(id) || "").split(",").filter(Boolean);

  const isChecked = (id, value) => getSelectedValues(id).includes(value);

  return (
    <div className="bg-white -z-20">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Reset filters button mobile */}
                <div className="px-5 mt-4">
                  <button
                    onClick={resetFilters}
                    className="py-2 px-4 font-semibold rounded w-full"
                    style={{ backgroundColor: "rgb(85, 31, 61)", color: "white" }}
                  >
                    Reset Filters
                  </button>
                </div>

                <form className="p-5">
                  {filters.map((section, idx) => (
                    <div key={section.id} className="mb-6">
                      <Disclosure className="border-b border-gray-200 pb-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-4">
                              <div className="space-y-4">
                                {section.id === "color" ? (
                                  <Autocomplete
                                    options={section.options}
                                    value={
                                      section.options.find(
                                        (opt) => opt.value === colorValue
                                      ) || null
                                    }
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => {
                                      if (newValue) {
                                        handleFilter(newValue.value, section.id);
                                      } else {
                                        handleFilter(colorValue, section.id); // clear
                                      }
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={`Search ${section.name}`}
                                        variant="outlined"
                                        size="small"
                                      />
                                    )}
                                  />
                                ) : (
                                  section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        value={option.value}
                                        type="checkbox"
                                        checked={isChecked(section.id, option.value)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() => handleFilter(option.value, section.id)}
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))}

                  {/* Divider between filters and singleFilter */}
                  <hr className="my-6 border-gray-300" />

                  {singleFilter.map((section, idx) => (
                    <div key={section.id} className="mb-6">
                      <Disclosure className="border-b border-gray-200 pb-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-4">
                              <FormControl>
                                <RadioGroup
                                  name={section.id}
                                  value={searchParams.get(section.id) || ""}
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <FormControlLabel
                                      key={optionIdx}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                      onChange={(e) => handleRadioFilterChange(e, section.id)}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto px-4 lg:px-14">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          {customersProduct?.content && customersProduct.content.length > 0 && (
            <h1 className="heading_text_category">
              {console.log(customersProduct, "customerProduct")}
              {/* {customersProduct.content[0].title.toLowerCase()} */}
              {customersProduct.content[0]?.category?.name?.toUpperCase()}
            </h1>
          )}
          <div className="flex items-center pt-9 sm:pt-0">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <p
                            onClick={() => handleSortChange(option.query)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm cursor-pointer"
                            )}
                          >
                            {option.name}
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section
          aria-labelledby="products-heading"
          className="pb-24 pt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5"
        >
          {/* Left filter sidebar */}
          <aside className="hidden lg:block lg:col-span-1 border rounded-md p-5 filters-sidebar">
            <button
              onClick={resetFilters}
              className="py-2 px-4 font-semibold rounded mb-4 w-full"
              style={{ backgroundColor: "rgb(85, 31, 61)", color: "white" }}
            >
              Reset Filters
            </button>

            <form>
              {filters.map((section, idx) => (
                <div key={section.id} className="mb-6"> {/* gap between filters */}
                  <Disclosure className="border-b border-gray-200 pb-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-4">
                          <div className="space-y-4">
                            {section.id === "color" ? (
                              <Autocomplete
                                options={section.options}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => {
                                  if (newValue) handleFilter(newValue.value, section.id);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label={`Search ${section.name}`}
                                    variant="outlined"
                                    size="small"
                                  />
                                )}
                              />
                            ) : (
                              section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() => handleFilter(option.value, section.id)}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))
                            )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {idx < filters.length - 1 && (
                    <hr className="my-4 border-gray-300" />
                  )}
                </div>
              ))}

              {/* Divider between filters and singleFilter */}
              <hr className="my-6 border-gray-300" />

              {singleFilter.map((section, idx) => (
                <div key={section.id} className="mb-6">
                  <Disclosure className="border-b border-gray-200 pb-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-4">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              defaultValue=""
                            >
                              {section.options.map((option, optionIdx) => (
                                <FormControlLabel
                                  key={optionIdx}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                  onChange={(e) => handleRadioFilterChange(e, section.id)}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {idx < singleFilter.length - 1 && (
                    <hr className="my-4 border-gray-300" />
                  )}
                </div>
              ))}
            </form>
          </aside>


          {/* Product grid */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap gap-5 justify-center">
              {customersProduct?.content?.length > 0 ? (
                customersProduct.content.map((item, idx) => (
                  <div key={item._id || idx} className="w-[22%] min-w-[250px]">
                    <ProductCard product={item} />
                  </div>
                ))
              ) : (
                <div className="text-center w-full py-10 text-gray-500 text-xl">
                  No Products Found.
                </div>
              )}
            </div>
            {/* Pagination */}
            {customersProduct?.totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  count={customersProduct.totalPages}
                  color="primary"
                  page={pageNumber}
                  onChange={handlePaginationChange}
                />
              </div>
            )}
          </div>
        </section>

        <BackdropComponent open={loading} />
      </main>

      <style>{`
        .filters-sidebar {
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding-right: 1rem;
        }
        .filters-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .filters-sidebar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
