# Fruit and Vegetable Freshness Detection using Deep Learning and Computer Vision

_By Michael Angelo Monasterial, Pe Arian Rey, Ron Mikhael Surara, Jedidiah Carl Tan_

![Made with Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white) ![Made with React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Made with TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white) ![Hosted on Google Colabs](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252)

[Live Site](https://ml-fruit-freshness-classifier.vercel.app/) | [Google Colab](https://colab.research.google.com/drive/1XpFiHE_2rodd5SomKYy5eMnFWVuyufbo?usp=sharing)

## Introduction
A web app that uses machine learning to classify images of fruits and vegetables as either fresh or stale.

## What We Did

Using the Keras Sequential model in `TensorFlow`, we made  a Convolutional Neural Network and trained it on the following datasets:

1. [Fruits fresh and rotten for classification by Sriram Reddy Kalluri](https://www.kaggle.com/datasets/sriramr/fruits-fresh-and-rotten-for-classification)

2. [Fruits and Vegetables dataset by Mukhriddin Mukhiddinov](https://www.kaggle.com/datasets/muhriddinmuxiddinov/fruits-and-vegetables-dataset)

3. [Fresh and Stale Images of Fruits and Vegetables by Raghav R Potdar et. al.](https://www.kaggle.com/datasets/raghavrpotdar/fresh-and-stale-images-of-fruits-and-vegetables)

The model is then used in a FastAPI server which processes images sent by the client to determine whether a fruit or a vegetable is fresh or not.