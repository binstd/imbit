// export const USER_KEY = 'TOKEN_USER';

export const SERVER_URL = 'http://10.10.30.62:8000';//'https://imbit.herokuapp.com/';
const keyId = '0045c2ce288a4e649a8f39f3d19446b4';
export const ALLOW_NETWORK = [
    {
        title: "以太主网络",
        chain: "ETH",
        rpc_url:`https://mainnet.infura.io/v3/${keyId}`,
        code:`eth-mainnet`,
        chain_id: 1,
    },
    {
        title: "ropsten网络",
        rpc_url:`https://ropsten.infura.io/v3/${keyId}`,
        chain: "ETH",
        code:"eth-ropsten",
        chain_id: 3,
    },
    {
        title: "kovan网络",
        code:"eth-kovan",
        chain: "ETH",
        rpc_url:`https://kovan.infura.io/v3/${keyId}`,
        chain_id: 42,
    },
    {
        title: "rinkeby网络",
        code:"eth-rinkeby",
        chain: "ETH",
        rpc_url:`https://rinkeby.infura.io/v3/${keyId}`,
        chain_id: 4,
    },
    {
        title: "以太坊经典",
        code:"etc-mainnet",
        chain: "ETC",
        rpc_url: "https://ethereumclassic.network",
        network: "mainnet",
        chain_id: 61,
        network_id: 1,
        short_name: "etc",
    },
    {
        title: "poa主网络",
        code:"poa-care",
        chain: "POA",
        rpc_url:'https://core.poa.network',
        chain_id: 99,
    },
    {
        title: "xdai",
        code:"poa-dai",
        chain: "POA",
        rpc_url:'https://dai.poa.network',
        chain_id: 100,
    }
];