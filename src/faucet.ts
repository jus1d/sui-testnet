import { Ed25519Keypair, JsonRpcProvider, RawSigner } from '@mysten/sui.js';
import fs from 'fs';
import consoleStamp from 'console-stamp';
import HttpsProxyAgent from 'https-proxy-agent';
import BigNumber from "bignumber.js";
import * as bip39 from 'bip39';
import axios from 'axios';

consoleStamp(console, { format: ':date(HH:MM:ss)' });
const parseFile = fileName => fs.readFileSync(fileName, "utf8").split('\n').map(str => str.trim()).filter(str => str.length > 10);
const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');
const timeout = ms => new Promise(res => setTimeout(res, ms));


const generateMnemonic = async () => {
    const mnemonic = bip39.generateMnemonic();

    return mnemonic;
}


const handleFaucet = async (address:string) => {

    try {
        const response = await fetch(`https://faucet.testnet.sui.io/gas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                FixedAmountRequest: {
                    recipient: address,
                }
            })
        });

        console.log(`Reveived response: ${response.status} ${response.statusText}`)

        if (response.status === 200 || response.status === 201 || response.status === 202) {
            console.log(`Success on ${address}`)
        } else if (response.status === 403 || response.status === 400) {
            console.log(`Something went wrong with ${address}`)
        }

    } catch (error) {
        console.log(`Something went wrong with ${address}`)
    }
}


(async () => {

    await handleFaucet('0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4');


    // const wallets = parseFile('wallets.txt')
    // console.log(`Loaded ${wallets.length} wallets`)

    // for (let i = 0; i < wallets.length; i++) {
    //     handleFaucet(wallets[i])
    //     timeout(200)
    // }

    // const mnemonics = parseFile('mnemonic.txt');

    // for(let i = 0; i < mnemonics.length; i++) {
    //     console.log(mnemonics[i]);
    //     const keypair = Ed25519Keypair.deriveKeypair(
    //         mnemonics[i],
    //         `m/44'/784'/0'/0'/0'`
    //     );

    //     const address = keypair.getPublicKey().toSuiAddress();
    //     const privateKey = await bip39.mnemonicToEntropy(mnemonics[i])
    //     console.log(privateKey)
    //     fs.appendFileSync("wallets.txt", `${address}\n`, "utf8");
    // }


})()