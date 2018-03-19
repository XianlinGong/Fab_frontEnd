import { Component } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpInterceptor, HttpClientJsonpModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Http, Request, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { HttpRequest } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Fabcoin Explorer';
  configURL = "http://35.182.160.212:18667/";
  myMemPoolInfo: memPoolInfo;
  myChainInfo: chainInfo;
  myTransactionInfo: transactionInfo;
  myBlockInfo: blockInfo;

  localBtnColor: string;
  remoteBtnColor: string;

  localServerAddress: string;
  remoteServerAddress: string;

  isTmActive = true; //Tm = transaction mempool 0 
  isCiActive = false; //Ci = chainInfo; 1
  isTiActive = false; //Ti = transaction information 2
  isBiActive = false; //Bi = block information  3

  headers?: Headers;


  constructor(private http: HttpClient) {

    // this.http.get('https://blockexplorer.com/api/block/0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').subscribe(data=>console.log(data));
  }






  ngOnInit(): void {

    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(data => { console.log('from typicode'); console.log(data) });
    this.http.get('https://blockexplorer.com/api/block/0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').subscribe(data => { console.log('from BlockExplorer'); console.log(data) });
    this.http.get('https://chain.so/api/v2/get_info/DOGE').subscribe(data => { console.log('from chain.so'); console.log(data) })
    this.http.get(this.configURL + 'rest/chaininfo.json').subscribe(data => { console.log('from Fabcoin Server'); console.log(data) });

    this.ciClicked();
    //this.http.post('http://35.182.160.212:18667/rest/chaininfo.json',{'access-control-allow-origin':'*', 'Content-Type': 'application/json'}).subscribe(data=>console.log(data));


  }

  getMemPoolInfo(): void {

    this.http.get(this.configURL + 'rest/mempool/info.json').subscribe(data => {
      this.myMemPoolInfo = new memPoolInfo(data);

    });
    console.log("here")
  }

  getChainInfo(): void {

    this.http.get(this.configURL + 'rest/chaininfo.json').subscribe(data => {
      this.myChainInfo = new chainInfo(data);
    });
  }


  getTransactionInformation(tId: string): void {


    console.log("In Function : Get Transaction Informaiton " + tId);

    this.myTransactionInfo = null
    this.tiClicked();
    this.http.get(this.configURL + 'rest/tx/' + tId + '.json').subscribe(data => {
      this.myTransactionInfo = new transactionInfo(data);

    });
  }

  getBlockInformation(bId: string): void {

    this.myBlockInfo = null
    this.http.get(this.configURL + 'rest/block/' + bId + '.json').subscribe(data => {
      this.myBlockInfo = new blockInfo(data);

    });
  }

  showCurrentBlockFromChain(): void {

    this.biClicked();
    this.getBlockInformation(this.myChainInfo.mBestBlockHash);
  }


  showPreviousBlockOfCurrentBlock(): void {


    this.getBlockInformation(this.myBlockInfo.mPreviousBlockHash);
    this.biClicked();
  }

  showBlockOfCurrentTransaction(): void {

    this.getBlockInformation(this.myTransactionInfo.mBlockHash);
    this.biClicked();
  }

  remoteClicked(): void {

    this.localBtnColor = ""
    this.remoteBtnColor = "green"
    this.configURL = 'http://35.182.160.212:18667/';

    if (this.isTmActive) this.tmClicked()
    else if (this.isCiActive) this.ciClicked()
    else if (this.isTiActive) {

      this.tiClicked()
    }
    else if (this.isBiActive) this.biClicked()

  }

  localClicked(): void {

    this.localBtnColor = "green"
    this.remoteBtnColor = ""
    this.configURL = 'http://127.0.0.1:18667/';

    if (this.isTmActive) this.tmClicked()
    else if (this.isCiActive) this.ciClicked()
    else if (this.isTiActive) this.tiClicked()
    else if (this.isBiActive) this.biClicked()

  }

  tmClicked(): void {

    this.myMemPoolInfo = null;
    this.getMemPoolInfo();

    this.activate(0)
  }

  ciClicked(): void {

    this.myChainInfo = null;
    this.getChainInfo();

    this.activate(1)
  }

  tiClicked(): void {

    if (!this.isTiActive)
      this.myTransactionInfo = null;

    this.activate(2)

  }

  biClicked(): void {

    if (!this.isBiActive)
      this.myBlockInfo = null;
    this.activate(3)

  }

  activate(id: number): void {

    this.isTmActive = false;
    this.isTiActive = false;
    this.isCiActive = false;
    this.isBiActive = false;


    if (id === 0) this.isTmActive = true
    else if (id === 1) this.isCiActive = true
    else if (id === 2) this.isTiActive = true
    else if (id === 3) this.isBiActive = true
  }


}

export class memPoolInfo {

  mSize: number;
  mBytes: number;
  mUsage: number;
  mMaxMemPool: number;
  mMemPoolMinFee: number;

  constructor(data) {

    this.mSize = data['size'];
    this.mBytes = data['bytes'];
    this.mUsage = data['usage'];
    this.mMaxMemPool = data['maxmempool'];
    this.mMemPoolMinFee = data['mempoolminfee'];
  }

}

export class chainInfo {

  mChain: string;
  mBlocks: number;
  mHeaders: number;
  mBestBlockHash: string;
  mDifficulty: number;
  mMedianTime: number;
  mVerificationProgress: number;
  mChainWork: string;
  mPruned: boolean;
  mSoftForks: softFork[] = [];
  mBip9_csv_softFork: bip9_softFork;
  mBip9_segwit_softFork: bip9_softFork;

  tmp: any;

