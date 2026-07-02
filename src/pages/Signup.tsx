import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import {supabase} from "../utils/supabase"
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
const navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // ============================
      // API CALL HERE
      // ============================

      /*
      await axios.post("/api/auth/signup", form)

      */

      let {data,error}=await supabase.from("users").insert({name:form.name,email:form.email,password:form.password,phone:form.phoneNumber})
      // let {data}=await axios.post(`http://localhost:4500/user/signup`,form)
      console.log(data)
      if(error){
        if(error.code=="23505"){
          toast.error("This user already exist in database please login ")
        }
        else{
          
          toast.error(error?.message)
        }
  
      }
      else{

        toast.success("signup successfullly!!!")
        setForm({
        name: "",
        email: "",
        phoneNumber: "",
        password:"",
        
      });
        
      setTimeout(() => {
        navigate(`/signin/${form.email}`)
      }, 1000);

    }
      console.log(form);

      // success toast

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-violet-100">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .7 }}
            className="relative hidden overflow-hidden bg-[#7F22FE] lg:flex"
          >

            <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative flex w-full flex-col items-center justify-center p-12">

              <img
                src="/student.png"
                alt=""
                className="w-107.5 drop-shadow-2xl"
              />

              <h2 className="mt-8 text-center text-4xl font-bold text-white">

                Welcome to ClassLMS

              </h2>

              <p className="mt-4 max-w-md text-center text-violet-100">

                Create your account and start your
                learning journey with interactive
                courses and engaging content.

              </p>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .7 }}
            className="flex items-center justify-center p-8 md:p-14"
          >

            <div className="w-full max-w-md">

              <div className="mb-8">

                <h1 className="text-4xl font-bold">

                  Create Account

                </h1>

                <p className="mt-2 text-gray-500">

                  Start learning today.

                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Full Name

                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#7F22FE]"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Email

                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@gmail.com"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#7F22FE]"
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Phone Number

                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#7F22FE]"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Password

                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="********"
                      className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-12 outline-none transition focus:border-[#7F22FE]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-4 text-gray-500"
                    >

                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                </div>

                <motion.button
                  whileTap={{ scale: .95 }}
                  whileHover={{ scale: 1.02 }}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7F22FE] py-3 font-semibold text-white shadow-lg transition hover:bg-violet-700"
                >

                  {loading
                    ? "Creating..."
                    : "Create Account"}

                  {!loading && (
                    <ArrowRight size={18} />
                  )}

                </motion.button>

              </form>

              <p className="mt-8 text-center text-gray-500">

                Already have an account?

                <Link to={"/signin/abc@gmail.com"} className="ml-2 cursor-pointer font-semibold text-[#7F22FE]">

                  Sign In

                </Link>

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}