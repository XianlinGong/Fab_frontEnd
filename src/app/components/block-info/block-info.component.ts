import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { blockInfo } from '../../models/blockinfo';


@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.css']
})
export class BlockInfoComponent implements OnInit {

  myBlockInfo : blockInfo ;
  curFiveBlocks : blockInfo[] = [];

  constructor(private dataService : DataService) { }

  ngOnInit() {


  }

  setCurrentBlock(bId : string) {

    this.dataService.getBlockInfo(bId).subscribe(myBlockInfo => {
      this.myBlockInfo = myBlockInfo;
    });


  }

}
