"use client";
import Image from "next/image";
import polifit from "@/app/img/Logo.jpeg"
const Header = () => {
  return (
    <header className="bg-[#11404E] p-4 flex justify-between items-center flex-wrap">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <Image
          src={polifit}
          alt="Logo"
          width={50}
          height={50}
          className="md:w-16 md:h-16"
        />
        <div className="text-white">
          <h1 className="text-lg md:text-2xl font-bold">POLIFIT</h1>
          <p className="text-xs md:text-sm">Datos que transforman</p>
        </div>
      </div>

      {/* User Info Section */}
      <div className="flex items-center space-x-4 text-white">
        <div className="text-right">
          <h2 className="text-sm md:text-lg font-bold">Alicia Cardona Nava</h2>
          <p className="text-xs md:text-sm">Nutricionista</p>
        </div>
        <img
          src="https://robohash.org/escom"
          alt="User Avatar"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full"
        />
        <button className="text-white">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </header>
  );
};
export default Header;