import { useState } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);

  const handleUpload = async () => {
    const audioRef = ref(storage, `tracks/${audio.name}`);
    await uploadBytes(audioRef, audio);
    const audioUrl = await getDownloadURL(audioRef);

    const coverRef = ref(storage, `covers/${cover.name}`);
    await uploadBytes(coverRef, cover);
    const coverUrl = await getDownloadURL(coverRef);

    await addDoc(collection(db, "tracks"), {
      title,
      artist,
      audioUrl,
      coverUrl,
      createdAt: new Date(),
    });

    alert("Song uploaded!");
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl mb-4">Upload Song</h1>

      <input placeholder="Title" onChange={e=>setTitle(e.target.value)} className="block mb-3 p-2" />
      <input placeholder="Artist" onChange={e=>setArtist(e.target.value)} className="block mb-3 p-2" />
      <input type="file" onChange={e=>setAudio(e.target.files[0])} />
      <input type="file" onChange={e=>setCover(e.target.files[0])} />

      <button onClick={handleUpload} className="mt-4 bg-green-500 px-4 py-2">
        Upload
      </button>
    </div>
  );
}
