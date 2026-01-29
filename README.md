# Spam Email Detection System

This repository contains a simple spam/ham email classification web app with a React + Vite frontend and a Flask backend (TensorFlow model). The frontend sends user input to the backend API which returns a spam probability and label.

## Features
- Input email text and receive a spam/ham prediction with confidence
- Simple history and result UI components in the frontend
- Pre-trained TensorFlow model served by Flask in the backend

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Flask, TensorFlow, scikit-learn (vectorizer)

## Quick start  Local (Windows)

1) Start the backend

```powershell
cd Backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # PowerShell
pip install -r requirements.txt
python app.py
```

The backend serves POST `/api/predict` on port `5000`. It expects JSON: { "text": "..." } and returns { "label": "SPAM"|"HAM", "confidence": <float>, "status": "success" }.

2) Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

Vite serves the frontend on http://localhost:5173 by default. CORS is already configured in `Backend/app.py` to allow this origin.

Sample curl request to the backend:

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"Congratulations  you won a prize!"}'
```

## Project layout (high level)
- `Backend/`  Flask application, model and vectorizer files, `requirements.txt`
- `Frontend/`  React + Vite app, source in `src/` and `package.json`

Important files
- [Backend/app.py](Backend/app.py)  Flask API and model loading
- [Backend/requirements.txt](Backend/requirements.txt)  Python dependencies
- [Frontend/package.json](Frontend/package.json)  Frontend scripts and deps
- [Frontend/README.md](Frontend/README.md)  Frontend-specific instructions

## Development notes
- The backend expects `spam_ann_model.keras` and `tfidf_vectorizer.pkl` in `Backend/` when starting. If those files are missing, the Flask app will print a load error.
- Backend uses `joblib` to load the scikit-learn vectorizer and TensorFlow `load_model` for the Keras model.
- If you change the frontend origin or ports, update allowed CORS origins in `Backend/app.py`.

## Build & deploy
- Frontend: `npm run build` from the `Frontend/` directory produces a production bundle.
- Backend: containerize or deploy the Flask app; ensure the model and vectorizer are included.

## Troubleshooting
- If `npm run dev` fails, ensure Node.js and npm versions are compatible and dependencies are installed.
- If the backend returns 500, check the Flask console for model loading errors and that `tfidf_vectorizer.pkl` exists.

## License
This repository has no license file. Add one if you plan to publish or share the project.

---
For frontend-specific details see [Frontend/README.md](Frontend/README.md). For backend internals see [Backend/app.py](Backend/app.py).
