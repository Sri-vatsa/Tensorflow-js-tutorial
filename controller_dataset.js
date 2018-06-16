import * as tf from '@tensorflow/tfjs';

/**
 * A dataset for webcam controls which allows the user to add example Tensors
 * for particular labels. This object will concat them into two large xs and ys.
 */
export class ControllerDataset {
  constructor(numClasses) {
    this.numClasses = numClasses;
  }

  /**
   * Adds an example to the controller dataset.
   * @param {Tensor} example A tensor representing the example. It can be an image,
   *     an activation, or any other type of Tensor.
   * @param {number} label The label of the example. Should be an umber.
   */
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

}