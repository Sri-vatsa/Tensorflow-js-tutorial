# Tensorflow JS Walkthrough

In this tutorial, we will explore the core concepts of tensorflow's javascript api and implement transfer learning on the client-side.

## Import Tensorflow Js

Refer to [Tensorflow JS Documentation](https://js.tensorflow.org/index.html#getting-started) for more details.

**In Browser**

```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    </head>
</html>

```

**Using npm/yarn**

```
yarn add @tensorflow/tfjs
```
OR

```
npm install @tensorflow/tfjs
```

Inside your project:

```
import * as tf from '@tensorflow/tfjs';
```

**In Node Project**

```
yarn add @tensorflow/tfjs-node
```
OR

```
npm install @tensorflow/tfjs-node
```

Inside your project:
```
const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node'); 

// Set the backend to TensorFlow:
tf.setBackend('tensorflow');
```

---

Once you have successfully imported TensorflowJs into your project, refer to _intro-to-tfjs.html_ for examples on usage.

---

## Transfer Learning

#### webcam.js

Capture camera image function:

```javascript
//Convert webcam image into a tensor of shape (1, w, h, c)
  capture() {
    return tf.tidy(() => {
    
      const webcamImage = tf.fromPixels(this.webcamElement);
      const croppedImage = this.cropImage(webcamImage);
      const batchedImage = croppedImage.expandDims(0);

      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
  }

```

Crop image and adjust video size: (*Image preprocessing*)
```javascript
//secondary function to crop the centre of rectangular image from webcam
cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

//adjust video size based on your webcam, allowing for cropping of images 
adjustVideoSize(width, height) {
    const aspectRatio = width / height;
    if (width >= height) {
      this.webcamElement.width = aspectRatio * this.webcamElement.height;
    } else if (width < height) {
      this.webcamElement.height = this.webcamElement.width / aspectRatio;
    }
  }
```

Setup webcam class:

```javascript
async setup() {
    return new Promise((resolve, reject) => {
      const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia ||
          navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
          navigatorAny.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
            {video: true},
            stream => {
              this.webcamElement.srcObject = stream;
              this.webcamElement.addEventListener('loadeddata', async () => {
                this.adjustVideoSize(
                    this.webcamElement.videoWidth,
                    this.webcamElement.videoHeight);
                resolve();
              }, false);
            },
            error => {
              reject();
            });
      } else {
        reject();
      }
    });
  }
```
---

#### index.js

Load mobilenet:

```javascript
async function loadMobilenet() {
  //Load mobilenet
  const mobilenet = await tf.loadModel(
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({
    inputs: mobilenet.inputs,
    outputs: layer.output
  });
}
```

Transfer Learning:
```javascript
model = tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      tf.layers.flatten({inputShape: [7, 7, 256]}),
      // Layer 1
      tf.layers.dense({
        units: ui.getDenseUnits(),
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
        useBias: true
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: NUM_CLASSES,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax'
      })
    ]
  });


```


---

#### controller_dataset.js

Add an example:

```javascript

// Adds an example to the controller dataset.
  addExample(example, label) {
    
    // Encode the labels to which we are adding the samples to
    const y = tf.tidy(
        () => tf.oneHot(tf.tensor1d([label]).toInt(), this.numClasses));

    if (this.xs == null) {
      // For the first example that gets added, keep example and y so that the
      // ControllerDataset owns the memory of the inputs. This makes sure that
      // if addExample() is called in a tf.tidy(), these Tensors will not get
      // disposed.
      this.xs = tf.keep(example);
      this.ys = tf.keep(y);
    } else {
      const oldX = this.xs;
      this.xs = tf.keep(oldX.concat(example, 0));

      const oldY = this.ys;
      this.ys = tf.keep(oldY.concat(y, 0));

      oldX.dispose();
      oldY.dispose();
      y.dispose();
    }
  } 

```

## Run Project

To run the complete demo or your nodejs application with tensorflow js, follow the steps below:

**yarn**

install dependencies:
```
yarn
```

run local server:
```
yarn watch
```

**npm**
install dependencies:
```
npm install
```
run local server:
```
npm start
```

## License

This project is licensed under the MIT License

## Acknowledgments

* Tensorflow JS
* Python
* Google
* BANDAI NAMCO Entertainment Inc
 