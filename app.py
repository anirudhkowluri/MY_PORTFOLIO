from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Portfolio Data
PROJECTS = [
    {
        "title": "Email Classifier using SVM",
        "description": "A robust tool to classify emails as spam or ham using Support Vector Machines and machine learning techniques.",
        "link": "https://github.com/anirudhkowluri/Email-classifier-using-SVM",
        "tags": ["Machine Learning", "SVM", "Python"]
    },
    {
        "title": "Sentiment Analysis using NLP",
        "description": "Comparative analysis of SVC, Logistic Regression, and Naive Bayes models for sentiment analysis on restaurant reviews.",
        "link": "https://github.com/anirudhkowluri/sentiment-analysis-using-nlp",
        "tags": ["NLP", "Scikit-Learn", "Data Analysis"]
    },
    {
        "title": "Customer Segmentation",
        "description": "K-Means clustering algorithm to segment customers based on annual income and spending scores for targeted marketing.",
        "link": "https://github.com/anirudhkowluri/customer-segmentation-algorithm",
        "tags": ["Unsupervised Learning", "K-Means", "Clustering"]
    },
    {
        "title": "Fake News Detector",
        "description": "An intelligent algorithm designed to detect and classify news articles as real or fake using NLP.",
        "link": "https://github.com/anirudhkowluri/fake-news-detector",
        "tags": ["NLP", "Classification", "AI"]
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html', projects=PROJECTS)

@app.route('/resume')
def resume():
    # Assuming the resume is in the root directory relative to where app.py is run
    return send_from_directory('.', 'Anirudh_kowluri_ML_ENGINEER_Resume.pdf')

if __name__ == '__main__':
    app.run(debug=True)
