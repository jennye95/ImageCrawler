"""Image crawler
Author: Jenny Ye
"""
import os
import sys
import urllib.request
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from flask import Flask, render_template, request, redirect


ic = Flask(__name__)

@ic.route("/")
def main():
    """Main page of the crawler.

    Returns:
        Content of the HTML.
    """
    return render_template("index.html")


@ic.route("/get_image_urls", methods=['POST'])
def get_image_urls():
    """Get a list of image URLs from the provided URL.
    POST Parameters:
        inputURL: URL to be crawled from.
    Returns:
        SOAP of URLs.
    """
    _url = request.form['inputURL']
    try:
        src="" # The list of image URLs

        # Go to the URL and download the webpage.
        code = requests.get(_url)
        text = code.text
        soup = BeautifulSoup(text)

        # Find all img tags and obtain the URLs.
        for img in soup.findAll('img'):

            if (img.get('src'))[0:4] == 'http':
                src = src + ";" + img.get('src')
            else:
                src = src + ";" + urljoin(_url, img.get('src'))
        return src
    except Exception as error:
        return "-1"

# Initialize Flask framework.
if __name__ == "__main__":
    ic.run()
