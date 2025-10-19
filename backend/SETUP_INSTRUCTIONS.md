# Sign Language Backend Setup Instructions

## Problem
The backend API connects but doesn't recognize hand signals properly.

## Solution

### Step 1: Copy the Model File
Copy `cnn8grps_rad1_model.h5` from your Sign-Language-To-Text-and-Speech-Conversion folder to the backend folder:

```bash
copy "c:\Users\najgr\Desktop\Hackathon App\Sign-Language-To-Text-and-Speech-Conversion\cnn8grps_rad1_model.h5" "c:\Users\najgr\Desktop\Hackathon App\accessspeak-demo\backend\"
```

### Step 2: Copy white.jpg
Copy the white.jpg file needed for hand skeleton drawing:

```bash
copy "c:\Users\najgr\Desktop\Hackathon App\Sign-Language-To-Text-and-Speech-Conversion\white.jpg" "c:\Users\najgr\Desktop\Hackathon App\accessspeak-demo\backend\"
```

### Step 3: Install Required Packages
```bash
cd "c:\Users\najgr\Desktop\Hackathon App\accessspeak-demo\backend"
pip install flask flask-cors opencv-python numpy keras tensorflow cvzone pyenchant pillow
```

### Step 4: Use the Working Backend
I've created a complete backend file `sign_language_api.py` that integrates ALL the prediction logic from your `final_pred.py`.

### Step 5: Run the Backend
```bash
python sign_language_api.py
```

The API will run on `http://localhost:5001`

## What Was Fixed

1. **Complete Prediction Logic**: Integrated all 700+ lines of prediction conditions from final_pred.py
2. **Proper Hand Detection**: Uses cvzone HandDetector like the original
3. **Hand Skeleton Drawing**: Draws the hand skeleton on white canvas before prediction
4. **All Character Mappings**: Includes all A-Z character recognition logic
5. **Special Commands**: Handles space, backspace, and "next" commands

## API Endpoints

### Health Check
```
GET http://localhost:5001/health
```

### Recognize Sign
```
POST http://localhost:5001/recognize
Body: {
  "image": "base64_encoded_image"
}
```

## Testing
The React frontend (SignLanguageSpeller.jsx) should now properly recognize hand signs when you run both:
1. Backend: `python sign_language_api.py`
2. Frontend: `npm run dev`

## Troubleshooting

**Model not loading?**
- Ensure `cnn8grps_rad1_model.h5` is in the backend folder
- Check file path in console output

**Hand not detected?**
- Ensure good lighting
- Keep hand in frame
- Try adjusting camera position

**Wrong predictions?**
- The model needs the exact same preprocessing as training
- Ensure white.jpg exists for skeleton drawing
- Check that hand landmarks are being detected (21 points)
