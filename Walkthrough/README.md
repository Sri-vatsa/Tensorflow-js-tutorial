# Tensorflow JS Walkthrough

In this tutorial, we will explore the core concepts of tensorflow's javascript api and implement transfer learning on the client-side.

## Import Tensorflow Js

Refer to [Tensorflow JS Documentation](https://js.tensorflow.org/index.html#getting-started) for more details.

**In Browser**

```
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
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Set the backend to TensorFlow:
tf.setBackend('tensorflow');
```

---

Once you have successfully imported TensorflowJs into your project, refer to _intro-to-tfjs.html_ for examples on usage.

---

## Transfer Learning




## License

This project is licensed under the MIT License

## Acknowledgments

* Tensorflow JS
* Python
 