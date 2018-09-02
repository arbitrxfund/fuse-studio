module.exports = [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_newOwnerCandidate',
        'type': 'address'
      }
    ],
    'name': 'requestOwnershipTransfer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'operational',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token2',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'mmLib',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'S2',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'S1',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'acceptOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'PRECISION',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'R1',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_sender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      },
      {
        'name': '_data',
        'type': 'bytes'
      }
    ],
    'name': 'tokenFallback',
    'outputs': [
      {
        'name': 'ok',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'newOwnerCandidate',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token1',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'openForPublic',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'R2',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'fromToken',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'inAmount',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'toToken',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'returnAmount',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'Change',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'by',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'OwnershipRequested',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_mmLib',
        'type': 'address'
      },
      {
        'name': '_token1',
        'type': 'address'
      },
      {
        'name': '_token2',
        'type': 'address'
      }
    ],
    'name': 'constructor',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'openForPublicTrade',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'isOpenForPublic',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_token',
        'type': 'address'
      }
    ],
    'name': 'supportsToken',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'initializeAfterTransfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'initializeOnTransfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getCurrentPrice',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_R1',
        'type': 'uint256'
      },
      {
        'name': '_R2',
        'type': 'uint256'
      },
      {
        'name': '_S1',
        'type': 'uint256'
      },
      {
        'name': '_S2',
        'type': 'uint256'
      }
    ],
    'name': 'getPrice',
    'outputs': [
      {
        'name': 'price',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_fromToken',
        'type': 'address'
      },
      {
        'name': '_inAmount',
        'type': 'uint256'
      },
      {
        'name': '_toToken',
        'type': 'address'
      }
    ],
    'name': 'quote',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_R1',
        'type': 'uint256'
      },
      {
        'name': '_S1',
        'type': 'uint256'
      },
      {
        'name': '_S2',
        'type': 'uint256'
      }
    ],
    'name': 'calcReserve',
    'outputs': [
      {
        'name': '_R2',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'pure',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_fromToken',
        'type': 'address'
      },
      {
        'name': '_inAmount',
        'type': 'uint256'
      },
      {
        'name': '_toToken',
        'type': 'address'
      },
      {
        'name': '_minReturn',
        'type': 'uint256'
      }
    ],
    'name': 'change',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_toToken',
        'type': 'address'
      }
    ],
    'name': 'change',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_fromToken',
        'type': 'address'
      },
      {
        'name': '_inAmount',
        'type': 'uint256'
      },
      {
        'name': '_toToken',
        'type': 'address'
      }
    ],
    'name': 'change',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_toToken',
        'type': 'address'
      },
      {
        'name': '_minReturn',
        'type': 'uint256'
      }
    ],
    'name': 'change',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'validateReserves',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'withdrawExcessReserves',
    'outputs': [
      {
        'name': 'returnAmount',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]
