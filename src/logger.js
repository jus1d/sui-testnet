import dateFormat from 'dateformat';

const start_symbol = '❯';

const reset = "\x1b[0m";
const dim = "\x1b[2m";
const red = "\x1b[31m";
const blue = "\x1b[34m";
const cyan = "\x1b[36m";
const yellow = "\x1b[33m";
const magenta = "\x1b[35m";

class Logger {
    getFullDate() {
        const date = new Date();
        return dateFormat(date, 'dd.mm HH:MM:ss');
    }

    info(message) {
        console.log(`${dim}${start_symbol}${reset} ${magenta}[${this.getFullDate()}] ${cyan}[  INFO   ]${reset} ${message}`);
    }

    warn(message) {
        console.log(`${dim}${start_symbol}${reset} ${magenta}[${this.getFullDate()}] ${yellow}[  WARN   ]${reset} ${message}`);
    }

    error(message) {
        console.log(`${red}${start_symbol}${reset} ${magenta}[${this.getFullDate()}] ${red}[  ERROR  ]${reset} ${message}`);
    }

    start() {
        console.log(`${blue}\n\n\t ▄██████  █    ██  ██▓   ▄▄▄█████▓▓█████   ██████ ▄▄▄█████▓ ███▄    █ ▓█████ ▄▄▄█████▓\n` +
                               '\t▒██    ▒  ██  ▓██▒▓██▒   ▓  ██▒ ▓▒▓█   ▀ ▒██    ▒ ▓  ██▒ ▓▒ ██ ▀█   █ ▓█   ▀ ▓  ██▒ ▓▒\n' +
                               '\t░ ▓██▄ ░ ▓██  ▒██░▒██▒   ▒ ▓██░ ▒░▒███   ░ ▓██▄   ▒ ▓██░ ▒░▓██  ▀█ ██▒▒███   ▒ ▓██░ ▒░\n' +
                               '\t  ▒   ██▒▓▓█  ░██░░██░   ░ ▓██▓ ░ ▒▓█  ▄   ▒   ██▒░ ▓██▓ ░ ▓██▒  ▐▌██▒▒▓█  ▄ ░ ▓██▓ ░ \n' +
                               '\t▒██████▒▒▒▒█████▓ ░██░     ▒██▒ ░ ░▒████▒▒██████▒▒  ▒██▒ ░ ▒██░   ▓██░░▒████▒  ▒██▒ ░ \n' +
                               '\t▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒ ░▓       ▒ ░░   ░░ ▒░ ░▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒░   ▒ ▒ ░░ ▒░ ░  ▒ ░░   \n' +
                               '\t░ ░▒  ░ ░░░▒░ ░ ░  ▒ ░       ░     ░ ░  ░░ ░▒  ░ ░    ░    ░ ░░   ░ ▒░ ░ ░  ░    ░    \n' +
                               '\t░  ░  ░   ░░░ ░ ░  ▒ ░     ░         ░   ░  ░  ░    ░         ░   ░ ░    ░     ░      \n' +
                               '\t      ░     ░      ░                 ░  ░      ░                    ░    ░  ░         \n' +
                               `\t                                                                                      \n${reset}`);
    }
}

export const log = new Logger();