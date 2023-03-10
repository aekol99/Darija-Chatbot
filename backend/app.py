from flask import Flask, render_template, request
from flask_cors import CORS
import json

from dltk.lemmatizer import WordLemmatizer
from dltk.tokernizer import word_tokenize
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
    # spliting patten into words and lemmatizing them (words)
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in word_tokenize(pattern)]
    # words to numbers
    bag = []
    for word in words:
        bag.append(1) if word in pattern_words else bag.append(0)

def clean_up_sentence(sentence):
    sentence_words = word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)
    return(np.array(bag))

def predict_class(sentence, model):
    p = bow(sentence, words,show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag']== tag):
            result = random.choice(i['responses'])
            break
    return result

def chatbot_response(msg):
    ints = predict_class(msg, model)
    res = getResponse(ints, intents)
    return res




app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("app.html")

@app.route("/api/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        data = json.loads(request.data)
        response = {"type": "bot", "content": chatbot_response(data["pattern"])}
        return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)