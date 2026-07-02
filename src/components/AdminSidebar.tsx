// components/Sidebar.tsx

import {
  LayoutDashboard,
  BookOpen,
  List,
  Video,
  Users,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SetSideBarText } from "../Redux/Slice/Auth.slice";

const items = [
  // { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Courses", active: true },
  // { icon: List, label: "Playlists" },
  { icon: Video, label: "Videos" },
  { icon: Users, label: "Students" },
  { icon: FileText, label: "Assignments" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const dispatch=useDispatch();
  const SideBarText=useSelector((state:any)=>state.Auth.SideBarText)
  return (
    <aside className="w-64 bg-[#111827] text-white h-screen">
      <div className="border-b border-white/10 p-5">
        <h2 className="font-bold">ClassLMS</h2>
      </div>

      <nav className="p-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
            onClick={()=>{
              dispatch(SetSideBarText(item.label))
            }}
              key={item.label}
              className={`mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition
              ${
                SideBarText==item.label
                  ? "bg-violet-600"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}