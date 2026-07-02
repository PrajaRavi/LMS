import React, { useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  playlist: string;
  course: string;
  duration: string;
  views: number;
  uploadedAt: string;
}

const dummyVideos: Video[] = [
  {
    id: 1,
    title: "What is MERN Stack?",
    thumbnail:
      "https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=abc1",
    playlist: "Introduction",
    course: "MERN Stack Development",
    duration: "08:45",
    views: 1200,
    uploadedAt: "2024-05-25",
  },
  {
    id: 2,
    title: "Why MERN Stack?",
    thumbnail:
      "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=abc2",
    playlist: "Introduction",
    course: "MERN Stack Development",
    duration: "06:21",
    views: 980,
    uploadedAt: "2024-05-25",
  },
  {
    id: 3,
    title: "React Components",
    thumbnail:
      "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=abc3",
    playlist: "React Basics",
    course: "MERN Stack Development",
    duration: "12:45",
    views: 1100,
    uploadedAt: "2024-05-26",
  },
  {
    id: 4,
    title: "JSX Explained",
    thumbnail:
      "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=abc4",
    playlist: "React Basics",
    course: "MERN Stack Development",
    duration: "10:15",
    views: 900,
    uploadedAt: "2024-05-26",
  },
  {
    id: 5,
    title: "Props in React",
    thumbnail:
      "https://i.ytimg.com/vi/PHaECbrKgs0/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=abc5",
    playlist: "React Basics",
    course: "MERN Stack Development",
    duration: "07:30",
    views: 780,
    uploadedAt: "2024-05-27",
  },
];
export default function VideosModule() {
  const [videos, setVideos] =
    useState(dummyVideos);

  const [search, setSearch] =
    useState("");

  const [courseFilter, setCourseFilter] =
    useState("all");

  const [playlistFilter, setPlaylistFilter] =
    useState("all");

  const [page, setPage] = useState(1);

  const [deleteVideo, setDeleteVideo] =
    useState<Video | null>(null);

  const PAGE_SIZE = 5;

  const courses = useMemo(
    () =>
      Array.from(
        new Set(videos.map((v) => v.course))
      ),
    [videos]
  );

  const playlists = useMemo(() => {
    if (courseFilter === "all") {
      return Array.from(
        new Set(
          videos.map((v) => v.playlist)
        )
      );
    }

    return Array.from(
      new Set(
        videos
          .filter(
            (v) =>
              v.course === courseFilter
          )
          .map((v) => v.playlist)
      )
    );
  }, [videos, courseFilter]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const searchMatch =
        video.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        video.course
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        video.playlist
          .toLowerCase()
          .includes(search.toLowerCase());

      const courseMatch =
        courseFilter === "all"
          ? true
          : video.course === courseFilter;

      const playlistMatch =
        playlistFilter === "all"
          ? true
          : video.playlist ===
            playlistFilter;

      return (
        searchMatch &&
        courseMatch &&
        playlistMatch
      );
    });
  }, [
    videos,
    search,
    courseFilter,
    playlistFilter,
  ]);

  const totalPages = Math.ceil(
    filteredVideos.length / PAGE_SIZE
  );

  const paginatedVideos =
    filteredVideos.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  const handleDelete = () => {
    if (!deleteVideo) return;

    setVideos((prev) =>
      prev.filter(
        (v) => v.id !== deleteVideo.id
      )
    );

    setDeleteVideo(null);
  };

  return (
    <div className="h-screen w-full border-red-700 overflow-y-scroll bg-[#F8F8FC] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-violet-700">
              Videos
            </h1>

            <p className="text-gray-500">
              Manage all your course videos
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-700">
            <Plus size={18} />
            Add Video
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <select
            className="rounded-xl border bg-white px-4 py-3"
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              All Courses
            </option>

            {courses.map((course) => (
              <option
                key={course}
                value={course}
              >
                {course}
              </option>
            ))}
          </select>

          {/* <select
            className="rounded-xl border bg-white px-4 py-3"
            value={playlistFilter}
            onChange={(e) =>
              setPlaylistFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              All Playlists
            </option>

            {playlists.map(
              (playlist) => (
                <option
                  key={playlist}
                  value={playlist}
                >
                  {playlist}
                </option>
              )
            )}
          </select> */}

          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              placeholder="Search videos..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-xl border bg-white py-3 pl-11 pr-4"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-left">
                    Video
                  </th>
                  {/* <th>Playlist</th> */}
                  <th>Course</th>
                  {/* <th>Duration</th> */}
                  {/* <th>Views</th> */}
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {paginatedVideos.map(
                    (video) => (
                      <motion.tr
                        key={video.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        className="border-b hover:bg-violet-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                video.thumbnail
                              }
                              className="h-14 w-24 rounded-lg object-cover"
                            />

                            <div>
                              <h4 className="font-medium">
                                {
                                  video.title
                                }
                              </h4>

                              <a
                                href={
                                  video.url
                                }
                                className="text-xs text-blue-500"
                              >
                                {
                                  video.url
                                }
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* <td>
                          {
                            video.playlist
                          }
                        </td> */}

                        <td>
                          {
                            video.course
                          }
                        </td>

                        {/* <td>
                          {
                            video.duration
                          }
                        </td> */}

                        {/* <td>
                          {video.views >=
                          1000
                            ? `${(
                                video.views /
                                1000
                              ).toFixed(
                                1
                              )}K`
                            : video.views}
                        </td> */}

                        <td>
                          {
                            video.uploadedAt
                          }
                        </td>

                        <td>
                          <div className="flex gap-3">
                            <button>
                              <Pencil
                                size={
                                  18
                                }
                                className="text-violet-600"
                              />
                            </button>

                            <button
                              onClick={() =>
                                setDeleteVideo(
                                  video
                                )
                              }
                            >
                              <Trash2
                                size={
                                  18
                                }
                                className="text-red-500"
                              />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-5">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {paginatedVideos.length} of{" "}
              {
                filteredVideos.length
              }{" "}
              videos
            </p>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
                className="rounded-lg border p-2"
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              {Array.from({
                length:
                  totalPages,
              }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setPage(
                        index +
                          1
                      )
                    }
                    className={`h-10 w-10 rounded-lg ${
                      page ===
                      index + 1
                        ? "bg-violet-600 text-white"
                        : "border"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
                className="rounded-lg border p-2"
              >
                <ChevronRight
                  size={18}
                />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {deleteVideo && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              />

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-red-100 p-4">
                    <AlertTriangle className="text-red-500" />
                  </div>
                </div>

                <h2 className="text-center text-2xl font-bold">
                  Delete Video
                </h2>

                <p className="mt-3 text-center text-gray-500">
                  Are you sure you want
                  to delete
                </p>

                <p className="mt-2 text-center font-semibold text-red-500">
                  {
                    deleteVideo.title
                  }
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() =>
                      setDeleteVideo(
                        null
                      )
                    }
                    className="flex-1 rounded-xl border py-3"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleDelete
                    }
                    className="flex-1 rounded-xl bg-red-500 py-3 text-white"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}