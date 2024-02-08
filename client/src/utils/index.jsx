
export const topTypeOptions = [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart"
  ];

export const accessoriesTypeOptions = [
  "Blank",
  "Kurt",
  "Prescription01",
  "Prescription02",
  "Round",
  "Sunglasses",
  "Wayfarers"
];

export const facialHairTypeOptions = [
  "Blank",
  "BeardMedium",
  "BeardLight",
  "BeardMagestic",
  "MoustacheFancy",
  "MoustacheMagnum"
];

export const facialHairColorOptions = [
  "Auburn",
  "Black",
  "Blonde",
  "BlondeGolden",
  "Brown",
  "BrownDark",
  "Platinum",
  "Red"
];

export const clotheTypeOptions = [
  "BlazerShirt",
  "BlazerSweater",
  "CollarSweater",
  "GraphicShirt",
  "Hoodie",
  "Overall",
  "ShirtCrewNeck",
  "ShirtScoopNeck",
  "ShirtVNeck"
]

export const eyeTypeOptions = [
  "Close",
  "Cry",
  "Default",
  "Dizzy",
  "EyeRoll",
  "Happy",
  "Hearts",
  "Side",
  "Squint",
  "Surprised",
  "Wink",
  "WinkWacky"
]

export const eyebrowTypeOptions = [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural"
];

export const mouthTypeOptions = [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit"
];

export const skinColorOptions = [
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black"
];

export const hairColorTypes = [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Platinum",
    "Red",
    "SilverGray"
];

export const hatColorOptions = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White"
];

export const clotheColorOptions = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White"
];
export function getURL(data){
  return `https://avataaars.io/?accessoriesType=${
      accessoriesTypeOptions[parseInt([1]._hex)]
  }&clotheType=${
      clotheTypeOptions[parseInt([3]._hex)]
  }&eyeType=${
      eyeTypeOptions[parseInt([4]._hex)]
  }&eyebrowType=${
      eyebrowTypeOptions[parseInt([5]._hex)]
  }&facialHairType=${
      facialHairTypeOptions[parseInt([2]._hex)]
  }&hairColor=${
      hairColorTypes[parseInt([8]._hex)]
  }&mouthType=${
      mouthTypeOptions[parseInt([6]._hex)]
  }&skinColor=${
      skinColorOptions[parseInt([7]._hex)]
  }&topType=${
      topTypeOptions[parseInt([0]._hex)]
  }`;

}
export const CONTRACTABI = [
    {
      "type": "constructor",
      "name": "",
      "inputs": [
        {
          "type": "address",
          "name": "_server",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "_initialBet",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "RandomNumberGenerated",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "randomNumber",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StateDiscloser",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "uint8",
          "name": "stateTransitationTo",
          "indexed": false,
          "internalType": "enum PokerRoom.GameState"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserFoldedWithReason",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "foldAddress",
          "indexed": false,
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "reason",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "WithdrawalRequested",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "airnode",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "sponsorWallet",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "betCalled",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "callerAddress",
          "indexed": false,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "currentPot",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "nextUser",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "betRaised",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "raisersAddress",
          "indexed": false,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "raisedTo",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "currentPot",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "nextUser",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "deckPost",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "string[]",
          "name": "cards17",
          "indexed": false,
          "internalType": "string[]"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "pKeyExposed",
      "inputs": [
        {
          "type": "uint8",
          "name": "emitCode",
          "indexed": false,
          "internalType": "uint8"
        },
        {
          "type": "uint256",
          "name": "createdOn",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "address",
          "name": "createdBy",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "nonce",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "privateKey",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "APPLIEDFORRANDOMNUMBERGENERATION",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "GENERATEDRANDOMNUMBER",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "GenerateRandomNumber",
      "inputs": [
        {
          "type": "address",
          "name": "_sponsorWallet",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "ISDECKCREATED",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ISNUMBERGENERATED",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ISPRIVATEKEYEXPOSED",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ISROOTDECKPUBLISHED",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "PRIVATEKEYTODECODECARDS",
      "inputs": [],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "Users",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "userAddress",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "publicKey",
          "internalType": "string"
        },
        {
          "type": "bool",
          "name": "isFolded",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "_airnodeRrp",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "airnode",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "airnodeRrp",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "contract IAirnodeRrpV0"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "backDoor",
      "inputs": [
        {
          "type": "address",
          "name": "_to",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "callBet",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "currentBet",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "endpointIdUint256",
      "inputs": [],
      "outputs": [
        {
          "type": "bytes32",
          "name": "",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "expectedUserAddress",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "fold",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "foldUser",
      "inputs": [
        {
          "type": "string",
          "name": "_reason",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "_Address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "gameDeck",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "gameInit",
      "inputs": [
        {
          "type": "tuple[]",
          "name": "users",
          "components": [
            {
              "type": "address",
              "name": "userAddress",
              "internalType": "address"
            },
            {
              "type": "string",
              "name": "publicKey",
              "internalType": "string"
            },
            {
              "type": "bool",
              "name": "isFolded",
              "internalType": "bool"
            }
          ],
          "internalType": "struct PokerRoom.userData[]"
        }
      ],
      "outputs": [
        {
          "type": "tuple",
          "name": "",
          "components": [
            {
              "type": "address",
              "name": "userAddress",
              "internalType": "address"
            },
            {
              "type": "string",
              "name": "publicKey",
              "internalType": "string"
            },
            {
              "type": "bool",
              "name": "isFolded",
              "internalType": "bool"
            }
          ],
          "internalType": "struct PokerRoom.userData"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "hardResetWithCleanup",
      "inputs": [
        {
          "type": "address",
          "name": "_winner",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "initialDeck",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "logRandomNumberGeneration",
      "inputs": [
        {
          "type": "bytes32",
          "name": "requestId",
          "internalType": "bytes32"
        },
        {
          "type": "bytes",
          "name": "data",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "pooledAmount",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "raiseBet",
      "inputs": [
        {
          "type": "uint256",
          "name": "raiseTo",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "server",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "shuffleDeck",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "sponsorWallet",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "stateDefiner",
      "inputs": [],
      "outputs": [
        {
          "type": "uint8",
          "name": "",
          "internalType": "enum PokerRoom.GameState"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "theDeckCreated",
      "inputs": [],
      "outputs": [
        {
          "type": "bool",
          "name": "",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "uploadEncriptedDeck",
      "inputs": [
        {
          "type": "string[]",
          "name": "_deck",
          "internalType": "string[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "uploadPrivateKey",
      "inputs": [
        {
          "type": "string",
          "name": "_privatekey",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "value",
      "inputs": [],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    }
  ];