import React, { useState } from "react";

const sitcoms = [
  { name: "Friends", image: "/assets/images/Ac.png", color: "#3F3B6E" },
  { name: "The Big Bang Theory", image: "/assets/images/big-ban-theory.jpg", color: "#3C9D9B" },
  { name: "How I Met Your Mother", image: "/assets/images/himym.jpg", color: "#D16339" },
  { name: "The Office", image: "/assets/images/the-office.jpg", color: "#5B5A5A" },
  { name: "Modern Family", image: "/assets/images/modern-family.jpg", color: "#F5A400" },
  { name: "Brooklyn Nine-Nine", image: "/assets/images/brooklyn-nine-nine.jpg", color: "#004D62" },
];

const Parousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(sitcoms[currentIndex].color);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % sitcoms.length;
    setCurrentIndex(nextIndex);
    setBgColor(sitcoms[nextIndex].color);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + sitcoms.length) % sitcoms.length;
    setCurrentIndex(prevIndex);
    setBgColor(sitcoms[prevIndex].color);
  };

  if (!sitcoms.length) return <p>No items to display</p>;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease",
      }}
    //   className="relative w-full h-screen flex justify-center items-center overflow-hidden"
    // >
    className="relative w-full h-[60vh] flex justify-center items-center overflow-hidden"
>
      {/* Carousel Image */}
      <img
        src={sitcoms[currentIndex].image}
        alt={sitcoms[currentIndex].name}
        className="w-full h-full object-cover"
      />

      {/* Carousel Controls */}
     <button
  onClick={prevSlide}
  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-6xl w-16 h-60 flex items-center justify-center rounded hover:border bg-opacity-50 hover:bg-opacity-80 m-4"
  aria-label="Previous Slide"
>
  &#8249;
</button>

<button
  onClick={nextSlide}
  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-6xl w-16 h-60 flex items-center justify-center rounded hover:border bg-opacity-50 hover:bg-opacity-80 m-4"
  aria-label="Next Slide"
>
  &#8250;
</button>


      {/* Shop Section */}
     

    </div>
  );
};

export default Parousel;