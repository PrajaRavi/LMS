import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  AlertTriangle,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: "Active" | "Inactive";
  joinedAt: string;
}

const studentsData: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    course: "MERN Stack Development",
    progress: 75,
    status: "Active",
    joinedAt: "May 25, 2024",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@gmail.com",
    course: "React for Beginners",
    progress: 60,
    status: "Active",
    joinedAt: "May 25, 2024",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@gmail.com",
    course: "JavaScript Fundamentals",
    progress: 45,
    status: "Active",
    joinedAt: "May 26, 2024",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@gmail.com",
    course: "Node.js Mastery",
    progress: 30,
    status: "Active",
    joinedAt: "May 26, 2024",
  },
  {
    id: 5,
    name: "Liam Williams",
    email: "liam@gmail.com",
    course: "MERN Stack Development",
    progress: 20,
    status: "Inactive",
    joinedAt: "May 27, 2024",
  },
  {
    id: 6,
    name: "Olivia Anderson",
    email: "olivia@gmail.com",
    course: "Advanced React Patterns",
    progress: 80,
    status: "Active",
    joinedAt: "May 27, 2024",
  },
  {
    id: 7,
    name: "Tom Smith",
    email: "tom@gmail.com",
    course: "Full Stack Projects",
    progress: 35,
    status: "Active",
    joinedAt: "May 28, 2024",
  },
];

export default function StudentsModule() {
  const [students, setStudents] =
    useState(studentsData);

  const [search, setSearch] =
    useState("");

  const [courseFilter, setCourseFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [page, setPage] = useState(1);

  const [deleteStudent, setDeleteStudent] =
    useState<Student | null>(null);

  const PAGE_SIZE = 5;

  const courses = useMemo(
    () =>
      Array.from(
        new Set(
          students.map((s) => s.course)
        )
      ),
    [students]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchMatch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.course
          .toLowerCase()
          .includes(search.toLowerCase());

      const courseMatch =
        courseFilter === "all"
          ? true
          : student.course === courseFilter;

      const statusMatch =
        statusFilter === "all"
          ? true
          : student.status === statusFilter;

      return (
        searchMatch &&
        courseMatch &&
        statusMatch
      );
    });
  }, [
    students,
    search,
    courseFilter,
    statusFilter,
  ]);

  const totalPages = Math.ceil(
    filteredStudents.length / PAGE_SIZE
  );

  const paginatedStudents =
    filteredStudents.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

  const handleDelete = () => {
    if (!deleteStudent) return;

    setStudents((prev) =>
      prev.filter(
        (s) => s.id !== deleteStudent.id
      )
    );

    setDeleteStudent(null);
  };

  const stats = [
    {
      label: "Total Students",
      value: students.length,
      icon: Users,
    },
    {
      label: "Active Students",
      value: students.filter(
        (s) => s.status === "Active"
      ).length,
      icon: GraduationCap,
    },
    // {
    //   label: "Completed Courses",
    //   value: 35,
    //   icon: BookOpen,
    // },
    // {
    //   label: "Avg. Progress",
    //   value: "62%",
    //   icon: TrendingUp,
    // },
  ];

  return (
    <div className="h-screen overflow-y-scroll w-full bg-[#F8F8FC] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-violet-700">
              Students
            </h1>

            <p className="text-gray-500">
              Manage and view all students
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3">
              <Download size={18} />
              Export
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white">
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={item.label}
              className="rounded-2xl border bg-white p-5"
            >
              <item.icon
                className="mb-3 text-violet-600"
                size={26}
              />

              <p className="text-gray-500">
                {item.label}
              </p>

              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border bg-white py-3 pl-11 pr-4"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(
                e.target.value
              )
            }
            className="rounded-xl border bg-white px-4 py-3"
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

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-xl border bg-white px-4 py-3"
          >
            <option value="all">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-left">
                    Student
                  </th>
                  <th>Email</th>
                  <th>Course</th>
                  {/* <th>Progress</th> */}
                  <th>Status</th>
                  <th>Joined At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {paginatedStudents.map(
                    (student) => (
                      <motion.tr
                        key={student.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="border-b hover:bg-violet-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                              {student.name
                                .split(" ")
                                .map(
                                  (n) =>
                                    n[0]
                                )
                                .join("")}
                            </div>

                            <div>
                              <p className="font-medium">
                                {
                                  student.name
                                }
                              </p>

                              <p className="text-xs text-gray-500">
                                {
                                  student.email
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td>
                          {student.email}
                        </td>

                        <td>
                          {student.course}
                        </td>

                        {/* <td>
                          <div className="w-36">
                            <div className="mb-1 text-xs">
                              {
                                student.progress
                              }
                              %
                            </div>

                            <div className="h-2 rounded-full bg-gray-200">
                              <div
                                style={{
                                  width: `${student.progress}%`,
                                }}
                                className="h-2 rounded-full bg-violet-600"
                              />
                            </div>
                          </div>
                        </td> */}

                        <td>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              student.status ===
                              "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {
                              student.status
                            }
                          </span>
                        </td>

                        <td>
                          {
                            student.joinedAt
                          }
                        </td>

                        <td>
                          <div className="flex gap-3">
                            <button>
                              <Eye
                                size={18}
                                className="text-violet-600"
                              />
                            </button>

                            <button
                              onClick={() =>
                                setDeleteStudent(
                                  student
                                )
                              }
                            >
                              <Trash2
                                size={18}
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
              {
                paginatedStudents.length
              }{" "}
              of{" "}
              {
                filteredStudents.length
              }{" "}
              students
            </p>

            <div className="flex gap-2">
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`h-10 w-10 rounded-lg ${
                    page === index + 1
                      ? "bg-violet-600 text-white"
                      : "border"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {deleteStudent && (
            <>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
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
                  Delete Student
                </h2>

                <p className="mt-3 text-center text-gray-500">
                  Are you sure you want
                  to delete
                </p>

                <p className="mt-2 text-center font-semibold text-red-500">
                  {
                    deleteStudent.name
                  }
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() =>
                      setDeleteStudent(
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