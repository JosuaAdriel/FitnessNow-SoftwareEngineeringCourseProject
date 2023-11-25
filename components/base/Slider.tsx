"use client";

import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

interface Slide {
  url: string;
  text: string;
}

function App() {
  const slides: Slide[] = [
    {
      url: "images/gymMen.jpg",
      text: "BODY BUILDING",
    },
    {
      url: "images/gymwoman.jpg",
      text: "GYM WORKOUT",
    },
    {
      url: "images/boxing.jpg",
      text: "KICKBOXING",
    },
    {
      url: "images/cardio.jpg",
      text: "PILATES",
    },
    {
      url: "images/yoga.jpg",
      text: "YOGA",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    const isFirstSlide: boolean = currentIndex === 0;
    const newIndex: number = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (): void => {
    const isLastSlide: boolean = currentIndex === slides.length - 1;
    const newIndex: number = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[600px] w-3/4 m-auto pb-16 px-4 relative group">
      <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative">
        <div className="absolute w-full h-full inset-0 bg-black/30 rounded-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-4xl font-bold">{slides[currentIndex].text}</div>
        <button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-400 w-48 h-14 text-white font-bold rounded-md">Discover Classes</button>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-45%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[-45%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
