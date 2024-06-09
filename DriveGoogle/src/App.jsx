import React, { useState } from 'react'; 
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { auth, provider } from "./firebase";
import Data from './components/Data';

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(({ user }) => setUser(user))
      .catch(err => alert(err));
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
        <div className="bg-gray-200 p-5 w-96 mx-auto flex flex-col items-center mt-24">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png"
            alt="gdrive"
            className="w-24"
          />
          <button
            onClick={signIn}
            className="w-full bg-purple-800 p-3 text-white uppercase tracking-widest text-lg border-0 outline-0 rounded-md cursor-pointer mt-5"
          >
            Login to Google Drive
          </button>
        </div>
      )}
    </>
  );
}

export default App;
