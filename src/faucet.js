import { Client } from 'discord.js-selfbot-v13';
import consoleStamp from 'console-stamp';
import * as dotenv from 'dotenv';
import readline from 'readline';

const reset = "\x1b[0m";
const underscore = "\x1b[4m";
const dim = "\x1b[2m";
const blink = "\x1b[5m";
const reverse = "\x1b[7m";
const hidden = "\x1b[8m";

const red = "\x1b[31m";
const blue = "\x1b[34m";
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const magenta = "\x1b[35m";

dotenv.config();
console.clear();
const client = new Client({ checkUpdate: false });
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));

console.log(`${blue}\n\n\t ▄██████  █    ██  ██▓   ▄▄▄█████▓▓█████   ██████ ▄▄▄█████▓ ███▄    █ ▓█████ ▄▄▄█████▓\n` +
                       '\t▒██    ▒  ██  ▓██▒▓██▒   ▓  ██▒ ▓▒▓█   ▀ ▒██    ▒ ▓  ██▒ ▓▒ ██ ▀█   █ ▓█   ▀ ▓  ██▒ ▓▒\n' +
                       '\t░ ▓██▄ ░ ▓██  ▒██░▒██▒   ▒ ▓██░ ▒░▒███   ░ ▓██▄   ▒ ▓██░ ▒░▓██  ▀█ ██▒▒███   ▒ ▓██░ ▒░\n' +
                       '\t  ▒   ██▒▓▓█  ░██░░██░   ░ ▓██▓ ░ ▒▓█  ▄   ▒   ██▒░ ▓██▓ ░ ▓██▒  ▐▌██▒▒▓█  ▄ ░ ▓██▓ ░ \n' +
                       '\t▒██████▒▒▒▒█████▓ ░██░     ▒██▒ ░ ░▒████▒▒██████▒▒  ▒██▒ ░ ▒██░   ▓██░░▒████▒  ▒██▒ ░ \n' +
                       '\t▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒ ░▓       ▒ ░░   ░░ ▒░ ░▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒░   ▒ ▒ ░░ ▒░ ░  ▒ ░░   \n' +
                       '\t░ ░▒  ░ ░░░▒░ ░ ░  ▒ ░       ░     ░ ░  ░░ ░▒  ░ ░    ░    ░ ░░   ░ ▒░ ░ ░  ░    ░    \n' +
                       '\t░  ░  ░   ░░░ ░ ░  ▒ ░     ░         ░   ░  ░  ░    ░         ░   ░ ░    ░     ░      \n' +
                       '\t      ░     ░      ░                 ░  ░      ░                    ░    ░  ░         \n' +
                       `\t                                                                                      \n${reset}`)

const faucetChannelIds = [
  '1037811694564560966', // Official SUI faucet channel
  '1093613234084388875' // BaySwap faucet channel
];

const shortAddress = (address) => `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
const shortChannelId = (channelId) => `${channelId.slice(0, 3)}..${channelId.slice(channelId.length - 3, channelId.length)}`;

const setConsoleStamp = (type) => {
  if (type === 'log') {
    consoleStamp(console, { format: '(->).cyan :date(HH:MM:ss).blue.underline' });
  } else if (type === 'error') {
    consoleStamp(console, { format: '(->).red :date(HH:MM:ss).blue.underline' });
  }
}

(async () => {

  setConsoleStamp('log');
  
  let token = process.env.TOKEN;
  let address = process.env.ADDRESS;
  
  if (!token) {
    setConsoleStamp('error');
    console.log(`Log in failed. No token specified. Provide token in .env file`);
    setConsoleStamp('log');
    return;
  }
  
  if (!address) {
    setConsoleStamp('error');
    console.log(`No SUI address specified. Provide address in .env file`);
    setConsoleStamp('log');
    return;
  }

  client.on('ready', async () => {
    console.log(`Logged in as ${cyan}${underscore}${client.user.username}#${client.user.discriminator}${reset}`);
  
    while (true) {

      for (let i = 0; i < faucetChannelIds.length; i++ ) {
        let channel = client.channels.cache.get(faucetChannelIds[i]);
        
        if (!channel) {
          setConsoleStamp('error');
          console.log(`Invalid channel: ${red}${underscore}#${shortChannelId(faucetChannelIds[i])}${reset}`);
          setConsoleStamp('log');
          continue;
        }

        try {
          await channel.send(`!faucet ${address}`);
          
          console.log(`Faucet initiated to ${cyan}${underscore}${shortAddress(address)}${reset} from channel: ${cyan}${underscore}#${shortChannelId(faucetChannelIds[i])}${reset}`);
        } catch (error) {
          setConsoleStamp('error');
          console.log(`Faucet initiation failed for ${cyan}${underscore}${shortAddress(address)}${reset} from channel: ${cyan}${underscore}#${shortChannelId(faucetChannelIds[i])}${reset}`);
        }
      }
    }
  });

  try {
    await client.login(token);
  } catch (error) {
    setConsoleStamp('error');
    console.log(`Log in failed. Token incorrect`);
    return;
  }

})()