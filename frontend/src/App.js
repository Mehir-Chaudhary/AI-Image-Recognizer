import React from 'react';
import './App.css';
import ImageRecognition from './components/ImageRecognition';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🔍 AI-Powered Image Recognition</h1>
      </header>

      <main className="App-main">
        <div className="card">
          <ImageRecognition />
        </div>
      </main>

      <footer className="App-footer">
        <p>🚀 Created with <strong>React</strong> and <strong>Flask</strong></p>
      </footer>
    </div>
  );
}

export default App;
