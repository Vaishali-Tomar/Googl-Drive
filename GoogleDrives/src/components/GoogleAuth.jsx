import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

const GoogleAuth = ({ onAuthChange }) => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
        onAuthChange(authInstance.isSignedIn.get());
      });
    }
    gapi.load('client:auth2', start);
  }, [onAuthChange]);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  if (isSignedIn === null) {
    return null;
  }

  return (
    <div className="flex justify-center">
      {isSignedIn ? (
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
