from flask import Blueprint, render_template
import os
views = Blueprint(__name__,'/')

@views.route('/')
def home():
    return render_template('index.html')