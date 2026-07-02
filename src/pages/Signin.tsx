import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import { localUser } from "../utils/Dotenv";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
const {email}=useParams();
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();
  const [form, setForm] = useState({
    email: email,
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

      console.log(form);
      let {data,error}:{data:any,error:any}=await supabase.from("users").select("*")
                          .eq('email', form.email) // Filters where the email column matches
                           // Optional: Returns a single object instead of an array of objects
  console.log(data)//->array-->empty
  if(data?.length==0){
    toast.error("You have not created an account please create an account first")
  }
  else if(error){
    console.log(error)
    toast.error("signin failed")
  }
  else{
    if(data[0].email){
if(data[0].password==form.password){
  toast.success("Login Successful");
        
        // Navigate Here
        localStorage.setItem(localUser,data[0]?.email)
        navigate("/");
      }
      else{
        toast.warn("Invalid credentials")
      }

    }
  }
  console.log(error)//->null-->null


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

                login to your account and start your
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

                

                <p className="mt-2 text-gray-500">

                  Start learning today.

                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

              
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
                    ? "logging..."
                    : "Sign In"}

                  {!loading && (
                    <ArrowRight size={18} />
                  )}

                </motion.button>

              </form>

              <p className="mt-8 text-center text-gray-500">

                Don't  have an account?

                <Link to={"/signup"} className="ml-2 cursor-pointer font-semibold text-[#7F22FE]">

                  Sign Up

                </Link>

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}