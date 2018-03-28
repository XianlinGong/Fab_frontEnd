export interface blockInfo {

    hash : string,
    confirmations : number,
    strippedsize : number,
    size : number,
    weight : number,
    height : number,
    version : number,
    versionHex : string,
    merkleroot : string,
    tx : Tx[],
    time : number,
    date : Date,
    mediantime : number,
    nonceUint32 : number,
    nonce : string,
    bits : string,
    difficulty : number,
    chainwork : string,
    previousblockhash : string,
    nextblockhash : string;

}

export interface Tx {

    txid : string,
    hash  : string,
    version :number,
    size : number,
    vsize : number,
    locktime : number,
    vin : TxVin[],
    vout : TxVout[],
    blockhash : string,
    hex : string;


}

export interface TxVin {

    coinbase : string,
    sequence : number;

}


export interface TxVout {

    value : number,
    n : number,
    scriptPubKey : ScriptPubKey;

}

export interface ScriptPubKey {
    
    asm : string,
    hex : string,
    reqSigs? : number,
    type : string,
    addresses : string[];
}