export const EIGNEPOD_MANAGER_ADDRESS =
  "0x30770d7E3e71112d7A6b7259542D1f680a70e315";

export const EIGENPOD_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: "contract IETHPOSDeposit",
        name: "_ethPOS",
        type: "address",
      },
      {
        internalType: "contract IBeacon",
        name: "_eigenPodBeacon",
        type: "address",
      },
      {
        internalType: "contract IStrategyManager",
        name: "_strategyManager",
        type: "address",
      },
      { internalType: "contract ISlasher", name: "_slasher", type: "address" },
      {
        internalType: "contract IDelegationManager",
        name: "_delegationManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "podOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BeaconChainETHDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "podOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      { indexed: false, internalType: "uint96", name: "nonce", type: "uint96" },
      {
        indexed: false,
        internalType: "address",
        name: "delegatedAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "withdrawalRoot",
        type: "bytes32",
      },
    ],
    name: "BeaconChainETHWithdrawalCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "podOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "newTotalShares",
        type: "int256",
      },
    ],
    name: "NewTotalShares",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "pauserRegistry",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "PauserRegistrySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "eigenPod",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "podOwner",
        type: "address",
      },
    ],
    name: "PodDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "podOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "sharesDelta",
        type: "int256",
      },
    ],
    name: "PodSharesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPausedStatus",
        type: "uint256",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "podOwner", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "addShares",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "beaconChainETHStrategy",
    outputs: [
      { internalType: "contract IStrategy", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createPod",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delegationManager",
    outputs: [
      {
        internalType: "contract IDelegationManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eigenPodBeacon",
    outputs: [{ internalType: "contract IBeacon", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ethPOS",
    outputs: [
      { internalType: "contract IETHPOSDeposit", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "podOwner", type: "address" }],
    name: "getPod",
    outputs: [
      { internalType: "contract IEigenPod", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "podOwner", type: "address" }],
    name: "hasPod",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
      {
        internalType: "contract IPauserRegistry",
        name: "_pauserRegistry",
        type: "address",
      },
      { internalType: "uint256", name: "_initPausedStatus", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "numPods",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "ownerToPod",
    outputs: [
      { internalType: "contract IEigenPod", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "index", type: "uint8" }],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauserRegistry",
    outputs: [
      { internalType: "contract IPauserRegistry", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "podOwnerShares",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "podOwner", type: "address" },
      { internalType: "int256", name: "sharesDelta", type: "int256" },
    ],
    name: "recordBeaconChainETHBalanceUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "podOwner", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "removeShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPauserRegistry",
        name: "newPauserRegistry",
        type: "address",
      },
    ],
    name: "setPauserRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "slasher",
    outputs: [{ internalType: "contract ISlasher", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "pubkey", type: "bytes" },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "bytes32", name: "depositDataRoot", type: "bytes32" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "strategyManager",
    outputs: [
      { internalType: "contract IStrategyManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newPausedStatus", type: "uint256" },
    ],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "podOwner", type: "address" },
      { internalType: "address", name: "destination", type: "address" },
      { internalType: "uint256", name: "shares", type: "uint256" },
    ],
    name: "withdrawSharesAsTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
