# Word Land Route

##### It is an application using word2vec and astar algorithm together

### What if there is a land made of word, where words have their own relevant distance to each other based on their sementic meaning?
<br />
Using Gensim for word2vec(in Python3), and scikit-learn(in Python2) for T-SNE dimension size down, feed the result 2D array json file into P5.js(canvas drawing words), and apply astar algorithm to the word space
<br />


<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/finding_path.gif" width = "640">


### Procedure of making it
<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/procedure.png" width = "640">

### Different result of different text source
* Text source from Dan Shiffman Nature Of Code syllabus

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/NOC_syllabus_words.png" width = "640">

* Text source from interviews I did with my friend at ITP

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/plain_word.png" width = "640">

### It can me specified which word to start and which word to end, but the words have to be in the word pool of the text source

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/start_end.png" width = "640">

### Results varies with different text source

* Source for interview Results

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/sucess.png" width = "640">

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/failure.png" width = "640">

#### Source for NOC syllabus Results
* Start "evolution", End "techniques"

<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/syllabus_s.png" width = "640">

* Start "evolution", End "language"
<img src = "https://github.com/yulicai/NOC_Intelligence-Learning/raw/master/images/w2v/syllabus_f.png" width = "640">
