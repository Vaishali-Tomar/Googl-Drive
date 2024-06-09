import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth, provider } from "./firebase";
import Data from "./components/Data";

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => setUser(user))
      .catch((err) => alert(err));
  };

  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="flex">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="bg-gray-200 h-screen w-screen flex flex-col items-start pl-8 pt-4">
          <div className="flex w-full justify-between items-center mb-10">
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
                alt="gdrive"
                className="w-24 p-4"
              />
              <span className="text-3xl text-black font-semibold">Disk</span>
            </div>
            <button
              onClick={signIn}
              className="bg-purple-800 p-5 text-white uppercase tracking-widest text-lg border-0 outline-0 rounded-md cursor-pointer mr-8"
            >
              Login In
            </button>
          </div>
          <div className="w-full  mt-22 pt-30 flex justify-evenly items-center flex-grow">
            <div className="w-2/6 flex flex-col justify-center mr-8 ">
              <h1 className="text-5xl mb-4 text-black font-semibold justify-center">
                Easy and secure access to your content
              </h1>
              <p className="mb-4 text-center text-3xl text-gray-700">
                Store, share, and collaborate on files and folders from your
                mobile device, tablet, or computer.
              </p>
              <button
                onClick={signIn}
                className="w-full max-w-xs  bg-purple-800 p-3 text-white uppercase tracking-widest text-lg border-0 outline-0 rounded-md cursor-pointer mt-5"
              >
                Login In
              </button>
            </div>
            <div className="w-2/5 flex justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/04/14/07/53/girl-1328416_1280.jpg"
                alt=""
                className="max-h-96"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
