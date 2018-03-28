/**
 * datastructures-js/tree/rotations/RightRotation
 * @class
 * Right Rotation Strategy
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

class RightRotation {

  /**
   * @constructor
   * @param {BinarySearchTree}
   */
  constructor(tree) {
    this._tree = tree;
  }

  /**
   * @internal
   * performs a right rotation of a node (clockwise)
   * @param {BinaryNode} - the node to be rotated
   */
  rotate(node) {
    let parent = node.getParent();
    let left = node.getLeft();
    let leftRight = left.getRight();
    node.setLeft(leftRight);
    left.setRight(node);
    if (node === this._tree.root()) {
      this._tree.setRoot(left);
    }
    else if (parent.getValue() > left.getValue()) {
      parent.setLeft(left);
    }
    else if (parent.getValue() < left.getValue()) {
      parent.setRight(left);
    }
    if (leftRight !== null) {
      leftRight.setParent(node);
    }
    node.setParent(left);
    left.setParent(parent);
    this._tree.updateRightRotatedNode(node);
  }

}

module.exports = RightRotation;