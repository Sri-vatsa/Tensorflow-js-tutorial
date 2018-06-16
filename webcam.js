import * as tf from '@tensorflow/tfjs';

/**
 * A class that wraps webcam video elements to capture Tensor4Ds.
 */
export class Webcam {
  /**
   * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
   */
  constructor(webcamElement) {
    this.webcamElement = webcamElement;
  }

  //Convert webcam image into a tensor of shape (1, w, h, c)
  capture() {
    return tf.tidy(() => {
    
      const webcamImage = tf.fromPixels(this.webcamElement);
      const croppedImage = this.cropImage(webcamImage);
      const batchedImage = croppedImage.expandDims(0);

      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
  }

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


}
