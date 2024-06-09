import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const FileList = () => {
  const [files, setFiles] = useState([]);

  const listFiles = () => {
    gapi.client.drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }).then(response => {
      const resFiles = response.result.files;
      setFiles(resFiles || []);
    });
  };

  return (
    <div className="mt-8">
      <button
        onClick={listFiles}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        List Files
      </button>
      <ul className="space-y-2">
        {files.map(file => (
          <li key={file.id} className="border p-2 rounded-lg shadow">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
