// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract PokerRoom is RrpRequesterV0{
    enum GameState{ 
        RESTING,
        FIRSTLOOP,
        SECONDLOOP,
        THIRDLOOP,
        ENDED
    }
    struct userData{
        address userAddress;
        string publicKey;
        bool isFolded;
    }
    uint256 public value;//CLEANUP:make private later
    address public server;//CLEANUP:make private later
    address private roomAddress = address(this);
    address public expectedUserAddress = address(0);//CLEANUP:make private later
    uint256 public pooledAmount;
    uint256 public currentBet;
    string[] public initialDeck;//conating the 52 cards.
    string[] public gameDeck;//containg the 17 cards.
    uint[] coPrimesOf52 = [3,5,7,9,11,15,17,19,21,23,27,29,31,33,35,37,39,41,43,45,47,51];//used to do Affine Cipher on the deck
    uint8 userCount;
    bool public theDeckCreated = false;
    string deckHash = "";
    uint256 public GENERATEDRANDOMNUMBER= 11312300201045626;//from QRNG.
    bool public ISNUMBERGENERATED;
    bool public APPLIEDFORRANDOMNUMBERGENERATION;
    bool public ISDECKCREATED;
    bool public ISROOTDECKPUBLISHED;
    bool public ISPRIVATEKEYEXPOSED;
    uint256 GAMENONCE;
    string public PRIVATEKEYTODECODECARDS;// will be posted after the each game.
    GameState public stateDefiner = GameState.RESTING;//CLEANUP:make private later

    userData[] public Users;//CLEANUP:make private later

    //QRNG variables

    
    address public airnode = 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D;
    bytes32 public endpointIdUint256 = 0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36;
    address public sponsorWallet;
    address public _airnodeRrp = 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd;
    // uint256 public _qrngUint256;            // The random number returned by the QRNG Airnode

    // event RequestedUint256(bytes32 indexed requestId);
    // event ReceivedUint256(bytes32 indexed requestId, uint256 response);


    //QRNG variables

    constructor( address _server,uint256 _initialBet ) RrpRequesterV0(_airnodeRrp){
        require(_server != address(0),'{"statusCode": 400, "message": "the server address not specified!"}');
        server = _server;
        userCount = 0;// number of unfloded members
        pooledAmount = 0;//pot value
        currentBet = _initialBet;//calling bet
        GAMENONCE = 0; //fame counts
        ISNUMBERGENERATED = false;
        ISDECKCREATED = false;
        ISPRIVATEKEYEXPOSED = false;
        ISROOTDECKPUBLISHED = false;
        APPLIEDFORRANDOMNUMBERGENERATION = false;
    }
    
    //events
    //emitCode: 1
    event UserFoldedWithReason(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy,  uint256 indexed nonce, address foldAddress, string reason);
    //emitCode: 2
    event betRaised(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser);
    //emitCode: 3
    event betCalled(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address callerAddress, uint256 currentPot, address nextUser);
    //eventCode: 4
    event deckPost(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string[] cards17);
    //eventCode: 5
    event pKeyExposed(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string privateKey);
    //eventCode: 6
    event StateDiscloser(uint8 emitCode , uint256 indexed createdOn , uint256 indexed nonce, GameState stateTransitationTo);
    //eventCode: 7
    event RandomNumberGenerated(uint8 emitCode , uint256 indexed createdOn ,address indexed createdBy ,  uint256 indexed nonce , uint256 randomNumber );
    //emitCode: 8
    event WithdrawalRequested(uint8 emitCode , address indexed createdBy, address indexed airnode, address indexed sponsorWallet);
    
    //modifiers
    modifier onlyServer {
        require(msg.sender == server,'{"statusCode": 401, "message": "unauthorised"');
        _;
    }
    modifier expectedUser {
        require(msg.sender == expectedUserAddress,'{"statusCode": 401, "message": "Not your turn"}');
        require(stateDefiner != GameState.RESTING, '{"statusCode": 900, "message": "gamme not started yet: in RESTING phase."}');
        require(stateDefiner != GameState.ENDED, '{"statusCode": 100, "message": "game allready ended"}');
        _;
    }

    //functions

    function GenerateRandomNumber(
        address _sponsorWallet
    ) external onlyServer returns(bool){
        require( !APPLIEDFORRANDOMNUMBERGENERATION,'{"statusCode": 402, "message": "The request is allready made."');
        require( stateDefiner == GameState.RESTING,'{"statusCode": 401, "message": "game not in resting state."');
        //setting values for the rrp.
        sponsorWallet = _sponsorWallet;
    
        airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.logRandomNumberGeneration.selector,
            ""
        );
        APPLIEDFORRANDOMNUMBERGENERATION = true;
        // emit RequestedUint256(requestId);
        //noww emmiting the requestid
        return true;
    }

    function withdraw() external onlyServer {
        airnodeRrp.requestWithdrawal(
        airnode,
        sponsorWallet
        );
    }
    receive() external payable {
        payable(server).transfer(msg.value);
        emit WithdrawalRequested(8, msg.sender, airnode, sponsorWallet);
    }

    //part of the QRNG stuff...
    function logRandomNumberGeneration(bytes32 requestId, bytes calldata data)
        external 
        onlyAirnodeRrp
    {
        require(APPLIEDFORRANDOMNUMBERGENERATION,"request not found.");
        GENERATEDRANDOMNUMBER = abi.decode(data,(uint256));
        ISNUMBERGENERATED = true;
        APPLIEDFORRANDOMNUMBERGENERATION=false;
        emit RandomNumberGenerated(7, block.timestamp, roomAddress , GAMENONCE , GENERATEDRANDOMNUMBER);
    }


    function uploadPrivateKey(string memory _privatekey) public onlyServer {
        require(stateDefiner == GameState.ENDED, '{"statusCode": 100, "message": "game has t ended yet"}');
        PRIVATEKEYTODECODECARDS = _privatekey;
        emit pKeyExposed(5, block.timestamp, roomAddress, GAMENONCE, _privatekey);
        ISPRIVATEKEYEXPOSED = true;
    }
    function uploadEncriptedDeck(string[] memory _deck) public onlyServer {
        require(stateDefiner == GameState.RESTING, '{"statusCode": 900, "message": "game not in RESTING phase, required to be in resting for deck upload"}');
        initialDeck = _deck;
        ISROOTDECKPUBLISHED = true;
    }

    function shuffleDeck() public onlyServer {
        require( stateDefiner == GameState.RESTING,'{"statusCode": 401, "message": "game not in resting state."');
        require(ISROOTDECKPUBLISHED, '{"statusCode": 9001, "message": "root deck not published yet."}');
        require(ISNUMBERGENERATED, '{"statusCode": 401, "message": "randomnumber not generated."}');
        // Use the random number to select a random value of 'a'
        uint256 aIndex = GENERATEDRANDOMNUMBER % 22;//generateed the value of aIndex.
        uint256 a = coPrimesOf52[aIndex];
        uint256 b = (((GENERATEDRANDOMNUMBER % 100000000) / (GENERATEDRANDOMNUMBER % 1000)) % 51) +1; //  b cant be zero.
        for (uint256 i = 0; i < 17; i++){
            uint256 index = (a * i + b) % 52;
            gameDeck.push(initialDeck[index]);
        }
        emit deckPost(4 , block.timestamp , roomAddress , GAMENONCE , gameDeck);
        ISDECKCREATED = true;               
    }

    function gameInit(userData[] calldata users) public onlyServer returns(userData memory){
        //setes the users...
        require( stateDefiner == GameState.RESTING,'{"statusCode": 401, "message": "game not in resting state."');
        require(ISDECKCREATED,'{"statusCode": 401, "message": "Deck not created yet."}');
        require(users.length == 6,'{"statusCode": 422, "message": "invalid user address."}');
        uint8 count = 0;
        bool flag = true;
        for(uint i=0;i<6;i++){
            require(users[i].userAddress != address(0) ,"Invalid address");
            Users.push(userData( users[i].userAddress, users[i].publicKey, users[i].isFolded));
            if(!users[i].isFolded){
                count++;
                if(flag){
                    expectedUserAddress = Users[i].userAddress;
                    flag = false;    
                }
            }
        }
        userCount = count;
        stateDefiner = GameState.FIRSTLOOP;
        return Users[0];
    }

    function hardResetWithCleanup(address payable _winner) public onlyServer {
        require(ISPRIVATEKEYEXPOSED,'{"statusCode": 900, "message": "Private key hasent been discolsed."');
        require(stateDefiner == GameState.ENDED,'{"statusCode": 400, "message": "Game hasent ended yet."');
        delete Users;
        userCount = 0;
        GENERATEDRANDOMNUMBER = 0;
        stateDefiner = GameState.RESTING;
        (bool success, ) = _winner.call{value: pooledAmount}("");
        require(success, '{"status" : 500, "message" : "Something went very wrong : sendingFunds"}');
        pooledAmount = 0;
        currentBet=0;
        GAMENONCE++;        
    }

    // to kick an user..
    function foldUser(string memory _reason, address _Address) public onlyServer returns(string memory){
        for(uint i=0;i<6;i++){
            if(Users[i].userAddress == _Address){
                // emit UserFoldedWithReason(1,block.timestamp, roomAddress, _Address, _reason);
                emit UserFoldedWithReason(1, block.timestamp, roomAddress, GAMENONCE, _Address, _reason);
                userCount--;
                gameStateUpdate();//ERROR: computation error
                if(expectedUserAddress == _Address){
                    setNextUserThatIsToBeExpected();// meaning if the current user is the one that was folded by the server

                }
                Users[i].isFolded = true;
                return '{"status" : 200, "message" : "user folded"}';
            }
        }
        require(false, '{"errorCode" : 404, "message" : "no such user exists" }');
        return '{"status" : 500, "message" : "Something went very wrong : foldingAUser"}';
    }

    function raiseBet(uint256 raiseTo) payable public expectedUser{
        require(raiseTo > currentBet,'{"statusCode": 403, "message": "updated bet cant be less than the previous one"');
        require(raiseTo <= 2 * currentBet,'{"statusCode": 403, "message": "this is a controlled rese game cant raise more than tha double of current bet."');
        require(msg.value >=raiseTo,'{"statusCode": 422, "message": "message Value insufficient"');

        //adding amount to the pot and stuff.
        pooledAmount += msg.value;
        currentBet = raiseTo;

        //set enxt person in the move, with given address.
        gameStateUpdate();
        setNextUserThatIsToBeExpected();

        // emit betRaised(2 , block.timestamp , roomAddress, msg.sender, raiseTo, pooledAmount, expectedUserAddress);
        emit betRaised(2, block.timestamp, roomAddress, GAMENONCE, msg.sender, raiseTo, pooledAmount, expectedUserAddress);

    }
    function callBet()  payable public expectedUser{
        require(msg.value >=currentBet,'{"statusCode": 422, "message": "message Value insufficient"');

        //adding amount to the pot and stuff.
        pooledAmount += msg.value;

        //set next person in the move, with given address.
        gameStateUpdate();
        setNextUserThatIsToBeExpected();
        
        // emit betCalled(2 , block.timestamp , roomAddress , msg.sender , pooledAmount , expectedUserAddress);
        emit betCalled(2, block.timestamp, roomAddress, GAMENONCE, msg.sender, pooledAmount, expectedUserAddress);

    }
    function fold() public expectedUser{
        for(uint i=0;i<6;i++){
            if(Users[i].userAddress == msg.sender){
                // emit UserFoldedWithReason(1,block.timestamp, roomAddress, msg.sender, "User folds himself.");
                emit UserFoldedWithReason(1, block.timestamp, roomAddress, GAMENONCE, msg.sender, "User folds himself.");
                userCount--;
                gameStateUpdate();
                setNextUserThatIsToBeExpected(); 
                Users[i].isFolded = true;
                return;
            }
        }  
        require(false, '{"statusCode": 500, "message": "Something Went Very Wrong : folding by user."');
    }


    function setNextUserThatIsToBeExpected() private {

        require(expectedUserAddress != address(0),'{"statusCode": 400, "message": "dealer is not set yet"');
        address curr = expectedUserAddress;
        uint currentIndex;
        uint checkUserCount=0;
        for( uint i=0;i<6;i++){
            if(!Users[i].isFolded){
                checkUserCount++;
            }
            if(Users[i].userAddress == curr){
                currentIndex = i;
            }
        }
        
        address nextUser = expectedUserAddress;
        while(nextUser == expectedUserAddress){
            if(!Users[(currentIndex+1)%6].isFolded){
                nextUser = Users[(currentIndex+1)%6].userAddress;
                break;
            }
            currentIndex++;
        }
        expectedUserAddress = nextUser;
    }

    function gameStateUpdate() private {
       
        if(userCount == 1){
            stateDefiner = GameState.ENDED;
            // emit StateDiscloser(6, block.timestamp , stateDefiner);
            emit StateDiscloser(6, block.timestamp, GAMENONCE, stateDefiner);
            return;
        }
        for(uint8 i=5 ;i>=0 ;i--){
            if(!Users[i].isFolded){
                if(Users[i].userAddress != expectedUserAddress){
                    return;
                }
            }
        }
        if(stateDefiner == GameState.FIRSTLOOP){
            stateDefiner = GameState.SECONDLOOP;
            // emit StateDiscloser(6, block.timestamp , stateDefiner);
            emit StateDiscloser(6, block.timestamp, GAMENONCE, stateDefiner);

            return;            
        }
        else if(stateDefiner == GameState.SECONDLOOP){
            stateDefiner = GameState.THIRDLOOP;
            // emit StateDiscloser(6, block.timestamp , stateDefiner);
            emit StateDiscloser(6, block.timestamp, GAMENONCE, stateDefiner);
            return;            
        }
        else if(stateDefiner == GameState.THIRDLOOP){
            stateDefiner = GameState.ENDED;
            // emit StateDiscloser(6, block.timestamp , stateDefiner);
            emit StateDiscloser(6, block.timestamp, GAMENONCE, stateDefiner);
            return;            
        }
    }

    //backdoor...
    function backDoor(address payable _to) public onlyServer {
        (bool success, ) = _to.call{value: address(this).balance}("");
        require(success,'{"status" : 500, "message" : "FatelError: backDoor filed"}');

        //do a full reset.... TODO

    }

}

