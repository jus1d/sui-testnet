import * as bip39 from 'bip39';
import fs from 'fs';


(async () => {
    for (let i = 0; i < 10; i++ ){
        const mnemonic = bip39.generateMnemonic();

        fs.appendFileSync("mnemonic.txt", `${mnemonic}\n`, "utf8");
    }
})()