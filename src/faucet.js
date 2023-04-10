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

const faucetChannelId = '1037811694564560966';
const shortAddress = (address) => `${address.slice(0, 6)}...${address.slice(address.length - 6, address.length)}`;
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = shortAddress(suiAddress);

const getRandomDelay = async () => {
  return random.integer(121 * 60, 140 * 60);
}

const getDate = () => {
  var now = new Date();

  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  return hours + ":" + minutes + ":" + seconds;
}

(async () => {
  
  client.on('ready', async () => {
    console.log(`logged in as ${client.user.username}#${client.user.discriminator}`);
  
    while (true) {
      client.channels.cache.get(faucetChannelId).send(`!faucet ${suiAddress}`);
      console.log(`faucet initiated to ${shortSuiAddress}`);

      let delay = await getRandomDelay();

      for (let i = 0; i < delay; i++) {
        process.stdout.write(`\r${yellow}->${reset} ${blue}${underscore}[${getDate()}]${reset} waiting ${yellow}${delay - i}${reset} seconds for next request`);
        await timeout(1);
      }
      process.stdout.write('\n');
    }
  });

  client.login(process.env.TOKEN);

})()