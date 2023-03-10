import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [shortened, setShortened] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent default form submission behavior
    //reset form after submission
    // setInputValue("");
    const longUrl = "{" + '"longURL": "' + inputvalue + '" }'
    console.log(JSON.parse(longUrl));
    fetch('http://localhost:3000/shorten', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.parse(longUrl),
    })
      .then(
        // response => response.json()
        response => console.log(response)
      )
      // .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        URL Shortener
      </header>
      <text className="Subtitle">
        Input your lengthy url and get a shortened version!
      </text>
      <form className="Form" onSubmit={handleSubmit}>
        <input className="InputField"
          type="text"
          name="name"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)} />
        <input className="Submit" type="submit" name="Shorten" />
      </form>

    </div>
  );
}

export default App;