import React from 'react';

function HomePage() {
  const [response, setResponse] = React.useState('');

  const handleFileUpload = (event) => {
    const uploadFile = (formData) => {
      fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData)
  }

  const handleClick = (e) => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/test/');
      const data = await response.json();
      console.log(data)
      setResponse(data);
    }
    fetchData()
    .catch(console.error)
  }

  console.log(response)

  return (<div>
      <h1>Home</h1>
      <p>Text here!</p>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleClick}>Click me</button>
    </div>);
}

export default HomePage;
