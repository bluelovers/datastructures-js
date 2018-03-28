/**
 * datastructures-js/tree/rotations/LeftRotation
 * @class
 * Left Rotation Strategy
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class LeftRotation {

  /**
   * @constructor
   * @param {BinarySearchTree}
   */
  constructor(tree) {
    this._tree = tree;
  }

  /**
   * @internal
   * performs a left rotation of a node (counter-clockwise)
   * @param {BinaryNode} - the node to be rotated
   */
  rotate(node) {
    let parent = node.getParent();
    let right = node.getRight();
    let rightLeft = right.getLeft();
    node.setRight(rightLeft);
    right.setLeft(node);
    if (node === this._tree.root()) {
      this._tree.setRoot(right);
    }
    else if (parent.getValue() < right.getValue()) {
      parent.setRight(right);
    }
    else if (parent.getValue() > right.getValue()) {
      parent.setLeft(right);
    }
    if (rightLeft !== null) {
      rightLeft.setParent(node);
    }
    node.setParent(right);
    right.setParent(parent);
    this._tree.updateLeftRotatedNode(node);
  }

}

module.exports = LeftRotation;