import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../Auth/AuthModal";
import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import logo from "./HeaderImg/logo.png";
import NavigationSearchDropdown from "./NavigationSearchDropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [guestCartCount, setGuestCartCount] = useState(0);
  console.log(jwt, "jwt");
  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    dispatch(logout());
  };
  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    } else {
      // For guest users, read localStorage guest cart count
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      // Sum total quantity for cart badge count
      const totalQty = guestCart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
      setGuestCartCount(totalQty);
    }
  }, [jwt, auth.jwt, location, dispatch]);
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlistItems.length);
  }, [jwt, auth.jwt, location]);
  useEffect(() => {
    const handleGuestCartUpdated = (e) => {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const totalQty = guestCart.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
      setGuestCartCount(totalQty);
    };
    window.addEventListener("guestCartUpdated", handleGuestCartUpdated);
    return () => {
      window.removeEventListener("guestCartUpdated", handleGuestCartUpdated);
    };
  }, []);
  useEffect(() => {
    const handleWishlistUpdate = (e) => {
      setWishlistCount(e.detail);
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (auth.user) handleClose();
    if (
      auth.user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [auth.user]);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Women",
      subItems: [
        { name: "Saree", path: "/all-products_page" },
        { name: "Gopi Dress", path: "/women/gopi_dress/gopi" },
        { name: "Kurtis", path: "/women/kurti/kurtis" },
        { name: "Blouse", path: "/women/blousess/blous_e" },
        { name: "Jackets", path: "/women/jacket/jackets" },
        { name: "D'Coat", path: "/women/dcoat/dcoats" },
        { name: "Co ord", path: "/wOmen/co_ord/co_ords" },
      ],
    },
    {
      name: "Men",
      subItems: [
        { name: "Kurta", path: "/men/men_kurte/kurta" },
        // { name: "Shirts", path: "/men/men_shirt/shirt" },
        { name: "Shirts", path: "/Coming-soon" },
      ],
    },
    {
      name: "Accessories",
      path: "/all-jewellery",
      subItems: [
        { name: "Bracelet", path: "/women/jewellery/bracelet" },
        { name: "Kada", path: "/women/jewellery/kada" },
        { name: "Rings", path: "/women/jewellery/ring" },
        { name: "Earrings", path: "/women/jewellery/earring" },
        { name: "Heavy Set", path: "/women/jewellery/necklace" },
        { name: "Pendant Set", path: "/women/jewellery/pendant" },
        { name: "Chain", path: "/women/jewellery/chain" },
      ],
    },
    { name: "All Product", path: "/all-product-section" },
    { name: "FAQ", path: "/TermsConditions" },
  ];

  return (
    <>
      <div className="bg-white">
        {/* Mobile sidebar */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileMenuOpen}
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
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5 justify-between items-center">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      <img src={logo} className="h-10 w-auto" alt="logo" />
                    </Link>
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Mobile Search - show ONLY on mobile in sidebar */}
                  <div className="px-4 py-3 block lg:hidden">
                    <NavigationSearchDropdown />
                  </div>

                  {/* Mobile Nav */}
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6 text-sm">
                    {navItems.map((item) => (
                      <div key={item.name} className="space-y-1">
                        {item.subItems ? (
                          <>
                            <span className="block font-bold text-gray-900">
                              {item.name}
                            </span>
                            <div className="ml-4 space-y-1">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block text-gray-700 hover:text-purple-600"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block font-medium text-gray-900 hover:text-purple-600"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Header */}
        <header
          className={classNames(
            "fixed top-0 left-0 right-0 z-50 transition-transform duration-500 bg-white shadow-sm",
            showHeader ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Left Section → Mobile Menu + Logo */}
              <div className="flex items-center space-x-3">
                {/* Mobile Menu Button Only shows on small screens */}
                <button
                  type="button"
                  className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Logo */}
                <Link to="/" className="flex items-center">
                  <img
                    src={logo}
                    alt="Shop Logo"
                    className="w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-auto"
                  />
                </Link>
              </div>

              {/* Center Section → Nav Items (Desktop Only) */}
              <nav className="hidden lg:flex lg:space-x-8 categories-nav text-sm md:text-base">
                {navItems.map((item) => {
                  const isActive =
                    (location.pathname.startsWith(item.path) &&
                      item.path !== "/") ||
                    (location.pathname === "/" && item.path === "/");

                  return (
                    <div key={item.name} className="relative group">
                      {" "}
                      {/* add 'group' here */}
                      {item.subItems ? (
                        <>
                          {/* Parent NavItem - use cursor-pointer and group-hover logic */}
                          <span
                            className={classNames(
                              "px-3 py-2 font-medium cursor-pointer",
                              isActive
                                ? "border-b-2"
                                : "text-gray-700 hover:text-gray-900"
                            )}
                            style={{
                              color: isActive ? "rgb(85, 31, 61)" : undefined,
                              borderColor: isActive
                                ? "rgb(85, 31, 61)"
                                : undefined,
                            }}
                          >
                            {item.name}
                          </span>

                          {/* Dropdown - visible on group-hover (hover parent div or dropdown itself) */}
                          <div
                            className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transform -translate-y-2 group-hover:translate-y-0
          transition-all duration-200 z-50"
                            style={{ zIndex: 1200 }}
                          >
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={classNames(
                            "px-3 py-2 font-medium",
                            isActive
                              ? "border-b-2"
                              : "text-gray-700 hover:text-gray-900"
                          )}
                          style={{
                            color: isActive ? "rgb(85, 31, 61)" : undefined,
                            borderColor: isActive
                              ? "rgb(85, 31, 61)"
                              : undefined,
                          }}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Right Section → Desktop Search + Icons */}
              <div className="flex items-center space-x-4">
                {/* Desktop Search - show ONLY on screens 790px and above */}
                <div className="hidden min-[790px]:block">
                  <NavigationSearchDropdown />
                </div>

                {/* User / Login */}
                {auth.user ? (
                  <>
                    <button onClick={handleUserClick}>
                      <User strokeWidth={1.5} />
                    </button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                    >
                      <Link to="/account/order">
                        <MenuItem>My Orders</MenuItem>
                      </Link>
                      <Link to="/user-profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          setOpenLogoutDialog(true);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <button
                    onClick={handleOpen}
                    className="bg-[#551F3D] text-white px-4 py-2 rounded-md hover:bg-[#6f2c50] transition-colors duration-300"
                  >
                    Login
                  </button>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => navigate("/wish-item")}
                  className="relative"
                >
                  <Heart strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button onClick={() => navigate("/cart")} className="relative">
                  <ShoppingBag strokeWidth={1.5} />
                  {(jwt ? cart.cart?.totalItem > 0 : guestCartCount > 0) && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {jwt ? cart.cart.totalItem : guestCartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Auth Modal */}
        <AuthModal handleClose={handleClose} open={openAuthModal} />

        {/* Logout Confirm Dialog */}
        <MuiDialog
          open={openLogoutDialog}
          onClose={handleLogoutCancel}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} color="error" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </MuiDialog>
      </div>

      <style>{`
        header {
          will-change: transform;
        }
        @media (max-width: 789px) {
          /* Hide desktop search on phone */
          .desktop-search {
            display: none;
          }
        }
        @media (min-width: 790px) {
          /* Hide mobile search inside sidebar on desktop and up */
          .mobile-search {
            display: none;
          }
          .categories-nav {
            display: flex !important;
          }
        }
        @media (max-width: 790px) {
          .categories-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
