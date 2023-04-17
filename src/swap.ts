import { Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock } from "@mysten/sui.js";

console.clear();

(async () => {

    const keypair = new Ed25519Keypair();
    const provider = new JsonRpcProvider();
    const signer = new RawSigner(keypair, provider);
    const txb = new TransactionBlock();

    txb.transferObjects(
        [
            txb.object(
                '0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2'
            ),
        ],
        txb.pure('0x1d20dcdb2bca4f508ea9613994683eb4e76e9c4ed371169677c1be02aaf0b12a')
    );
    const result = await signer.signAndExecuteTransactionBlock({
        transactionBlock: txb
    });
    console.log({
        result
    })
})()