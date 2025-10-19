#!/usr/bin/env python3
"""
Enhanced Sign Language Recognition API for React Frontend
Uses your working final_pred.py logic with better error handling
"""

import numpy as np
import math
import cv2
import os
import base64
import io
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from cvzone.HandTrackingModule import HandDetector
from string import ascii_uppercase
import enchant

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Global variables
hd = HandDetector(maxHands=1)
hd2 = HandDetector(maxHands=1)
offset = 29
ddd = enchant.request_dict("en-US")

class SignLanguageAPI:
    def __init__(self):
        # Load the trained model
        try:
            self.model = load_model('cnn8grps_rad1_model.h5')
            print("✅ Model loaded successfully")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.model = None
        
        # Initialize character tracking (same as final_pred.py)
        self.ct = {}
        self.ct['blank'] = 0
        self.blank_flag = 0
        self.space_flag = False
        self.next_flag = True
        self.prev_char = ""
        self.count = -1
        self.ten_prev_char = []
        
        for i in range(10):
            self.ten_prev_char.append(" ")
        
        for i in ascii_uppercase:
            self.ct[i] = 0

    def distance(self, x, y):
        return math.sqrt(((x[0] - y[0]) ** 2) + ((x[1] - y[1]) ** 2))

    def predict(self, test_image, pts):
        """Enhanced prediction function based on final_pred.py"""
        if self.model is None:
            return {'success': False, 'message': 'Model not loaded'}
        
        try:
            white = test_image
            white = white.reshape(1, 400, 400, 3)
            prob = np.array(self.model.predict(white)[0], dtype='float32')
            ch1 = np.argmax(prob, axis=0)
            prob[ch1] = 0
            ch2 = np.argmax(prob, axis=0)
            prob[ch2] = 0
            ch3 = np.argmax(prob, axis=0)
            prob[ch3] = 0

            pl = [ch1, ch2]

            # Apply the same conditions as in final_pred.py
            # condition for [Aemnst]
            l = [[5, 2], [5, 3], [3, 5], [3, 6], [3, 0], [3, 2], [6, 4], [6, 1], [6, 2], [6, 6], [6, 7], [6, 0], [6, 5],
                 [4, 1], [1, 0], [1, 1], [6, 3], [1, 6], [5, 6], [5, 1], [4, 5], [1, 4], [1, 5], [2, 0], [2, 6], [4, 6],
                 [1, 0], [5, 7], [1, 6], [6, 1], [7, 6], [2, 5], [7, 1], [5, 4], [7, 0], [7, 5], [7, 2]]
            if pl in l:
                if (pts[6][1] < pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 0

            # condition for [o][s]
            l = [[2, 2], [2, 1]]
            if pl in l:
                if (pts[5][0] < pts[4][0]):
                    ch1 = 0

            # Apply character mapping (simplified version)
            if ch1 == 0:
                if (pts[6][1] < pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 'S'
                else:
                    ch1 = 'A'
                if (pts[6][1] < pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 'T'
                else:
                    ch1 = 'E'
                if (pts[6][1] < pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 'M'
                else:
                    ch1 = 'N'
            if ch1 == 2:
                if (pts[5][0] < pts[4][0]):
                    ch1 = 'C'
                else:
                    ch1 = 'O'
            if ch1 == 3:
                if (pts[4][0] > pts[0][0]):
                    ch1 = 'G'
                else:
                    ch1 = 'H'
            if ch1 == 7:
                if (pts[3][0] < pts[0][0]):
                    ch1 = 'Y'
                else:
                    ch1 = 'J'
            if ch1 == 4:
                ch1 = 'L'
            if ch1 == 6:
                ch1 = 'X'
            if ch1 == 5:
                if (pts[4][1] + 17 > pts[8][1] and pts[4][1] + 17 > pts[12][1] and pts[4][1] + 17 > pts[16][1] and pts[4][1] + 17 > pts[20][1]):
                    ch1 = 'Z'
                else:
                    ch1 = 'P'
            if ch1 == 1:
                if (pts[6][1] > pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 'B'
                else:
                    ch1 = 'D'

            # Handle special cases
            if ch1 == 1 or ch1 == 'E' or ch1 == 'S' or ch1 == 'X' or ch1 == 'Y' or ch1 == 'B':
                if (pts[6][1] > pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = " "

            if ch1 == 'E' or ch1 == 'Y' or ch1 == 'B':
                if (pts[6][1] > pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = "next"

            if ch1 == 'Next' or ch1 == 'B' or ch1 == 'C' or ch1 == 'H' or ch1 == 'F' or ch1 == 'X':
                if (pts[6][1] > pts[8][1] and pts[10][1] < pts[12][1] and pts[14][1] < pts[16][1] and pts[18][1] < pts[20][1]):
                    ch1 = 'Backspace'

            return {
                'success': True,
                'letter': str(ch1),
                'confidence': float(np.max(prob))
            }

        except Exception as e:
            return {
                'success': False,
                'message': f'Prediction error: {str(e)}'
            }

    def process_image(self, image_data):
        """Process image and return prediction"""
        try:
            print("🔄 Processing image...")
            
            # Decode base64 image
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            print(f"📏 Image size: {frame.shape}")
            
            # Flip image horizontally
            cv2image = cv2.flip(frame, 1)
            
            # Detect hands
            hands = hd.findHands(cv2image, draw=False, flipType=True)
            print(f"👋 Hands detected: {len(hands) if hands else 0}")
            
            if hands and len(hands) > 0:
                hand = hands[0]
                if 'bbox' in hand:
                    x, y, w, h = hand['bbox']
                    print(f"📦 Hand bbox: x={x}, y={y}, w={w}, h={h}")
                    
                    # Extract hand region
                    image = cv2image[y - offset:y + h + offset, x - offset:x + w + offset]
                    
                    if image.size > 0:
                        print(f"✋ Hand image size: {image.shape}")
                        
                        # Create white background
                        white = np.ones((400, 400, 3), dtype=np.uint8) * 255
                        
                        # Resize hand image to fit in white background
                        hand_resized = cv2.resize(image, (min(400, w + 2*offset), min(400, h + 2*offset)))
                        
                        # Center the hand image on white background
                        start_y = (400 - hand_resized.shape[0]) // 2
                        start_x = (400 - hand_resized.shape[1]) // 2
                        end_y = start_y + hand_resized.shape[0]
                        end_x = start_x + hand_resized.shape[1]
                        
                        white[start_y:end_y, start_x:end_x] = hand_resized
                        
                        # Detect hand landmarks on the processed image
                        handz = hd2.findHands(white, draw=False, flipType=True)
                        
                        if handz and len(handz) > 0:
                            hand = handz[0]
                            handmap = hand[0]
                            pts = handmap['lmList']
                            
                            print("🔍 Making prediction...")
                            result = self.predict(white, pts)
                            print(f"✅ Prediction result: {result}")
                            return result
                        else:
                            print("❌ No hand landmarks detected")
                    else:
                        print("❌ Empty hand image")
                else:
                    print("❌ No bbox in hand data")
            else:
                print("❌ No hands detected")
            
            return {
                'success': False,
                'message': 'No hand detected'
            }
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return {
                'success': False,
                'message': f'Image processing error: {str(e)}'
            }

# Initialize recognizer
recognizer = SignLanguageAPI()

@app.route('/api/sign-language/predict', methods=['POST'])
def predict_sign():
    try:
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({
                'success': False,
                'message': 'No image data provided'
            }), 400
        
        print("📨 Received prediction request")
        result = recognizer.process_image(image_data)
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Server error: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

@app.route('/api/sign-language/alphabet', methods=['GET'])
def get_alphabet():
    return jsonify({
        'success': True,
        'alphabet': {
            'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H',
            'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P',
            'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
            'Y': 'Y', 'Z': 'Z', 'SPACE': ' ', 'DELETE': 'Backspace', 'CLEAR': 'Clear'
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'sign-language-recognition',
        'model_loaded': recognizer.model is not None,
        'message': 'Python API is running and ready'
    })

if __name__ == '__main__':
    print("🚀 Starting Enhanced Sign Language Recognition API...")
    print("📱 Available endpoints:")
    print("   - POST /api/sign-language/predict")
    print("   - GET /api/sign-language/alphabet")
    print("   - GET /health")
    print("🔧 Make sure 'cnn8grps_rad1_model.h5' is in the same directory")
    print("🐛 Debug mode: ON - Check console for detailed logs")
    
    app.run(host='0.0.0.0', port=5001, debug=True)
