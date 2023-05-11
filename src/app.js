import { Client } from 'discord.js-selfbot-v13';
import { log } from './logger.js';
import config from 'config';

const underscore = "\x1b[4m";
const reset = "\x1b[0m";
const cyan = "\x1b[36m";
const red = "\x1b[31m";

const TOKEN = config.get('token');
const ADDRESS = config.get('address');
const ALWAYS = true;

const client = new Client({ checkUpdate: false });

const faucetChannels = [
  {
    name: "Official SUI faucet",
    id: "1037811694564560966",
    network: "testnet"
  },
  {
    name: "BaySwap SUI faucet",
    id: "1104765852093534271",
    network: "mainnet"
  },
  {
    name: "BaySwap SUI faucet",
    id: "1093613234084388875",
    network: "testnet"
  }
];

const shortAddress = (address) => `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
const shortChannelId = (channelId) => `${channelId.slice(0, 3)}..${channelId.slice(channelId.length - 3, channelId.length)}`;

(async () => {
  console.clear();
  log.start();

  if (!TOKEN) {
    log.error(`Log in failed. No token specified. Provide token in ${underscore}${cyan}.env${reset} file`);
    return;
  }

  if (!ADDRESS) {
    console.log(`No SUI address specified. Provide address in ${underscore}${cyan}.env${reset} file`);
    return;
  }

  client.on('ready', async () => {
    log.info(`Logged in as ${cyan}${underscore}${client.user.username}#${client.user.discriminator}${reset}`);

    while (ALWAYS) {
      for (let i = 0; i < faucetChannels.length; i++ ) {
        let channel = client.channels.cache.get(faucetChannels[i].id);

        if (!channel) {
          log.error(`Invalid channel: ${faucetChannels[i].name} [${faucetChannels[i].network}] ${red}${underscore}#${shortChannelId(faucetChannels[i].id)}${reset}`);
          continue;
        }

        try {
          await channel.send(`!faucet ${ADDRESS}`);
                    
          log.info(`Faucet initiated to ${cyan}${underscore}${shortAddress(ADDRESS)}${reset} from channel: ${cyan}${underscore}#${shortChannelId(faucetChannels[i].id)}${reset}`);
        } catch (error) {
          log.error(`Faucet initiation failed for ${cyan}${underscore}${shortAddress(ADDRESS)}${reset} from channel: ${cyan}${underscore}#${shortChannelId(faucetChannels[i].id)}${reset}`);
        }
      }
    }
  });

  try {
    await client.login(TOKEN);
  } catch (error) {
    log.error(`Log in failed. Token incorrect`);
    return;
  }
})()