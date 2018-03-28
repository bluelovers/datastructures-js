'use strict';

const LeftRotation = require('./leftRotation');
const RightRotation = require('./rightRotation');
const LeftRightRotation = require('./leftRightRotation');
const RightLeftRotation = require('./rightLeftRotation');

module.exports = {
  create: (tree) => {
    let rs = {};
    rs.left = new LeftRotation(tree);
    rs.right = new RightRotation(tree);
    rs.leftRight = new LeftRightRotation(rs.left, rs.right);
    rs.rightLeft = new RightLeftRotation(rs.right, rs.left);
    return rs;
  }
};