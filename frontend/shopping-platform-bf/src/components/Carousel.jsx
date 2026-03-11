import { useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  "https://images.unsplash.com/photo-1601972599720-36938d4ecd31",
  "https://images.unsplash.com/photo-1599785209707-28d6a64b9c90",
];

function Carousel() {

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % slides.length);
  };

  const prev = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-72 overflow-hidden rounded-xl">

      <img
        src={slides[index]}
        className="w-full h-full object-cover"
      />

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 bg-white px-3 py-1 rounded shadow"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 bg-white px-3 py-1 rounded shadow"
      >
        ›
      </button>

    </div>
  );
}

export default Carousel;