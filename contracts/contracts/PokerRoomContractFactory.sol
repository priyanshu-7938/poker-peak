// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PokerRoom.sol";

contract PokerRoomContractFactory {
    struct contractInfo {
        address contractAddress;
        address contractOwner;
        uint256 creationTimestamp;
    }

    mapping( uint256 => contractInfo ) deployedContracts;
    mapping( uint256 => bool ) accuiredRoomId;

    function createPokerRoom(uint256 _room_id, uint256 _intialBet) external returns(address){
        require(!accuiredRoomId[_room_id],'{"statusCode": 101, "message": "room id allready accuired."');
        PokerRoom newContract = new PokerRoom(msg.sender, _intialBet);
        contractInfo memory newContractData = contractInfo({
            contractAddress: address(newContract),
            contractOwner: msg.sender,
            creationTimestamp: block.timestamp
        });
        deployedContracts[_room_id]  = (newContractData);
        accuiredRoomId[_room_id] = true;
        return address(newContract);
    }

    function getContractAddressByRoomId(uint256 _room_id) external view returns (address) {
        require(accuiredRoomId[_room_id],'{"statusCode": 101, "message": "room id unused."');
        return deployedContracts[_room_id].contractAddress;
    }
    
}
