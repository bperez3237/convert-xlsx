import React from 'react';

function HomePage() {

  const handleFileUpload = (event) => {
    const uploadFile = (formData) => {
      fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
        responseType: 'blob',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => { 
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'excel_file.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      })
      .catch(error => {
        console.error(error);
      });
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData);
  }

  const handleClick = (e) => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/test/');
      const data = await response.json();
      console.log(data)
    }
    fetchData()
    .catch(console.error)
  }


  return (<div>
      <h1>Home</h1>
      <p>Text here!</p>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleClick}>Click me</button>
    </div>);
}

export default HomePage;
