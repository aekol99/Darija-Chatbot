from flask import Flask, render_template, request
from flask_cors import CORS
import json

from dtk.lemmatizer import WordLemmatizer
from dtk.tokenizer import word_tokenize
import pickle
import numpy as np

from keras.models import load_model
import json
import random

lemmatizer = WordLemmatizer()
model = load_model('chatbot_model.h5')
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))

def get_answer(pattern):
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in word_tokenize(pattern)]
    bag = []
    for word in words:
        bag.append(1) if word in pattern_words else bag.append(0)
    p = np.array(bag)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.95
    if np.max(res) > ERROR_THRESHOLD:
        tag = classes[np.argmax(res)]
        for i in intents['intents']:
            if(i['tag'] == tag):
                result = random.choice(i['responses'])
                break
    else:
        result = "sir f7alek asa7bi ana m3ak blah obchre3"
    return result

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("app.html")

@app.route("/api/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        data = json.loads(request.data)
        response = {"type": "bot", "content": get_answer(data["pattern"])}
        return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)