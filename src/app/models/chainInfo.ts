export interface chainInfo {

    chain : string,
    blocks : number;
    headers : number;
    bestblockhash : string,
    difficulty : number,
    mediantime : number,
    verificationprogress : number,
    chainwork : string,
    pruned : boolean,
    softforks : sForks[],
    bip9_softforks : bip9Forks[],
    tmp:any; //to hold any intermediate value
}

export interface bip9Forks {
    csv : bForks,
    segwit : bForks;
}


export interface bForks {
    status : string,
    startTime : number,
    timeout :number,
    since : number;
}

export interface sForks{
    id : string,
    version : number,
    reject : Status;
}

export interface Status{
    status : boolean;
}