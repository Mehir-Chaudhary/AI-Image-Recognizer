import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './ImageRecognition.css';

const ImageRecognition = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResults([]);
    setError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    onDrop
  });

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResults(response.data.results);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err.response?.data?.error || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-recognition-container">
      <h2>AI Image Recognition</h2>
      
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an image</p>
      </div>

      {preview && (
        <div className="preview-container">
          <h3>Image Preview</h3>
          <img src={preview} alt="Preview" className="image-preview" />
          
          <button 
            onClick={analyzeImage} 
            className="analyze-button"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="results-container">
          <h3>Results</h3>
          <ul className="results-list">
            {results.map((result, index) => (
              <li key={index} className="result-item">
                <span className="result-label">{result.label}</span>
                <div className="confidence-bar-container">
                  <div 
                    className="confidence-bar" 
                    style={{ width: `${result.confidence}%` }}
                  />
                  <span className="confidence-value">{result.confidence.toFixed(2)}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageRecognition;