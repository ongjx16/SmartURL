import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [shortened, setShortened] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShortened("");
    //const longUrl = JSON.stringify({ longURL: inputvalue });
    const data = {longUrl: inputvalue};
    fetch('https://url-shorterner.jing-xuanxuan2.repl.co/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => setShortened(data.shortenedUrlJson))
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
      {shortened!=""? 
      <div>
        <text className="Shortened">
          {shortened}
        </text>
      </div>:
      <div></div>
        }

    </div>
  );
}

export default App;