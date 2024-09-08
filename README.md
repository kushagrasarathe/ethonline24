# Tesseract
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ScRy6JfgrpQ/0.jpg)](https://www.youtube.com/watch?v=ScRy6JfgrpQ)
## Project Description
With tesseract, users can simply re-stake native ETH without getting involved in the complex process of running a validator and juggling around multiple process to provide economic security to the ETH ecosystem and the same time being able to earn rewards

User don't need to run a validator for staking, worry about it's liveness and slashing of their stake. They can setup re-staking in just 5 clicks and earn rewards from Eigen layer for their restaked ETH without getting involved in the complex tech.

### How it works :
- Create a eigenpod address
- Generate a keystore using official ethereum-staking-cli
- Create a cluster of operators from SSV Network
- Distribute your keys to the cluster and pay fee
- Deposit ETH to beacon chain
- Once the deposit if processed on the Beacon chain in about 24 hours, users can put it on restake from Eigenlayer dashboard and complete the process simply.

## How it's Made
We are using SSV Network and Eigenlayer to setup the whole process for demo purpose on the holesky testnet.

The operators of the SSV network are the ones running Ethereum validators on users behalf in exchange of a fee in the SSV tokens for a certain period of time. It uses the Secret Shared Validator (SSV) technology to distribute the key shares among operators and using BLS signatures to create validator signature. This was implemented using the "ssv-keys" SDK , SSV APIs and network contracts to handle the distribution of keys and registering a validator.

Furthermore, EigenLayer monitors and manages the balance and the withdrawal status using the EigenPOD which was created by the user using the "EigenPODManager.sol" and is the withdrawal address of the validator setup. This allows users to re stake their Native ETH and at the same time being able to earn rewards from EigenLayer as well.

The deposit of 32 ETH is processed using the official beacon chain deposit contract on holesky. The key generation is currently done totally client side by the official CLI from ethereum but can be done with GUI as well.

The whole process is done on the client side with no data or private info being leaked from our frontend interface developed using Next.js, Typescript, React-Query, Redux, Tailwind CSS, ShadCN UI & rainbowkit. Viem and wagmi are being used to handle the contract interactions as well.

## Team
- [Kushagra Sarathe](https://bento.me/kushagrasarathe) - Frontend Developer 
- [Dhruv Agarwal](https://bento.me/0xdhruv) - Backend Developer 
