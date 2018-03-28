/**
 * datastructures-js/tree/rotations/LeftRightRotation
 * @class
 * Left-Right Rotation Strategy
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class LeftRightRotation {

  /**
   * @internal
   * @param {LeftRotation}
   * @param {RightRotation}
   */
  constructor(leftRotation, rightRotation) {
    this._leftRotation = leftRotation;
    this._rightRotation = rightRotation;
  }

  /**
   * @internal
   * performs a left rotation of the left node then a right rotation of the node
   * @param {BinaryNode} - the node to be rotated
   */
  rotate(node) {
    this._leftRotation.rotate(node.getLeft());
    this._rightRotation.rotate(node);
  }

}

module.exports = LeftRightRotation;