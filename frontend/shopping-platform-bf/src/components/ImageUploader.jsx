import { useRef } from "react";

function ImageUploader({ preview, setPreview, uploadImage }) {
  const fileInput = useRef();

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    uploadImage(file);
  };

  return (
    <div
      className="relative w-48 h-48 cursor-pointer group self-center"
      onClick={() => fileInput.current.click()}
    >
      <img
        src={preview || "https://i.sstatic.net/y9DpT.jpg"}
        alt="preview"
        className="w-full h-full object-cover rounded-lg border"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition">
        <span className="text-white text-lg font-medium">
          📷 Change Image
        </span>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        className="hidden"
        onChange={handleSelect}
      />
    </div>
  );
}

export default ImageUploader;