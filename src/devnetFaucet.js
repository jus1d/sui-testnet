import consoleStamp from 'console-stamp';
import axios from 'axios';
import fs from 'fs';

consoleStamp(console, { format: '(->).yellow :date( HH:MM:ss ).blue.underline' });
const parseFile = fileName => fs.readFileSync(fileName, "utf8").split('\n').map(str => str.trim()).filter(str => str.length > 10);
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));

const shortAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`;
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = shortAddress(suiAddress);


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
                    port: port
                }
            });

            fs.appendFileSync('proxy.txt', `${proxies[i]}\n`);
            console.log(`\x1b[32msuccess: \x1b[0m${proxies[i]}`);
        } catch (error) {
            console.log(`\x1b[31merror: \x1b[0m${proxies[i]}`);
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
        console.log(`\x1b[2m${shortAddress(address)}\x1b[0m proxy: ${proxy}\x1b[0m \x1b[32mfaucet initiated with code: ${res.status}\x1b[0m`);
    }).catch(err => {
        console.log(`\x1b[2m${shortAddress(address)}\x1b[0m proxy: ${proxy}\x1b[0m \x1b[31mfaucet error: ${err}`);
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