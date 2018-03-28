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
  constructor(AvlNode, rotationsFactory) {
    super(AvlNode);
    this._rotations = rotationsFactory.create(this);
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
   * @internal
   * updates the height a node (and its right) that was rotated to left
   * @param {AvlNode}
   */
  updateLeftRotatedNode(node) {
    this._updateHeight(node);
    this._updateHeight(node.getParent());
  }

  /**
   * @internal
   * updates the height a node (and its left) that was rotated to right
   * @param {AvlNode}
   */
  updateRightRotatedNode(node) {
    this._updateHeight(node);
    this._updateHeight(node.getParent());
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
   * rotates a node upon insertion based on its balance to maintain a balanced tree
   * @param {(string|number)} value
   * @param {BinaryNode} [node=root] - starting node
   */
  _balanceInsertion(value, node) {
    this._updateHeight(node);
    let balance = this._calculateBalance(node);
    if (balance > 1 && value < node.getLeft().getValue()) {
      this._rotations.right.rotate(node);
    }
    else if (balance > 1 && value > node.getLeft().getValue()) {
      this._rotations.leftRight.rotate(node);
    }
    else if (balance < -1 && value > node.getRight().getValue()) {
      this._rotations.left.rotate(node);
    }
    else if (balance < -1 && value < node.getRight().getValue()) {
      this._rotations.rightLeft.rotate(node);
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
      this._rotations.right.rotate(node);
    }
    else if (balance > 1 && child.getRight() !== null) {
      this._rotations.leftRight.rotate(node);
    }
    else if (balance < -1 && child.getRight() !== null) {
      this._rotations.left.rotate(node);
    }
    else if (balance < -1 && child.getLeft() !== null) {
     this._rotations.rightLeft.rotate(node);
    }
  }

}

module.exports = AvlTree;