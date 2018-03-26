/**
 * datastructures-js/tree/AvlTree
 * @class
 * @extends BinarySearchTree
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const BinarySearchTree = require('./binarySearchTree');

class AvlTree extends BinarySearchTree {

  /**
   * @constructor
   * @param {function} AvlNode
   */
  constructor(AvlNode) {
    super(AvlNode);
  }

  /**
   * @public
   * inserts a value into the tree and balances the tree
   * @override
   * @param {(string|number)} value
   * @param {BinaryNode} [node=root] - starting node
   */
  insert(value, node = this._rootNode) {
    super.insert(value, node);
    this._balanceInsertion(value, node);
  }

  /**
   * @public
   * removes a value from the tree and balances the tree
   * @override
   * @param {(string|number)} value
   * @param {BinaryNode} [node=root] - starting node
   */
  remove(value, node = this._rootNode) {
    super.remove(value, node);
    this._balanceRemoval(node);
  }

  /**
   * @private
   * gets the height if a node
   * @returns {number}
   */
  _height(node) {
    return (node && node.getHeight()) || 0;
  }

  /**
   * @private
   * calculates the balance of a node
   * @returns {number}
   */
  _calculateBalance(node) {
    if (node !== null) {
      return this._height(node.getLeft()) - this._height(node.getRight());
    }
    else {
      return 0;
    }
  }

  /**
   * @private
   * updates the height of the node
   * @param {AvlNode}
   */
  _updateHeight(node) {
    if (node !== null) {
      let rightHeight = this._height(node.getRight());
      let leftHeight = this._height(node.getLeft());
      node.setHeight(Math.max(rightHeight, leftHeight) + 1);
    }
  }


  /**
   * @private
   * performs a left rotation of a node (counter-clockwise)
   * @param {AvlNode} - the node to be rotated
   */  
  _rotateLeft(node) {
    let parent = node.getParent();
    let right = node.getRight();
    let rightLeft = right.getLeft();
    node.setRight(rightLeft);
    right.setLeft(node);
    if (node === this._rootNode) {
      this._rootNode = right;
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
    this._updateHeight(node);
    this._updateHeight(right);
  }

  /**
   * @private
   * performs a right rotation of a node (clockwise)
   * @param {AvlNode} - the node to be rotated
   */  
  _rotateRight(node) {
    let parent = node.getParent();
    let left = node.getLeft();
    let leftRight = left.getRight();
    node.setLeft(leftRight);
    left.setRight(node);
    if (node === this._rootNode) {
      this._rootNode = left;
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
    this._updateHeight(node);
    this._updateHeight(left);
  }

  /**
   * @private
   * rotates a node upon insertion based on its balance to maintain a balanced tree
   * @param {(string|number)} value
   * @param {BinaryNode} [node=root] - starting node
   */
  _balanceInsertion(value, node) {
    this._updateHeight(node);
    let balance = this._calculateBalance(node);
    if (balance > 1 && value < node.getLeft().getValue()) {
      this._rotateRight(node);
    }
    else if (balance > 1 && value > node.getLeft().getValue()) {
      this._rotateLeft(node.getLeft());
      this._rotateRight(node);
    }
    else if (balance < -1 && value > node.getRight().getValue()) {
      this._rotateLeft(node);
    }
    else if (balance < -1 && value < node.getRight().getValue()) {
      this._rotateRight(node.getRight());
      this._rotateLeft(node);
    }
  }

  /**
   * @private
   * gets the node's child based on balance
   * @param {AvlNode} node
   * @returns {AvlNode} child node
   */
  _getBalanceChild(node) {
    let balance = this._calculateBalance(node);
    if (balance > 1) {
      return node.getLeft();
    }
    else if (balance < -1) {
      return node.getRight();
    }
  }

  /**
   * @private
   * rotates a node upon removal based on its balance to maintain a balanced tree
   * @param {(string|number)} value
   * @param {BinaryNode} [node=root] - starting node
   */
  _balanceRemoval(node) {
    this._updateHeight(node);
    let balance = this._calculateBalance(node);
    let child = this._getBalanceChild(node);
    if (balance > 1 && child.getLeft() !== null) {
      this._rotateRight(node);
    }
    else if (balance > 1 && child.getRight() !== null) {
      this._rotateLeft(child);
      this._rotateRight(node);
    }
    else if (balance < -1 && child.getRight() !== null) {
      this._rotateLeft(node);
    }
    else if (balance < -1 && child.getLeft() !== null) {
      this._rotateRight(child);
      this._rotateLeft(node);
    }
  }

}

module.exports = AvlTree;