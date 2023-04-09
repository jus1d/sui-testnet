import { Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock, TransactionArgument, SUI_SYSTEM_STATE_OBJECT_ID, Connection } from '@mysten/sui.js';
import { SuiKit } from '@scallop-dao/sui-kit';
import consoleStamp from 'console-stamp';
import axios from 'axios';
import fs from 'fs';
import * as bip39 from 'bip39';
import BigNumber from "bignumber.js";
import HttpsProxyAgent from 'https-proxy-agent';

const network: string = 'testnet';

consoleStamp(console, { format: ':date(HH:MM:ss)' });
const parseFile = (fileName: string) => fs.readFileSync(fileName, "utf8").split('\n').map(str => str.trim()).filter(str => str.length > 10);
// const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');
const faucetUrl = `https://faucet.${network}.sui.io/gas`;
const timeout = (s: number) => new Promise(res => setTimeout(res, s*1000));
const toSui = (n: number) => n / 1000000000;
const toSuiObjects = (n: number) => n * 1000000000;
const secretKey = '0xc458ea8e447bfb1e2e6c52f39078cffa48154723cfaa012200055b97693cd437';
const mnemonic: string = parseFile('mnemonic.txt')[0];
const suiKit = new SuiKit({ mnemonics: mnemonic, networkType: 'testnet' });


const faucet = async (address: string) => {
    try {
        const response = await fetch(faucetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                FixedAmountRequest: {
                    recipient: address,
                }
            })
        });
        
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const balance = await getBalance();
            console.log(`Success. Address: ${address}. Balance: ${balance}`);
        } else {
            console.log(`Reveived response: ${response.status} ${response.statusText}`)
        }

    } catch (error) {
        console.log(`Error: ${error} Address: ${address}`)
    }
}


const stake = async (validatorAddress: string, amountSui: number) => {
    console.log(`Sending ${amountSui} SUI to staking. Validator: ${validatorAddress}`);

    await suiKit.stakeSui(toSuiObjects(amountSui), validatorAddress).then(() => {
        console.log(`Stake SUI success`);
    }).catch(error => {
        console.log(error.message)
    });
}


const startTokenFarming = async (delaySecs: number) => {

    const wallets = parseFile('wallets.txt');
    // const proxyList = parseFile('proxy.txt');

    while (true) {
        for (let i = 0; i < wallets.length; i++) {
            await faucet(wallets[i]);
            await timeout(delaySecs);
        }
    }
}


const getBalance = async (): Promise<number> => {
    const objectsBalance = (await suiKit.getBalance('0x2::sui::SUI')).totalBalance;
    const suiBalance = toSui(objectsBalance);

    // console.log(`Balance: ${suiBalance} SUI`);

    return suiBalance;
}


(async () => {

    // const validators: Array<string> = parseFile('devnetValidators.txt');

    startTokenFarming(60);

    // while (true) {
    //     for (let i = 0; i < validators.length; i++) {
    //         await stake(validators[i], 0.1);
    //         await getBalance();
    //         await timeout(60);
    //     }      
    // }

})()