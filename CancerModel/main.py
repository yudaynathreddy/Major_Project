from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import requests
from io import BytesIO
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load the TensorFlow Lite model.
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Load label names.
with open("labels.txt", "r") as f:
    labels = f.read().splitlines()

# Function to preprocess the image.
def preprocess_image(image):
    img = Image.open(BytesIO(image))
    img = img.resize((224, 224))  # Resize image to the required input size of the model
    img_array = np.array(img) / 255.0  # Normalize pixel values to [0, 1]
    img_array = (img_array - 0.5) / 0.5  # Standardize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array.astype(np.float32)

# Function to perform inference.
def predict(image):
    input_data = preprocess_image(image)
    interpreter.set_tensor(interpreter.get_input_details()[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(interpreter.get_output_details()[0]['index'])
    return output_data[0]

# Function to get top k predictions.
def get_top_k_predictions(prediction, k=1):
    top_k_indices = prediction.argsort()[-k:][::-1]
    top_k_values = prediction[top_k_indices]
    top_k_labels = [labels[i] for i in top_k_indices]
    return top_k_values, top_k_labels

@app.route('/predict', methods=['POST'])
def predict_from_image_link():
    image_link = request.json.get('image_link')

    # Fetch image from the provided link
    response = requests.get(image_link)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch the image from the provided link.'}), 400

    image = response.content
    prediction = predict(image)
    top_values, top_labels = get_top_k_predictions(prediction)
    print(top_values[0])
    results = {'label': top_labels[0], 'confidence': float(top_values[0])}
    return jsonify({'predictions': results})

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)