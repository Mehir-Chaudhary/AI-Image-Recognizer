# AI Image Recognition Web App

An AI-powered web application that recognizes objects in images using a pre-trained TensorFlow (MobileNetV2) model.
The project is built with a React frontend for image upload and visualization and a Flask backend for model inference and API handling.

# Features

Drag & drop or select an image for analysis

Real-time predictions with top-5 confidence scores

Clean and responsive UI (React + CSS)

Flask REST API for serving the model

Lightweight AI model (MobileNetV2) for fast inference

# Tech Stack

Frontend: React, Axios, React Dropzone, CSS
Backend: Flask, Flask-CORS, Pillow, NumPy
AI Model: TensorFlow Keras (MobileNetV2, pre-trained on ImageNet)

# Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/ai-image-recognition.git
cd ai-image-recognition

2. Backend Setup (Flask)
cd image-recognition-backend
python -m venv venv
Activate venv:
Windows
venv\Scripts\activate
Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
flask run

Backend will start at: http://localhost:5000

3. Frontend Setup (React)
cd image-recognition-frontend
npm install
npm start

Frontend will start at: http://localhost:3000

# Usage

Open [http://localhost:3000](http://localhost:3000/) in your browser

Drag & drop or select an image

Click Analyze Image

View AI predictions with confidence percentages

# Screenshots

<img width="1902" height="873" alt="Screenshot 2025-09-10 212517" src="https://github.com/user-attachments/assets/9ac907cd-2fa5-435a-ad95-4193a82bde6e" />
<img width="1901" height="877" alt="Screenshot 2025-09-10 212509" src="https://github.com/user-attachments/assets/703dde3c-6fd2-4f61-9ead-7d92b760bb2d" />
<img width="1919" height="878" alt="Screenshot 2025-09-10 211651" src="https://github.com/user-attachments/assets/0cea078f-6948-4ae6-a6d9-aff18c9ae611" />

# Future Enhancements

✅ Support for custom-trained models (domain-specific)

✅ Deploy app on cloud platforms (Heroku, AWS, or GCP)

✅ Multi-image upload support

✅ Object detection with bounding boxes (YOLO/SSD)

✅ Explainable AI (Grad-CAM for visualization)

# Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature-new)

Commit your changes

Open a Pull Request

# License

This project is licensed under the MIT License – feel free to use and modify it.

# Developed with React, Flask & TensorFlow
