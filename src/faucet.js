import { Client } from 'discord.js-selfbot-v13';
import consoleStamp from 'console-stamp';
import { Random } from "random-js";
import * as dotenv from 'dotenv';

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

dotenv.config();
const random = new Random();
const client = new Client({ checkUpdate: false });
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));
consoleStamp(console, { format: '(->).yellow :date( HH:MM:ss ).blue.underline' });
consoleStamp(process.stdout, { format: '(->).yellow :date( HH:MM:ss ).blue.underline' });

const faucetChannelIds = [
  '1037811694564560966',
  '1093613234084388875'
];
const shortAddress = (address) => `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = shortAddress(suiAddress);

const getRandomDelay = async () => {
  return random.integer(121 * 60, 140 * 60);
}

const parseDelay = async (delay) => {
  let hrs = Math.trunc(delay/3600);
  let mins = Math.trunc((delay - 7200)/60);
  let secs = delay - 7200 - (mins * 60);
  let delayStr = `${hrs} hrs`;

  if (mins != 0) {
    delayStr += `, ${mins} mins`;
  }
  if (secs != 0) {
    delayStr += `, ${secs} secs`;
  }

  return delayStr;
}


(async () => {
  
  client.on('ready', async () => {
    console.log(`logged in as ${cyan}${underscore}${client.user.username}#${client.user.discriminator}${reset}`);
  
    while (true) {

      for (let i = 0; i < faucetChannelIds.length; i++ ) {
        client.channels.cache.get(faucetChannelIds[i]).send(`!faucet ${suiAddress}`);
        console.log(`faucet initiated to ${cyan}${underscore}${shortSuiAddress}${reset} from cID: ${cyan}${underscore}${faucetChannelIds[i]}${reset}`);
      }

      let delay = await getRandomDelay();
      let delayStr = await parseDelay(delay);

      console.log(`waiting ${yellow}${delayStr}${reset} seconds for next request`);
      await timeout(delay);
    }
  });

  client.login(process.env.TOKEN);

})()