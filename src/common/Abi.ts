export default [
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128',
      },
      {
        name: 'high',
        type: 'core::integer::u128',
      },
    ],
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token_id',
        type: 'core::integer::u256',
      },
      {
        name: 'value',
        type: 'core::integer::u256',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::integer::u256>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::integer::u256>',
      },
    ],
  },
  {
    type: 'function',
    name: 'batch_burn',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token_ids',
        type: 'core::array::Span::<core::integer::u256>',
      },
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'batchBurn',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'tokenIds',
        type: 'core::array::Span::<core::integer::u256>',
      },
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token_id',
        type: 'core::integer::u256',
      },
      {
        name: 'value',
        type: 'core::integer::u256',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'batch_mint',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'token_ids',
        type: 'core::array::Span::<core::integer::u256>',
      },
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'batchMint',
    inputs: [
      {
        name: 'account',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'tokenIds',
        type: 'core::array::Span::<core::integer::u256>',
      },
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'struct',
    name: 'core::byte_array::ByteArray',
    members: [
      {
        name: 'data',
        type: 'core::array::Array::<core::bytes_31::bytes31>',
      },
      {
        name: 'pending_word',
        type: 'core::felt252',
      },
      {
        name: 'pending_word_len',
        type: 'core::integer::u32',
      },
    ],
  },
  {
    type: 'function',
    name: 'set_base_uri',
    inputs: [
      {
        name: 'base_uri',
        type: 'core::byte_array::ByteArray',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'function',
    name: 'setBaseUri',
    inputs: [
      {
        name: 'baseUri',
        type: 'core::byte_array::ByteArray',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
  {
    type: 'impl',
    name: 'ERC1155MixinImpl',
    interface_name: 'openzeppelin_token::erc1155::interface::ERC1155ABI',
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::starknet::contract_address::ContractAddress>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::starknet::contract_address::ContractAddress>',
      },
    ],
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::felt252>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    type: 'enum',
    name: 'core::bool',
    variants: [
      {
        name: 'False',
        type: '()',
      },
      {
        name: 'True',
        type: '()',
      },
    ],
  },
  {
    type: 'interface',
    name: 'openzeppelin_token::erc1155::interface::ERC1155ABI',
    items: [
      {
        type: 'function',
        name: 'balance_of',
        inputs: [
          {
            name: 'account',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'balance_of_batch',
        inputs: [
          {
            name: 'accounts',
            type: 'core::array::Span::<core::starknet::contract_address::ContractAddress>',
          },
          {
            name: 'token_ids',
            type: 'core::array::Span::<core::integer::u256>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<core::integer::u256>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'safe_transfer_from',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
          {
            name: 'value',
            type: 'core::integer::u256',
          },
          {
            name: 'data',
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'safe_batch_transfer_from',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'token_ids',
            type: 'core::array::Span::<core::integer::u256>',
          },
          {
            name: 'values',
            type: 'core::array::Span::<core::integer::u256>',
          },
          {
            name: 'data',
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'is_approved_for_all',
        inputs: [
          {
            name: 'owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'set_approval_for_all',
        inputs: [
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'approved',
            type: 'core::bool',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'supports_interface',
        inputs: [
          {
            name: 'interface_id',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'uri',
        inputs: [
          {
            name: 'token_id',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::byte_array::ByteArray',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'balanceOf',
        inputs: [
          {
            name: 'account',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'tokenId',
            type: 'core::integer::u256',
          },
        ],
        outputs: [
          {
            type: 'core::integer::u256',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'balanceOfBatch',
        inputs: [
          {
            name: 'accounts',
            type: 'core::array::Span::<core::starknet::contract_address::ContractAddress>',
          },
          {
            name: 'tokenIds',
            type: 'core::array::Span::<core::integer::u256>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Span::<core::integer::u256>',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'safeTransferFrom',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'tokenId',
            type: 'core::integer::u256',
          },
          {
            name: 'value',
            type: 'core::integer::u256',
          },
          {
            name: 'data',
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'safeBatchTransferFrom',
        inputs: [
          {
            name: 'from',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'to',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'tokenIds',
            type: 'core::array::Span::<core::integer::u256>',
          },
          {
            name: 'values',
            type: 'core::array::Span::<core::integer::u256>',
          },
          {
            name: 'data',
            type: 'core::array::Span::<core::felt252>',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'isApprovedForAll',
        inputs: [
          {
            name: 'owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'setApprovalForAll',
        inputs: [
          {
            name: 'operator',
            type: 'core::starknet::contract_address::ContractAddress',
          },
          {
            name: 'approved',
            type: 'core::bool',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'impl',
    name: 'OwnableMixinImpl',
    interface_name: 'openzeppelin_access::ownable::interface::OwnableABI',
  },
  {
    type: 'interface',
    name: 'openzeppelin_access::ownable::interface::OwnableABI',
    items: [
      {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        state_mutability: 'view',
      },
      {
        type: 'function',
        name: 'transfer_ownership',
        inputs: [
          {
            name: 'new_owner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'renounce_ownership',
        inputs: [],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'transferOwnership',
        inputs: [
          {
            name: 'newOwner',
            type: 'core::starknet::contract_address::ContractAddress',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle',
    kind: 'struct',
    members: [
      {
        name: 'operator',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'from',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'to',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'id',
        type: 'core::integer::u256',
        kind: 'data',
      },
      {
        name: 'value',
        type: 'core::integer::u256',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch',
    kind: 'struct',
    members: [
      {
        name: 'operator',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'from',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'to',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'ids',
        type: 'core::array::Span::<core::integer::u256>',
        kind: 'data',
      },
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll',
    kind: 'struct',
    members: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'operator',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'approved',
        type: 'core::bool',
        kind: 'data',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::URI',
    kind: 'struct',
    members: [
      {
        name: 'value',
        type: 'core::byte_array::ByteArray',
        kind: 'data',
      },
      {
        name: 'id',
        type: 'core::integer::u256',
        kind: 'key',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::Event',
    kind: 'enum',
    variants: [
      {
        name: 'TransferSingle',
        type: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle',
        kind: 'nested',
      },
      {
        name: 'TransferBatch',
        type: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch',
        kind: 'nested',
      },
      {
        name: 'ApprovalForAll',
        type: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll',
        kind: 'nested',
      },
      {
        name: 'URI',
        type: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::URI',
        kind: 'nested',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_introspection::src5::SRC5Component::Event',
    kind: 'enum',
    variants: [],
  },
  {
    type: 'event',
    name: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred',
    kind: 'struct',
    members: [
      {
        name: 'previous_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'new_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted',
    kind: 'struct',
    members: [
      {
        name: 'previous_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      {
        name: 'new_owner',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
    ],
  },
  {
    type: 'event',
    name: 'openzeppelin_access::ownable::ownable::OwnableComponent::Event',
    kind: 'enum',
    variants: [
      {
        name: 'OwnershipTransferred',
        type: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred',
        kind: 'nested',
      },
      {
        name: 'OwnershipTransferStarted',
        type: 'openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted',
        kind: 'nested',
      },
    ],
  },
  {
    type: 'event',
    name: 'test_nft::MyToken::Event',
    kind: 'enum',
    variants: [
      {
        name: 'ERC1155Event',
        type: 'openzeppelin_token::erc1155::erc1155::ERC1155Component::Event',
        kind: 'flat',
      },
      {
        name: 'SRC5Event',
        type: 'openzeppelin_introspection::src5::SRC5Component::Event',
        kind: 'flat',
      },
      {
        name: 'OwnableEvent',
        type: 'openzeppelin_access::ownable::ownable::OwnableComponent::Event',
        kind: 'flat',
      },
    ],
  },
] as const;
