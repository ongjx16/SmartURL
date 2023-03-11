import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [shortened, setShortened] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShortened("");
    setIsValid(true);
    //const longUrl = JSON.stringify({ longURL: inputvalue });
    const data = { longUrl: inputvalue };
    fetch('https://u.jing-xuanxuan2.repl.co/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          setIsValid(false);
          throw new Error('Invalid Link');
        }
        return response.json();
      })
      .then(data => setShortened(data.shortenedUrlJson))
      .catch(error => {
        setIsValid(false);
        return console.error(error)});
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
      {shortened != "" ?

        <a className="Shortened" href = {shortened}>
          {shortened}
        </a>
        : isValid == false? <text className="Error" >
        Invalid Link. Try again with a different link.
      </text> :
        <div></div>
      }

    </div>
  );
}

export default App;