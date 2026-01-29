import os
import joblib  # Replace pickle with joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# --- Model & Vectorizer Loading ---
MODEL_PATH = 'spam_ann_model.keras'
VECTORIZER_PATH = 'tfidf_vectorizer.pkl'

try:
    # Loading model 
    model = load_model(MODEL_PATH)
    
    # Loading Scikit-learn vectorizer using joblib 
    vectorizer = joblib.load(VECTORIZER_PATH)
    
    print("✅ System Check: Model and Vectorizer loaded successfully.")
except Exception as e:
    print(f"❌ Critical Error loading assets: {e}")

def preprocess_text(text):
    
    # Cleans raw text into numerical features.
    
    cleaned_text = text.lower().strip()
    # Transform returns a sparse matrix; convert to array for TensorFlow [cite: 12]
    return vectorizer.transform([cleaned_text]).toarray()

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    try:
        # 1. Feature Engineering
        processed_input = preprocess_text(data['text'])
        
        # 2. Model Inference
        prediction_prob = model.predict(processed_input)[0][0]
        
        # 3. Classification Result
        label = "SPAM" if prediction_prob > 0.5 else "Not Spam"
        
        return jsonify({
            "label": label,
            "confidence": float(prediction_prob),
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Running Flask 3 development server [cite: 6, 36]
    app.run(port=5000, debug=True)