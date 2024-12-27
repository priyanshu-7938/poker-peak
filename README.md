# Poker Peak  

Poker Peak is a decentralized poker platform leveraging smart contracts and a responsive server to deliver a seamless gaming experience. The project combines blockchain technology with real-time state management to ensure fair play and transparent state updates.  

## Demo [https://www.youtube.com/watch?v=ZW68b3xDFhk]

## Key Features  

- **Smart Contract-Driven Gameplay**:  
  The core logic of Poker Peak resides in a blockchain-based smart contract running a robust state machine, ensuring integrity and fairness.  

- **Real-Time Server Sync**:  
  A dedicated server listens to the contract, constantly maintaining and syncing the game state locally for low-latency communication with users.  

- **Interactive User Interface**:  
  Players enjoy an interactive experience, with their screens dynamically reflecting the game's current state in real time.  

## Architecture  

1. **Smart Contract**:  
   Handles game rules, player actions, and state transitions on the blockchain.  
   
2. **Server**:  
   - Listens to contract events.  
   - Updates and maintains a local representation of the game's state.  
   - Relays the updated state to connected users.  

3. **Client**:  
   Displays the game state received from the server, allowing users to view and interact with the game seamlessly.  

## Getting Started  

### Prerequisites  

- Node.js (for server and client)  
- Solidity compiler (for contract development)  
- Blockchain environment (e.g., Ethereum, Polygon, or Tron)  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/poker-peak.git  
   cd poker-peak  
   ```  

2. Install dependencies for the server:  
   ```bash  
   cd server  
   npm install  
   ```  

3. Install dependencies for the client:  
   ```bash  
   cd client  
   npm install  
   ```  

4. Compile and deploy the smart contract:  
   Follow the steps in the `contracts` directory's README to deploy the Poker Peak contract to your desired blockchain.  

### Running the Application  

1. Start the server:  
   ```bash  
   cd server  
   npm start  
   ```  

2. Launch the client:  
   ```bash  
   cd client  
   npm start  
   ```  

3. Access the client in your web browser at:  
   ```
   http://localhost:3000  
   ```  

### Testing  

To run tests for the smart contract:  
```bash  
cd contracts  
npm test  
```  

## Contributing  

We welcome contributions! Please fork the repository and submit a pull request.  

## License  

This project is licensed under the MIT License. See the LICENSE file for details.  

## Contact  

For questions, feature requests, or feedback, please email: [priyanshoe.official@gmail.com]  
