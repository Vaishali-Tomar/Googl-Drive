import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { MdFormatAlignCenter } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoMdApps } from "react-icons/io";
import { CAvatar } from '@coreui/react'

const Header = ({ photoURL }) => {
    return (
        <div className="grid grid-cols-3 items-center p-5 h-20 border-b border-gray-300">
            <div className="flex items-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
                    alt="Google Drive"
                    className="w-10"
                />
                <span className="text-2xl ml-2 text-gray-600">Drive</span>
            </div>
            <div className="flex items-center w-full max-w-xl text-xl bg-gray-100 p-4 rounded-md">
                <IoSearchOutline />
                <input
                    type="text"
                    placeholder="Search in Drive"
                    className="bg-transparent text-base pl-5 border-0 outline-none flex-1"
                />
                <MdFormatAlignCenter />
            </div>
            <div className="flex items-center justify-end text-xl">
                <span className="flex gap-5 items-center ml-5 mr-10">
                    <MdHelpOutline />
                    <IoIosSettings />
                </span>
                <span className="flex gap-5 items-center">
                    <IoMdApps />
                    <CAvatar src={photoURL} />
                </span>
            </div>
        </div>
    )
}

export default Header
