var account;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {

        if(!ethereum.isConnected()) {
            location.reload();
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];

        updateConnected();
    }
}


function loadEth() {
    if (typeof window.ethereum !== 'undefined') {


        ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
            if (accounts[0] !== undefined) {
                account = accounts[0];
                updateConnected();
            }
        });

        ethereum.on('connect', (chain) => {
           // alert(chain.chainId); // this way we can check if we're on the mainnet
        });

        ethereum.on('accountsChanged', (accounts) => {
            if (accounts[0] === undefined) {
                account = undefined;
                updateDisconnected();
            } else {
                account = accounts[0];
                updateConnected();
            }
        });
    }
}

function updateDisconnected() {
    document.getElementById("connect_wallet_menu").innerHTML = "CONNECT WALLET";
    document.getElementById("connect_wallet_menu").style.color = "white";
    document.getElementById("connect_wallet_nav").innerHTML = "Connect Wallet";
    document.getElementById("connect_wallet_nav").style.color = "white";
}

function updateConnected() {
    document.getElementById("connect_wallet_menu").innerHTML = "CONNECTED";
    document.getElementById("connect_wallet_menu").style.color = "lawngreen";
    document.getElementById("connect_wallet_nav").innerHTML = "Connected";
    document.getElementById("connect_wallet_nav").style.color = "lawngreen";
}