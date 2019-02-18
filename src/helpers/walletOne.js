import WalletConnect from "@walletconnect/react-native";

async function getClientMeta() {

    const options = {
        clientMeta: {
            description: "WalletConnect Developer App",
            url: "https://walletconnect.org",
            icons: ["https://walletconnect.org/walletconnect-logo.png"],
            name: "WalletConnect",
            ssl: true
        }
    };
    return options;
};

// my connect 
export async function walletConnectOnSessionRequest(uri, address) {
    const options = await getClientMeta();
    const walletConnector = new WalletConnect({ uri }, options);
    console.log('walletConnector:',walletConnector);
    walletConnector.approveSession({
        accounts: ['0x4343435454545454'],
        chainId: 1
    });

    // /**
    //  *  Subscribe to session requests
    //  */
    // walletConnector.on("wc_sessionRequest", (error, payload) => {
    //     console.log('walletConnector:',walletConnector);
    //     if (error) {
    //         throw error;
    //     }
    //     // await walletConnector.createSession();
    //     walletConnector.approveSession({
    //         accounts: address,
    //         chainId: 1
    //     });
    // });
    
}




