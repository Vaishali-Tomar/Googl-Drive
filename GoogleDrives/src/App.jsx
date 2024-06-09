import React, { useState } from 'react';
import GoogleAuth from './components/GoogleAuth.jsx';
import FileList from './components/FileList.jsx';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleAuthChange = (signedIn) => {
    setIsSignedIn(signedIn);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Google Drive Integration</h1>
      <GoogleAuth onAuthChange={handleAuthChange} />
      {isSignedIn && <FileList />}
    </div>
  );
}

export default App;
