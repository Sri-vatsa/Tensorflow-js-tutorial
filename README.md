# Tensorflow JS Tutorial

In this tutorial, we will explore the core concepts of tensorflow's javascript api and implement transfer learning on the client-side.

## Getting Started

These instructions will get you prepared for the upcoming tensorflow workshop. 

_This guide works best for installation on Mac OS/Linux_

### 1) Software Prerequisites

**Python** 

For python 2.7:
```
$ python --version
```
Make sure you have at least python 2.7.14

Alternatively,for python 3.6:
```
$ python3 --version
```
Make sure you have at least python 3.6.4

If you do not have the aforementioned python versions, check out the [python installation page](https://www.python.org/downloads) to install a more updated version of python.

---

**Pip**

Test pip version:
```
$ pip -V
```
This should echo the version of pip as follows:

```
pip 10.0.1
```
If pip is not recognised as a command, try reinstalling pip from [here](https://pip.pypa.io/en/stable/installing/)

---
**Virtual Environment _(Optional)_**

My recommendation is that you proceed with the following setup in a python virtual environment. This will keep everything neat and simple.

Install virtualenv:
```
$ pip install virtualenv
```
Test virtualenv version:
```
$ virtualenv --version
```

Create a virtual environment for this tutorial:
```
$ cd tfjs-tutorial
$ virtualenv tfjs-tutorial
```
```virtualenv tfjs-tutorial``` will create a folder in the current directory which will contain the Python executable files, and a copy of the pip library which you can use to install other packages. 

To begin using the virtual environment, it needs to be activated:
```
$ source tfjs-tutorial/bin/activate
```

All installations and modifications will be local this virtual environment. 

If you are done working in the virtual environment for the moment, you can deactivate it:
```
$ deactivate
```

For subsequent parts, __do not__ deactivate the virtual environment just yet. Check out this [link](http://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv) for more details on python virtual environments.

---

**Tensorflow.js**

Install tensorflowjs:
```
$ pip install tensorflowjs
```
If successfully installed, you should see:
```
Successfully installed h5py-2.7.1 keras-2.1.4 numpy-1.14.1 scipy-1.1.0 tensorboard-1.7.0 tensorflow-1.7.0 tensorflow-hub-0.1.0 tensorflowjs-0.4.0
```
---

**Node.js**

Install Node.js version 8.9 or higher from [here](https://nodejs.org/en/)

---

**Yarn**

For this tutorial, we will be using Yarn for dependency management. Download Yarn stable 1.7.0 for [MacOS](https://yarnpkg.com/lang/en/docs/install/#mac-stable), [Windows](https://yarnpkg.com/lang/en/docs/install/#windows-stable), [Debian/Ubuntu](https://yarnpkg.com/lang/en/docs/install/#debian-stable), [CentOS/Fedora](https://yarnpkg.com/lang/en/docs/install/#centos-stable) 

---

**Miscellaneous repositories**

* Clone the current repository

```
$ git clone https://github.com/Sri-vatsa/Tensorflow-js-tutorial.git

```

* Clone the tfjs-converter repository _(optional)_

This repository is great to have for converting existing tensorflow models into models that can run on browser.

```
$ git clone https://github.com/tensorflow/tfjs-converter.git
```

---

### 2) Knowledge Prerequisites

I will go through some basic concepts of machine learning, Convolutional Neural Networks(CNN) and core Tensorflow concepts before we start coding.

**Basics of Machine Learning and Deep Learning**

So what is [Machine Learning](https://www.digitalocean.com/community/tutorials/an-introduction-to-machine-learning)?

Even if you do not completely understand all of that it is okay. I will explain it in a bit more detail in person.

If you seem to get what machine learning is, how about get a deeper understanding of what [deep learning](https://machinelearningmastery.com/what-is-deep-learning/) is?

***

**Basics of CNN**

Convolutional Neural Networks are very similar to ordinary Neural Networks: they are made up of neurons that have learnable weights and biases. Each neuron receives some inputs, performs a dot product and optionally follows it with a non-linearity.They have a loss function (e.g. SVM/Softmax) on the last (fully-connected) layer to help achieve what we need from the neural network.

tl;dr its a massive fucntion that takes an image as input and outputs how likely it belongs to a particular pretrained class.

Check out this awesome [link](http://cs231n.github.io/convolutional-networks/) to a Stanford University course on CNNs.

***

**Mobilenet**

MobileNets are based on a streamlined architecture that uses depth-wise separable convolutions to build light weight deep neural networks. If you did not understand a single word in the previous sentence, it is perfectly fine. Just read this [paper](https://arxiv.org/abs/1704.04861).

***

## Contributing

Found more interesting resources to share? Make a PR to this repo and we can all learn.

## License

This project is licensed under the MIT License

## Acknowledgments

* Tensorflow JS
* Python
 