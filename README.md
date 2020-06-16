# Generator Website

## [https://tjruth99.github.io/Generator/](https://tjruth99.github.io/Generator/)

**Tyler Ruth** - _Purdue University Undergrad_ - [tjruth99@gmail.com](mailto:tjruth99@gmail.com)

_Last updated: May 16, 2020_

# Overview

This document outlines the design and purpose of my Generator Website. The purpose of this website is to be a simple to use random generator for use in creative projects. As a musician, I sometimes find it hard to come with ideas for melodies or chord changes and wish there was some way to come up with ideas easily. A random generator can be a powerful tool for sparking creativity.

I wish to design a website that others and myself can use to generate many different types of ideas such as color palettes, chord progressions, and writing prompts. On top of this functionality, I also want to include more trivial generators such as random number generators, color generators, name generators, and also to add functionality for lists such as choosing a random element from a list and randomly sorting a list of elements.

# Setting up the Map Generator API

Currently, the website is configured to send requests to the localhost on port 5000. Here are the steps to get the server up and running

Currently, the website is configured to send requests to the localhost on port 5000. Here are the steps to get the server up and running. Here are the steps to get it running on Windows:

```
    cd /generator/api
    py -3 -m venv venv
    venv\Scripts\activate
```

Libraries:

```
    pip install numpy
    pip install Pillow
    pip install noise
```

After all dependencies are downloaded:

```
    flask run
```

# Generators:

- Number Generator
- Color Palette Generator
- List Randomizer
- Name Generator
- String Generator
- Chord Progression Generator
- Topological Map Generator
- Dungeon Generator

# Technologies

- Front end was build with React and React Bootstrap
- Implemented a basic Flask API for generating random dungeons
- Hosted on GitHub Pages
