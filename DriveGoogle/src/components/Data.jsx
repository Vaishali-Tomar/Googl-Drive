import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { MdInsertDriveFile, MdArrowDownward } from "react-icons/md";
import { db } from '../firebase';

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot(snapshot => {
      setFiles(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
  }, []);

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="flex-1 p-2.5">
      <div className="flex items-center w-full max-w-full font-semibold text-lg justify-between border-b border-gray-300 h-10 mb-4">
        <div className="flex items-center">
          <p>My Drive</p>
          <IoIosArrowDown />
        </div>
        <div className="flex items-center">
          <CiBoxList className="mx-2.5" />
          <IoIosInformationCircle className="mx-2.5" />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center my-7.5">
          {files.map(file => (
            <div key={file.id} className="text-center border border-gray-300 m-2.5 min-w-[200px] p-2.5 rounded-md">
              <MdInsertDriveFile className="text-6xl text-gray-500" />
              <p className="border-t border-gray-300 mt-1.25 text-sm bg-gray-100 p-2.5">{file.data.filename}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center font-lg justify-between border-b border-gray-300 p-2.5">
            <p className="flex items-center text-sm"><b className="flex items-center">Name <MdArrowDownward className="mx-2.5" /></b></p>
            <p className="text-sm"><b>Owner</b></p>
            <p className="text-sm"><b>Last Modified</b></p>
            <p className="text-sm"><b>File Size</b></p>
          </div>
          {files.map(file => (
            <div key={file.id} className="flex items-center text-lg justify-between border-b border-gray-300 p-2.5">
              <a href={file.data.fileURL} target="_blank" className="flex items-center text-sm">
                <MdInsertDriveFile className="mx-2.5" /> {file.data.filename}
              </a>
              <p className="text-sm">Owner</p>
              <p className="text-sm">{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
              <p className="text-sm">{changeBytes(file.data.size)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
