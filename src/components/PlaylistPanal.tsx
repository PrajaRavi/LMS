// components/PlaylistPanel.tsx

  interface Playlist {
  id: string;
  title: string;
  videoCount: number;
}


interface Props {
  playlists: Playlist[];
}

export default function PlaylistPanel({
  playlists,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <h3 className="mb-4 font-semibold">
        Playlists
      </h3>

      {playlists.map((playlist, index) => (
        <div
          key={playlist.id}
          className={`mb-2 rounded-xl p-3 cursor-pointer transition
          ${
            index === 0
              ? "bg-violet-100 text-violet-700"
              : "hover:bg-gray-100"
          }`}
        >
          <p className="font-medium">
            {index + 1}. {playlist.title}
          </p>

          <span className="text-xs text-gray-500">
            {playlist.videoCount} videos
          </span>
        </div>
      ))}
    </div>
  );
}