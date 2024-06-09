import React, { useState } from "react";
import {
  MdOutlineMobileScreenShare,
  MdImportantDevices,
  MdPeopleAlt,
  MdQueryBuilder,
  MdOutlineStarBorder,
  MdDeleteForever,
  MdCloudQueue,
} from "react-icons/md";
import { db, storage } from "../firebase";
import firebase from "firebase";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      
    }
  };
  

  const handleInput = async (e) => {
    e.preventDefault();
    

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    console.log("File details on form submission:", file);

    setUploading(true);
    console.log("Uploading started");

    try {
      const fileRef = storage.ref(`files/${file.name}`);
      

      const snapshot = await fileRef.put(file);
      

      const url = await fileRef.getDownloadURL();
      

      await db.collection("myfiles").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        filename: file.name,
        fileURL: url,
        size: snapshot.bytesTransferred,
      });
      

      setUploading(false);
      setFile(null);
      setOpen(false);

      
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="mt-2">
      <div className="ml-5">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-2 py-1 border border-gray-300 rounded-full shadow-sm bg-transparent"
        >
          <img
            src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
            alt="new"
          />
          <span className="ml-2 text-sm">New</span>
        </button>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setOpen(false)}
            ></div>
            <div className="relative bg-white w-96 p-5 rounded shadow-lg">
              <h3 className="text-center text-lg mb-4">
                Select file you want to upload
              </h3>
              <form onSubmit={handleInput}>
                {uploading ? (
                  <div>Uploading...</div>
                ) : (
                  <>
                    <input
                      type="file"
                      className="block w-full p-4 mb-4 bg-gray-200"
                      onChange={handleFile}
                    />
                    <input
                      type="submit"
                      className="w-full p-2 text-white uppercase bg-purple-600 cursor-pointer"
                    />
                  </>
                )}
              </form>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-black"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2">
        {[
          { icon: <MdOutlineMobileScreenShare />, label: "My Drive" },
          { icon: <MdImportantDevices />, label: "Computers" },
          { icon: <MdPeopleAlt />, label: "Shared with me" },
          { icon: <MdQueryBuilder />, label: "Recent" },
          { icon: <MdOutlineStarBorder />, label: "Starred" },
          { icon: <MdDeleteForever />, label: "Trash" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-4 text-xl border-l-8 hover:bg-gray-100 cursor-pointer border-gray-300"
          >
            {item.icon}
            <span className="ml-3 text-lg font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="mt-2">
        <div className="flex items-center px-4 py-4 text-xl border-l-8 hover:bg-gray-100 cursor-pointer border-gray-300">
          <MdCloudQueue />
          <span className="ml-3 text-lg font-semibold">Storage</span>
        </div>
        <div className="px-4 py-4">
          <progress className="w-full" value="50" max="100"></progress>
          <span className="block mt-2 text-lg">105 GB of 200 GB used</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
