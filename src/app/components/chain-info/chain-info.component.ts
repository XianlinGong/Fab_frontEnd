import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { chainInfo } from '../../models/chainInfo';


@Component({
  selector: 'app-chain-info',
  templateUrl: './chain-info.component.html',
  styleUrls: ['./chain-info.component.css']
})
export class ChainInfoComponent implements OnInit {


  myChainInfo : chainInfo;

  constructor(private dataService : DataService) { }


  ngOnInit() {

   this.dataService.getChainInfo().subscribe(myChainInfo => {
     this.myChainInfo = myChainInfo;
   });
   
  }

}
