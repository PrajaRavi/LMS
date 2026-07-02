// pages/AdminDashboard.tsx

import { useContext, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "./AdminSidebar";
import PlaylistPanel from "./PlaylistPanal";
import VideoTable from "./VideoTable";
import DeleteModal from "./DeleteConfirmModal";
import CoursesPage from "./Courses";
import VideosModule from "./Videos";
import StudentsModule from "./Students";
import { CounterContext } from "../context/counterContext";

const initialVideos = [
  {
    id: "1",
    title: "What is MERN Stack?",
    thumbnail:
      "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    url: "https://youtube.com",
    duration: "08:45",
  },
  {
    id: "2",
    title: "Why MERN Stack?",
    thumbnail:
      "https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
    url: "https://youtube.com",
    duration: "06:21",
  },
];

export default function AdminDashboard() {
  const [videos, setVideos] =
    useState(initialVideos);
  const {sidebartext}=useContext(CounterContext)
  const [selected, setSelected] =
    useState<any>(null);

  const playlists = [
    {
      id: "1",
      title: "Introduction",
      videoCount: 3,
    },
    {
      id: "2",
      title: "React Basics",
      videoCount: 5,
    },
    {
      id: "3",
      title: "React Hooks",
      videoCount: 6,
    },
    {
      id: "4",
      title: "Node.js",
      videoCount: 4,
    },
  ];

  const removeVideo = () => {
    setVideos((prev) =>
      prev.filter(
        (item) => item.id !== selected.id
      )
    );

    setSelected(null);
  };

  const MainDiv=()=>{
    if(sidebartext=="Dashboard"){
      return (
        <main className="flex-1 p-6  h-screen overflow-y-scroll border-red-700">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div className="mb-6 flex   justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    MERN Stack Development
                  </h1>

                  <p className="text-gray-500">
                    Teacher Dashboard
                  </p>
                </div>

                <button className="rounded-lg bg-violet-600 px-5 py-3 text-white">
                  + Add Playlist
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <PlaylistPanel
                  playlists={playlists}
                />

                <VideoTable
                  videos={videos}
                  onDelete={(video) =>
                    setSelected(video)
                  }
                />
              </div>
            </motion.div>
          </main>
      )
    }
    else if(sidebartext=="Courses"){
      return(<CoursesPage/>)
    }
    else if(sidebartext=="Students"){
      return(<StudentsModule/>)
    }
    else if(sidebartext=="Videos"){
      return(<VideosModule/>)
    }
    else{

      return (
        <h1>helllo this is ravi</h1>
      )
    }
  }

  return (
    <>
      <div className="h-screen  bg-[#F8F8FC]">
        <div className="flex">
          <Sidebar />

          <MainDiv/>
        </div>
      </div>

      <DeleteModal
        open={!!selected}
        title={selected?.title || ""}
        onClose={() => setSelected(null)}
        onConfirm={removeVideo}
      />
    </>
  );
}