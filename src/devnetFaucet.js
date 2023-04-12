import consoleStamp from 'console-stamp';
import axios from 'axios';
import fs from 'fs';

consoleStamp(console, { format: '(->).yellow :date( HH:MM:ss ).blue.underline' });
const parseFile = fileName => fs.readFileSync(fileName, "utf8").split('\n').map(str => str.trim()).filter(str => str.length > 10);
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));

const shortAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`;
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = shortAddress(suiAddress);

const reset = "\x1b[0m"
const dim = "\x1b[2m"
const underscore = "\x1b[4m"
const blink = "\x1b[5m"
const reverse = "\x1b[7m"
const hidden = "\x1b[8m"

const red = "\x1b[31m"
const green = "\x1b[32m"
const yellow = "\x1b[33m"
const blue = "\x1b[34m"
const magenta = "\x1b[35m"
const cyan = "\x1b[36m"


const checkProxyList = async () => {
    const proxies = parseFile('uncheckedProxy.txt');

    for (let i = 0; i < proxies.length; i++) {
        let ip = proxies[i].split(':')[0];
        let port = parseInt(proxies[i].split(':')[1]);
        console.log(`${proxies[i]} checking...`);

        try {
            let res = await axios.get('https://api.ipify.org/?format=json', {
                proxy: {
                    protocol: 'http',
                    host: ip,
                    port
                }
            });

            fs.appendFileSync('proxy.txt', `${proxies[i]}\n`);
            console.log(`${green}success: ${reset}${proxies[i]}`);
        } catch (error) {
            console.log(`${red}error: ${reset}${proxies[i]}`);
        }
    }
}


const getRandomProxy = async (proxyList) => {
    return proxyList[Math.floor(Math.random() * proxyList.length)];
}


const checkProxy = async (proxy) => {
    let ip = proxy.split(':')[0];
    let port = proxy.split(':')[1];

    console.log(`${proxy} checking...`);

    axios.get('https://api.ipify.org/?format=json', {
        proxy: {
            protocol: 'http',
            host: ip,
            port: port
        }
    }).then(res => {
        console.log(`success: ${proxy}`);
        return true;
    }).catch(err => {
        console.log(`error: ${proxy}`);
        return false;
    })

    return false;
    
}


const faucet = async (address, proxy) => {
    let ip = proxy.split(':')[0];
    let port = proxy.split(':')[1];

    axios.post('https://faucet.devnet.sui.io/gas', {
        proxy: {
            protocol: 'http',
            host: ip,
            port: port
        }
    }).then(res => {
        console.log(`${dim}${shortAddress(address)}${reset} proxy: ${proxy}${reset} ${green}faucet initiated with code: ${res.status}${reset}`);
    }).catch(err => {
        console.log(`${dim}${shortAddress(address)}${reset} proxy: ${proxy}${reset} ${green}faucet error: ${err}`);
    });
}


(async () => {

    let proxyList = parseFile('proxy.txt');

    while (true) {
        let proxy = await getRandomProxy(proxyList);

        for (let i = 0; i < 3; i++) {
            await faucet(suiAddress, proxy);
        }

        await timeout(1);
    }

})()