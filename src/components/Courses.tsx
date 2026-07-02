import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  playlists: number;
  videos: number;
  students: number;
  progress: number;
}
// data/courses.ts


 const Intialcourses: Course[] = [
  {
    id: "1",
    title: "MERN Stack Development",
    description:
      "Full MERN stack course from basic to advanced",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    playlists: 24,
    videos: 120,
    students: 230,
    progress: 75,
  },
  {
    id: "2",
    title: "React for Beginners",
    description: "Learn React.js from scratch",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    playlists: 18,
    videos: 85,
    students: 150,
    progress: 60,
  },
  {
    id: "3",
    title: "JavaScript Fundamentals",
    description: "JavaScript basics to advanced",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    playlists: 15,
    videos: 60,
    students: 120,
    progress: 45,
  },
];
// components/DeleteCourseModal.tsx


interface Props {
  open: boolean;
  courseName: string;
  onClose: () => void;
  onConfirm: () => void;
}

 function DeleteCourseModal({
  open,
  courseName,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle
                  className="text-red-500"
                  size={32}
                />
              </div>
            </div>

            <h2 className="mt-4 text-center text-2xl font-bold">
              Delete Course
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Are you sure you want to delete
            </p>

            <p className="mt-2 text-center font-semibold text-red-500">
              {courseName}
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border py-3"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-red-500 py-3 text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// courserow.tsx
// components/CourseRow.tsx

import {
  Pencil,
  Trash2,
} from "lucide-react";

 function CourseRow({
  course,
  onDelete,
}: any) {
  return (
    <motion.tr
      layout
      whileHover={{
        backgroundColor: "#faf7ff",
      }}
      className="border-b"
    >
      <td className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={course.image}
            alt=""
            className="h-14 w-20 rounded-lg object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {course.title}
            </h3>

            <p className="text-sm text-gray-500">
              {course.description}
            </p>
          </div>
        </div>
      </td>

      {/* <td>{course.playlists}</td> */}
      <td>{course.videos}</td>
      <td>{course.students}</td>

      <td>
        {/* <div>
          <p className="mb-1">
            {course.progress}%
          </p>

          <div className="h-2 w-28 rounded-full bg-gray-200">
            <div
              style={{
                width: `${course.progress}%`,
              }}
              className="h-2 rounded-full bg-violet-600"
            />
          </div>
        </div> */}
      </td>

      <td>
        <div className="flex gap-4">
          <button>
            <Pencil
              size={18}
              className="text-violet-600"
            />
          </button>

          <button
            onClick={() => onDelete(course)}
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

// pages/CoursesPage.tsx

import { useState } from "react";
import {
  Search,
  Plus,
  PlaySquare,
  BookOpen,
  Users,
  
} from "lucide-react";





export default function CoursesPage() {
  const [courses, setCourses] =
    useState(Intialcourses);

  const [search, setSearch] =
    useState("");
    

  const [selectedCourse, setSelectedCourse] =
    useState<any>(null);

  const filtered = courses.filter(
    (course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const deleteCourse = () => {
    setCourses((prev) =>
      prev.filter(
        (course) =>
          course.id !== selectedCourse.id
      )
    );

    setSelectedCourse(null);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#F8F8FC] p-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-violet-700">
                Courses
              </h1>

              <p className="text-gray-500">
                Manage all your courses
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white">
              <Plus size={18} />
              Add Course
            </button>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-4">
            {[
              {
                icon: BookOpen,
                label: "Courses",
                value: 6,
              },
              // {
              //   icon: ListVideo,
              //   label: "Playlists",
              //   value: 24,
              // },
              {
                icon: PlaySquare,
                label: "Videos",
                value: 120,
              },
              {
                icon: Users,
                label: "Students",
                value: 230,
              },
            ].map((item) => (
              <motion.div
                whileHover={{
                  y: -4,
                }}
                key={item.label}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <item.icon
                  className="mb-3 text-violet-600"
                  size={26}
                />

                <p className="text-gray-500">
                  Total {item.label}
                </p>

                <h3 className="text-3xl font-bold">
                  {item.value}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="mb-6 rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-3">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search courses..."
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-22">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-4 text-left">
                      Course
                    </th>
                    {/* <th>Playlists</th> */}
                    <th>Videos</th>
                    <th>Students</th>
                    {/* <th>Progress</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((course) => (
                    <CourseRow
                      key={course.id}
                      course={course}
                      onDelete={
                        setSelectedCourse
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <DeleteCourseModal
        open={!!selectedCourse}
        courseName={
          selectedCourse?.title || ""
        }
        onClose={() =>
          setSelectedCourse(null)
        }
        onConfirm={deleteCourse}
      />
    </>
  );
}