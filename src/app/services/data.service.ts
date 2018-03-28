import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { chainInfo } from '../models/chainInfo'
import { blockInfo } from '../models/blockinfo';
import { Tx } from '../models/blockinfo'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class DataService {

  //configURL : string = 'http://35.182.160.212:18667/rest/' ; //Testnet
  configURL: string = 'http://18.130.8.117:8667/rest/'; //mainnet
  curFiveBlocks : blockInfo[] = [];

  constructor(private http : HttpClient) {  }


   getChainInfo() : Observable<chainInfo> {

  
      return this.http.get<chainInfo>(this.configURL+'chaininfo.json') ;

   }

 getBlockInfo(bId : string) : Observable<blockInfo> {
   return  this.http.get<blockInfo>(this.configURL + 'block/'+bId + '.json')

  }

  getTxInfo(tId : string) : Observable<Tx> {
    return this.http.get<Tx>(this.configURL + 'tx/' + tId + '.json')
  }

}               	
