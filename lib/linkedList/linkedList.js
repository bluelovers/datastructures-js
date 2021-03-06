/**
 * datastructures-js/linkedList/LinkedList
 * @class
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const LinkedListNode = require('./linkedListNode');

class LinkedList {

  /**
   * @constructor
   */
  constructor() {
    this._init();
  }

  /**
   * @public
   * gets the head of the linkedList
   * @returns {LinkedListNode|null}
   */
  head() {
    return this._headNode;
  }

  /**
   * @public
   * gets the length of the linkedList
   * @returns {number}
   */
  length() {
    return this._count;
  }

  /**
   * @public
   * finds a node in the linkedList by a given value
   * @param {(string|number|boolean|null|undefined)} value
   * @param {LinkedListNode} [current=head] memoise current node
   * @returns {LinkedListNode|null}
   */
  find(value, current = this._headNode) {
    if (current === null) {
      return null;
    }
    else if (current.getValue() === value) {
      return current;
    }
    else {
      return this.find(value, current.getNext());
    }
  }

  /**
   * @public
   * adds a new node to the beginning of the linkedList
   * @param {(string|number|boolean|null|undefined)} value
   */
  addFirst(value) {
    if (this._headNode === null) {
      this._headNode = new LinkedListNode(value);
    }
    else {
      this._headNode = new LinkedListNode(value, this._headNode);
    }
    this._count++;
  }

  /**
   * @public
   * adds a new node at the end of the linkedList
   * @param {(string|number|boolean|null|undefined)} value
   * @param {LinkedListNode} [lastNode=head] memoizes last node
   */
  addLast(value, lastNode = this._headNode) {
    if (lastNode === null) {
      this._headNode = new LinkedListNode(value);
      this._count++;
    }
    else if (lastNode.getNext() === null) {
      lastNode.setNext(new LinkedListNode(value));
      this._count++;
    }
    else {
      this.addLast(value, lastNode.getNext());
    }
  }

  /**
   * @public
   * adds a new node after an existing node
   * @param {(string|number|boolean|null|undefined)} value - existing node value
   * @param {(string|number|boolean|null|undefined)} newValue - new node value
   * @param {LinkedListNode} [current=head] - memoizes current node
   * @throws {Error} - when value does not exist
   */
  addAfter(value, newValue, current = this._headNode) {
    if (current === null) {
      throw new Error('node ' + value + ' not found');
    }
    else if (current.getValue() === value) {
      let newNode = new LinkedListNode(newValue, current.getNext());
      current.setNext(newNode);
      this._count++;
    }
    else {
      this.addAfter(value, newValue, current.getNext());
    }
  }

  /**
   * @public
   * adds a new node before an existing node
   * @param {(string|number|boolean|null|undefined)} value - existing node value
   * @param {(string|number|boolean|null|undefined)} newValue - new node value
   * @param {LinkedListNode} [prev=null] - memoizes previous node
   * @param {LinkedListNode} [current=head] - memoizes current node
   * @throws {Error} - when value does not exist
   */
  addBefore(value, newValue, prev = null, current = this._headNode) {
    if (current === null) {
      throw new Error('node ' + value + ' not found');
    }
    else {
      this._addBeforeNode(value, newValue, prev, current);
    }
  }

  /**
   * @public
   * removes a node by its value from the linkedlist 
   * @param {(string|number|boolean|null|undefined)} value
   * @param {LinkedListNode} [prev=null] - memoizes previous node
   * @param {LinkedListNode} [current=head] - memoizes current node
   */
  remove(value, prev = null, current = this._headNode) {
    if (current !== null && prev === null && current.getValue() === value) {
      this.removeFirst(value);
    }
    else if (current !== null && prev !== null && current.getValue() === value ) {
      prev.setNext(current.getNext());
      this._count--;
    }
    else if (current !== null) {
      this.remove(value, current, current.getNext());
    }
  }

  /**
   * @public
   * removes the first node
   */
  removeFirst() {
    if (this._headNode !== null) {
      if (this._headNode.getNext() === null ) {
        this._headNode = null;
      }
      else {
        this._headNode = this._headNode.getNext();
      }
      this._count--;
    }
  }

  /**
   * @public
   * removes the last node
   * @param {LinkedListNode} [prev=null] - memoizes previous node
   * @param {LinkedListNode} [current=head] - memoizes current node
   */
  removeLast(prev = null, current = this._headNode) {
    if (current !== null && current.getNext() === null && prev === null) {
      this._headNode = null;
      this._count--;
    }
    else if (current !== null && current.getNext() === null && prev !== null) {
      prev.setNext(null);
      this._count--;
    }
    else if (current !== null) {
      this.removeLast(current, current.getNext());
    }
  }

  /**
   * @public
   * traverse the linkedlist from a starting node to the end
   * @param {function} cb - called with the value of each node
   * @param {LinkedListNode} [current=head] - starting node, default is head
   */
  traverse(cb, current = this._headNode) {
    if (current !== null) {
      cb(current.getValue());
      this.traverse(cb, current.getNext());
    }
  }

  /**
   * @public
   * clears the linkedlist
   */
  clear() {
    this._init();
  }

  /**
   * @private
   * @param {(string|number|boolean|null|undefined)} value
   * @param {(string|number|boolean|null|undefined)} newValue
   * @param {LinkedListNode} prev
   * @param {LinkedListNode} current
   */
  _addBeforeNode(value, newValue, prev, current) {
    if (current.getValue() === value && prev === null) {
      this.addFirst(newValue);
    }
    else if (current.getValue() === value && prev !== null) {
      let newNode = new LinkedListNode(newValue, current);
      prev.setNext(newNode);
      this._count++;
    }
    else {
      this.addBefore(value, newValue, current, current.getNext());
    }
  }

  /**
   * @protected
   * initialize the linkedlist properties
   */
  _init() {
    this._headNode = null;
    this._count = 0;
  }

}

module.exports = LinkedList;