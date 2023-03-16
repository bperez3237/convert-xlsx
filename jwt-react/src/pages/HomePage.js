import React, {useState} from 'react';

function HomePage() {
  const [file, setFile] = useState(null);
  function upload() {
    console.log('upload');
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          file: file,
        },
      });
      const data = await response.json();
      console.log(data);
    }
  }

  return (<div>
      <h1>Home</h1>
      <input type='file' value={file} onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={upload} >upload</button>
    </div>);
}

export default HomePage;
