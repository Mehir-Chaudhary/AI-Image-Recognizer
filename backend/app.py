from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# Load pre-trained model (MobileNetV2 in this example)
model = tf.keras.applications.MobileNetV2(weights='imagenet')

def preprocess_image(image_path):
    img = Image.open(image_path).resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    img_array = tf.expand_dims(img_array, 0)
    return img_array

@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Preprocess the image
            processed_image = preprocess_image(filepath)
            
            # Make prediction
            predictions = model.predict(processed_image)
            results = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
            
            # Format results
            formatted_results = [
                {'label': label, 'confidence': float(confidence) * 100}
                for (_, label, confidence) in results
            ]
            
            return jsonify({'results': formatted_results})
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up - optional: remove the uploaded file after processing
            if os.path.exists(filepath):
                os.remove(filepath)

if __name__ == '__main__':
    app.run(debug=True)