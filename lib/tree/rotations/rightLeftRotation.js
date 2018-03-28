/**
 * datastructures-js/tree/rotations/RightLeftRotation
 * @class
 * Right-Left Rotation Strategy
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class RightLeftRotation {

  /**
   * @constructor
   * @param {RightRotation}
   * @param {LeftRotation}
   */
  constructor(rightRotation, leftRotation) {
    this._rightRotation = rightRotation;
    this._leftRotation = leftRotation;
  }

  /**
   * @internal
   * performs a right rotation of the right node then a left rotation of the node
   * @param {BinaryNode} - the node to be rotated
   */
  rotate(node) {
    this._rightRotation.rotate(node.getRight());
    this._leftRotation.rotate(node);
  }

}

module.exports = RightLeftRotation;