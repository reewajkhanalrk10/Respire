// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PointsContract {
    mapping(address => uint256) public points;

    function setPoints(address account, uint256 newPoints) public {
        require(msg.sender == account, "Only the account owner can set points.");
        points[account] = newPoints;
    }

    function getPoints(address account) public view returns (uint256) {
        return points[account];
    }
}