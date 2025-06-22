import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cat, setCat] = useState(null);
  const [text, setText] = useState("");
  const [memes, setMemes] = useState([]);

  // Загрузить случайного котика
  const fetchCat = async () => {
    const response = await fetch('http://localhost:5000/api/random-cat');
    const data = await response.json();
    setCat(data);
  };

  // Загрузить все мемы
  const fetchMemes = async () => {
    const response = await fetch('http://localhost:5000/api/memes');
    const data = await response.json();
    setMemes(data);
  };

  // Сохранить мем
  const saveMeme = async () => {
    await fetch('http://localhost:5000/api/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: cat.url, text })
    });
    fetchMemes();
    // Load new cat image
    fetchCat();
    // Clear input field
    setText("");
  };

  // При загрузке страницы
  useEffect(() => {
    fetchCat();
    fetchMemes();
  }, []);

  return (
    <div className="App">
      <h1>Генератор мемов с котиками</h1>
      {cat && (
        <div className="meme-creator">
          <img src={cat.url} alt="Random Cat" width="400" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              saveMeme();
            }}}
            placeholder="Введите подпись"
          />
          <button onClick={saveMeme}>Сохранить мем</button>
        </div>
      )}
      <div className="gallery">
        <h2>Галерея мемов</h2>
        {memes.map(meme => (
          <div key={meme.id} className="meme">
            <img src={meme.image_url} alt="Meme" width="200" />
            <p>{meme.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
