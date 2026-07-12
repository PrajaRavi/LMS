import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CounterContext } from "../context/counterContext";
import { localUser } from "../utils/Dotenv";
import {  LogOut, Pencil } from "lucide-react";
import student from "../assets/student.png"
import { useRef } from "react";
const links = [
  { title: "Home", path: "/" },
  { title: "Courses", path: "/course" },
  { title: "Contact", path: "/contact" },
  { title: "About", path: "/about" },
  // { title: "Signin", path: "/signin/abc@gmail.com" },
];

export default function Navbar() {
  const { pathname } = useLocation();
const {user,setuser}=useContext(CounterContext)
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate=useNavigate();

const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
  const handleClickOutside = (
    e: MouseEvent
  ) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(
        e.target as Node
      )
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);
  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b bg-white/90 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7F22FE] font-bold text-white shadow-lg"
            >
              C
            </motion.div>

            <span className="text-2xl font-bold text-gray-900">
              ClassLMS
            </span>
          </Link>

          {/* Desktop */}

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative font-medium text-gray-700 transition hover:text-[#7F22FE]"
              >
                {item.title}

                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-[#7F22FE] transition-all duration-300 ${
                    pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            {user?.isadmin&&<Link
                to={"/admin"}
                className="group relative font-medium text-gray-700 transition hover:text-[#7F22FE]"
              >
                {"Admin"}

              </Link>}
                
          </nav>

          {/* Desktop Buttons */}

          {/* <div className="hidden items-center gap-4 lg:flex">
            {!localStorage.getItem(localUser)&&<Link
              to="/signin/abc@gmail.com"
              className="font-medium text-gray-700 transition hover:text-[#7F22FE]"
            >
              Sign In
            </Link>}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                  to={!localStorage.getItem(localUser)?"/signup":"/course"}
                  className="block rounded-xl bg-[#7F22FE] py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>
            </motion.div>
          </div> */}
<div className=" items-center gap-4 flex">
  {/* Profile */}

  <div
    className="relative"
    ref={profileRef}
  >
    {localStorage.getItem(localUser)&&<button
      onClick={() =>
        setProfileOpen(!profileOpen)
      }
      className="relative w-11 h-11 ml-20 lg:ml-0"
    >
      <img
        src={student}
        alt=""
        className="h-11 w-11 rounded-full border-2 border-violet-500 md:object-cover"
      />

      {/* <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" /> */}
    </button>}

    <AnimatePresence>
      {profileOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
            scale: .95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: .95,
          }}
          transition={{
            duration: .25,
          }}
          className="absolute md:right-0 -right-5 mt-4 w-80 overflow-hidden rounded-3xl border bg-white shadow-2xl"
        >
          {/* Header */}

          <div className="relative bg-linear-to-r from-violet-600 to-purple-600 p-6">

            <button
              onClick={() =>
                setProfileOpen(false)
              }
              className="absolute right-4 top-4 text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center">

              <img
                src={student}
                className="h-24 w-24 rounded-full border-4 border-white object-cover"
              />

              <h2 className="mt-4 text-xl font-bold text-white">
                {user?.name}
              </h2>

            </div>

          </div>

          {/* Body */}

          <div className="space-y-4 p-6">

            <div className="rounded-xl bg-violet-50 p-3">

              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="font-medium">
                {user?.email}
              </p>

            </div>

            <div className="rounded-xl bg-violet-50 p-3">

              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="font-medium">
                {user?.phone}
              </p>

            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              <Pencil size={18} />

              Update Profile

            </button>

            <button
            data-testid="logoutBtn"
            onClick={()=>{
           localStorage.removeItem(localUser);
           setuser(undefined)
           setProfileOpen(false)
           navigate("/")

           
            }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />

              Logout

            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Get Started */}

  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: .95 }}
  >
    <Link
      to="/signup"
      className="rounded-xl lg:block hidden bg-[#7F22FE] px-6 py-3 font-medium text-white shadow-lg transition hover:bg-violet-700"
    >
      Get Started
    </Link>
  </motion.div>
</div>
          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 lg:hidden"
          >
            {open ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 h-[90vh]  z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 22,
              }}
              className="fixed right-0 top-0 z-50 flex h-[90vh] w-75 flex-col bg-white p-8 shadow-2xl"
            >
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Menu
                </h2>

                <button
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </div>

              <div className="space-y-6">
                {links.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`block rounded-xl px-4 py-3 text-lg font-medium transition ${
                        pathname === item.path
                          ? "bg-violet-100 text-[#7F22FE]"
                          : "hover:bg-violet-50"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                
                <Link
                  to={!localStorage.getItem(localUser)?"/signup":"/course"}
                  className="block rounded-xl bg-[#7F22FE] py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}

      <div className="h-20" />
    </>
  );
}