  constructor(data) {

    this.mChain = data['chain'];
    this.mBlocks = data['blocks'];
    this.mHeaders = data['headers'];
    this.mBestBlockHash = data['bestblockhash'];
    this.mDifficulty = data['difficulty'];
    this.mMedianTime = data['mediantime'];
    this.mVerificationProgress = data['verificationprogress'];
    this.mChainWork = data['chainwork'];
    this.mPruned = data['pruned'];

    console.log(data['softforks'].length);

    var i = 0;
    for (i = 0; i < data['softforks'].length; i++) {
      //console.log(data['softforks'][i]);
      this.mSoftForks.push(new softFork(data['softforks'][i], i));
    }

    this.mBip9_csv_softFork = new bip9_softFork(data["bip9_softforks"]["csv"]);
    this.mBip9_segwit_softFork = new bip9_softFork(data["bip9_softforks"]["segwit"]);
  }
}

class softFork {

  mIndex: number;
  mId: string;
  mVersion: number;
  mStatus: boolean;

  constructor(sFork, idx) {
    this.mIndex = idx;
    this.mId = sFork['id'];
    this.mVersion = sFork['version'];
    this.mStatus = sFork['reject']['status'];
  }
}

class bip9_softFork {

  mStatus: string;
  mStartTime: number;
  mTimeOut: number;
  mSince: number;

  constructor(tmp) {

    this.mStatus = tmp['status'];
    this.mStartTime = tmp['startTime'];
    this.mTimeOut = tmp['timeout'];
    this.mSince = tmp['since'];
  }
}


class transactionInfo {

  mIndex: number = 0;
  mTxid: string;
  mHash: string;
  mVersion: number;
  mSize: number;
  mVsize: number;
  mLocktime: number;
  mVin: txVin[] = [];
  mVout: txVout[] = [];
  mBlockHash: string;
  mHex: string;

  constructor(tInfo, mIndex = 0) {

    this.mTxid = tInfo['txid'];
    this.mHash = tInfo['hash'];
    this.mVersion = tInfo['version'];
    this.mSize = tInfo['size'];
    this.mVsize = tInfo['vsize'];
    this.mLocktime = tInfo['locktime'];

    var i = 0;
    for (i = 0; i < tInfo['vin'].length; i++) {
      this.mVin.push(new txVin(tInfo['vin'][i], i));
    }

    i = 0;

    for (i = 0; i < tInfo['vout'].length; i++) {
      this.mVout.push(new txVout(tInfo['vout'][i], i));
    }

    this.mBlockHash = tInfo['blockhash'];
    this.mHex = tInfo['hex'];
  }
}

//transaction VIN
class txVin {

  mIndex: number;
  mCoinbase: string;
  mSequence: number;

  constructor(vin, idx) {

    this.mIndex = idx;
    this.mCoinbase = vin['coinbase'];
    this.mSequence = vin['sequence'];

  }
}

class txVout {

  mIndex: number;
  mValue: number;
  mN: number;
  mScriptPubKeyAsm: string;
  mScriptPubKeyHex: string;
  mScriptPubKeyReqSigs?: number;
  mScriptPubKeyType: string;
  mAddresses: string[] = [];

  constructor(vout, idx) {

    this.mIndex = idx;
    this.mValue = vout['value'];
    this.mN = vout['n'];
    this.mScriptPubKeyAsm = vout['scriptPubKey']['asm'];
    this.mScriptPubKeyHex = vout['scriptPubKey']['hex'];
    this.mScriptPubKeyReqSigs = vout['scriptPubKey']['reqSigs'];
    this.mScriptPubKeyType = vout['scriptPubKey']['type'];

    console.log("sdfsdf")

    this.mAddresses = vout['scriptPubKey']['addresses'];
    if (this.mAddresses)
      console.log('addresses length : ' + this.mAddresses.length)
    else
      console.log('no addresses found')
    /* var i = 0;
     for (i = 0; i < vout['scriptPubKey']['addresses'].length; i++) {
       this.mAddresses.push(vout['scriptPubKey']['addresses'][i]);
     }*/
  }
}

class blockInfo {

  mHash: string;
  mConfirmations: number;
  mStrippedSize: number;
  mSize: number;
  mWeight: number;
  mHeight: number;
  mVersion: number;
  mVersionHex: string;
  mMerkleRoot: string;
  mTransactions: transactionInfo[] = [];
  mTime: number;
  mMedianTime: number;
  mNonceUint32: number;
  mNonce: string;
  mBits: string;
  mDifficulty: number;
  mChainwork: string;
  mPreviousBlockHash: string;

  constructor(bInfo) {
    this.mHash = bInfo['hash'];
    this.mConfirmations = bInfo['confirmations'];
    this.mStrippedSize = bInfo['strippedsize'];
    this.mSize = bInfo['size'];
    this.mWeight = bInfo['weight'];
    this.mHeight = bInfo['height'];
    this.mVersion = bInfo['version'];
    this.mVersionHex = bInfo['versionHex'];
    this.mMerkleRoot = bInfo['merkleroot'];

    var i = 0;
    for (i = 0; i < bInfo['tx'].length; i++) {
      this.mTransactions.push(new transactionInfo(bInfo['tx'][i], i))
    }

    this.mTime = bInfo['time'];
    this.mMedianTime = bInfo['mediantime']
    this.mNonceUint32 = bInfo['nonceUint32']
    this.mNonce = bInfo['nonce']
    this.mBits = bInfo['bits']
    this.mDifficulty = bInfo['difficulty']
    this.mChainwork = bInfo['chainwork']
    this.mPreviousBlockHash = bInfo['previousblockhash']
  }
}