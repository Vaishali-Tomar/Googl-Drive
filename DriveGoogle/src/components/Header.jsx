import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdFormatAlignCenter } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoMdApps } from "react-icons/io";

const Header = ({ photoURL }) => {
  return (
    <div className="grid grid-cols-[300px_1fr_300px] items-center p-5 h-15 border-b border-gray-300 ">
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
          alt="Google Drive"
          className="w-10"
        />
        <span className="text-2xl ml-4 text-gray-600">Drive</span>
      </div>
      <div className="flex items-center bg-gray-100 p-3 rounded-lg mx-4 flex-grow">
        <IoSearchOutline className="text-xl" />
        <input
          type="text"
          placeholder="Search in Drive"
          className="bg-transparent border-0 outline-none flex-1 ml-2 rounded-2xl"
        />
        <MdFormatAlignCenter className="text-xl" />
      </div>
      <div className="flex items-center justify-end space-x-4">
        <MdHelpOutline className="text-xl" />
        <IoIosSettings className="text-xl" />
        <IoMdApps className="text-xl" />
        <img src={photoURL} alt="User Avatar" className="ml-2 w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Header;
