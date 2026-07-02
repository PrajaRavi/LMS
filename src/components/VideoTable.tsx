// components/VideoTable.tsx

 interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
}
import { Pencil, Trash2 } from "lucide-react";
// import { Video }  from "../utils/Types";

interface Props {
  videos: Video[];
  onDelete: (video: Video) => void;
}

export default function VideoTable({
  videos,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="mb-5 flex justify-between">
        <h3 className="font-semibold">
          1. Introduction
        </h3>

        <button className="rounded-lg bg-violet-600 px-4 py-2 text-white">
          + Add Video
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th>#</th>
              <th>Video</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((video, index) => (
              <tr
                key={video.id}
                className="border-b"
              >
                <td>{index + 1}</td>

                <td>
                  <div className="flex gap-3 py-3">
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="h-12 w-20 rounded object-cover"
                    />

                    <div>
                      <h4>{video.title}</h4>

                      <a
                        href={video.url}
                        className="text-xs text-blue-500"
                      >
                        {video.url}
                      </a>
                    </div>
                  </div>
                </td>

                <td>{video.duration}</td>

                <td>
                  <div className="flex gap-3">
                    <button>
                      <Pencil
                        size={18}
                        className="text-violet-600"
                      />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(video)
                      }
                    >
                      <Trash2
                        size={18}
                        className="text-red-500"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}