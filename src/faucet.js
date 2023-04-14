import { Client } from 'discord.js-selfbot-v13';
import consoleStamp from 'console-stamp';
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
const client = new Client({ checkUpdate: false });
const timeout = seconds => new Promise(res => setTimeout(res, 1000 * seconds));
consoleStamp(console, { format: '(->).cyan :date(HH:MM:ss).blue.underline' });

const faucetChannelIds = [
  '1037811694564560966',
  '1093613234084388875'
];
const shortAddress = (address) => `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
const shortChannelId = (channelId) => `${channelId.slice(0, 3)}..${channelId.slice(channelId.length - 3, channelId.length)}`;
const suiAddress = '0xc4ba490f7c68cb4384fb672d31337d533bbd55afc52936f833086e3dc1fd13a4';
const shortSuiAddress = shortAddress(suiAddress);

(async () => {
  
  client.on('ready', async () => {
    console.log(`Logged in as ${cyan}${underscore}${client.user.username}#${client.user.discriminator}${reset}`);
  
    while (true) {

      for (let i = 0; i < faucetChannelIds.length; i++ ) {
        let channel = client.channels.cache.get(faucetChannelIds[i]);
        
        if (!channel) {
          consoleStamp(console, { format: '(->).red :date(HH:MM:ss).blue.underline' });
          console.log(`Invalid channel: ${red}${underscore}#${shortChannelId(faucetChannelIds[i])}${reset}`);
          consoleStamp(console, { format: '(->).cyan :date(HH:MM:ss).blue.underline' });
          continue;
        }

        await channel.send(`!faucet ${suiAddress}`);

        console.log(`Faucet initiated to ${cyan}${underscore}${shortSuiAddress}${reset} from channel: ${cyan}${underscore}#${shortChannelId(faucetChannelIds[i])}${reset}`);
      }
    }
  });

  client.login(process.env.TOKEN);

})()