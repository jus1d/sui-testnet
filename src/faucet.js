import { Client } from 'discord.js-selfbot-v13';
import consoleStamp from 'console-stamp';
import { Random } from "random-js";
import * as dotenv from 'dotenv';

dotenv.config();
const random = new Random();
const client = new Client({ checkUpdate: false });
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));
consoleStamp(console, { format: '(->).yellow :date( HH:MM:ss ).blue.underline' });

const faucetChannelId = '1037811694564560966';
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = `${suiAddress.slice(0, 6)}...${suiAddress.slice(suiAddress.length - 6, suiAddress.length)}`;

const getRandomDelay = async () => {
  return random.integer(121 * 60, 140 * 60);
}

(async () => {
  
  client.on('ready', async () => {
    console.log(`logged in as ${client.user.username}#${client.user.discriminator}`);
  
    while (true) {
      client.channels.cache.get(faucetChannelId).send(`!faucet ${suiAddress}`);
      console.log(`faucet initiated to ${shortSuiAddress}`);

      let delay = await getRandomDelay();
      console.log(`waiting \x1b[33m${delay}\x1b[0m seconds`);
      await timeout(delay);
    }
  });

  client.login(process.env.TOKEN);

})()