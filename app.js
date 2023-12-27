let web3;
let contract;
let userAccount;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initApp();
        } catch (error) {
            console.error("Access to your Ethereum account rejected.");
        }
    } else {
        console.error("Please install MetaMask!");
    }
});

function initApp() {
    const contractAddress = "YOUR_CONTRACT_ADDRESS";
    const contractABI = [] // ABI of your contract

    contract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById("connectWallet").addEventListener("click", async () => {
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        console.log(`Connected account: ${userAccount}`);
    });

    document.getElementById("initialPayment").addEventListener("click", async () => {
        await contract.methods.initialPayment().send({ from: userAccount });
    });

    document.getElementById("setConditionTrue").addEventListener("click", async () => {
        await contract.methods.setCondition(true).send({ from: userAccount });
    });

    document.getElementById("setConditionFalse").addEventListener("click", async () => {
        await contract.methods.setCondition(false).send({ from: userAccount });
    });

    document.getElementById("finalPayment").addEventListener("click", async () => {
        await contract.methods.finalPayment().send({ from: userAccount });
    });
}
