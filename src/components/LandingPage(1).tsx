
import studentIcon from "../assets/student.png"
import { Link } from "react-router";
import { localUser } from "../utils/Dotenv";

export default function LandingPage() {
  return (
    <div className="min-h-screen  bg-white text-slate-900">
     
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-50 via-white to-violet-100"/>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 items-center">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">LEARN. TEACH. GROW.</p>
            <h1 className="text-5xl font-extrabold leading-tight">
              A Better Way to <span className="text-violet-600">Learn Online</span>
            </h1>
            <p className="mt-6 text-slate-600">
              ClassLMS is the all-in-one platform for educators and students.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to={!localStorage.getItem(localUser)?"/signup":"/course"} className="rounded-xl bg-violet-600 px-6 py-3 text-white">Get Started Free</Link>
              <Link to={!localStorage.getItem(localUser)?"/signup":"/course"} className="rounded-xl border border-violet-600 px-6 py-3 text-violet-600">Explore Courses</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                ["500+","Courses"],
                ["10K+","Students"],
                ["50+","Instructors"],
              ].map(([v,l])=>(
                <div key={l} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="text-2xl font-bold text-violet-600">{v}</div>
                  <div className="text-sm text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-violet-600/20 blur-2xl animate-pulse"/>
            <img
              src={studentIcon}
              className="relative z-10 w-full max-w-md rounded-3xl object-cover  transition duration-500 hover:-translate-y-2"
              alt="Student"
            />
            {/* <div className="absolute right-0 top-10 rounded-2xl bg-white p-4 shadow-xl">
              <div className="text-xs text-slate-500">Progress</div>
              <div className="text-2xl font-bold">75%</div>
              <div className="mt-2 h-2 w-32 rounded-full bg-slate-200">
                <div className="h-2 w-3/4 rounded-full bg-violet-600"/>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-semibold text-violet-600">WHY CHOOSE US</p>
          <h2 className="mt-2 text-4xl font-bold">Everything You Need to Succeed in <span className="text-violet-600">One Place</span></h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {[
            "Easy Course Creation",
            "Student Management",
            "Engaging Content",
            "Progress Tracking",
            "Secure & Reliable",
            "Learn Anywhere",
          ].map((t)=>(
            <div key={t} className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600">★</div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-slate-500">Modern tools for educators and students.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-linear-to-r from-violet-700 to-violet-500 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold">ClassLMS</h3>
            <p className="mt-4 text-sm text-violet-100">Empowering educators and learners worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Home</li><li>Courses</li><li>Pricing</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Features</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Course Creation</li><li>Analytics</li><li>Assignments</li>
            </ul>
          </div>
          {/* <div>
            <h4 className="font-semibold">Newsletter</h4>
            <div className="mt-3 flex">
              <input className="w-full rounded-l-xl px-4 py-3 text-black" placeholder="Email"/>
              <button className="rounded-r-xl bg-white px-5 text-violet-600">→</button>
            </div>
          </div> */}
        </div>
        <div className="border-t border-violet-400 py-4 text-center text-sm">© 2026 ClassLMS. All rights reserved.</div>
      </footer>
    </div>
  );
}
