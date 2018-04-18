import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacity-feed',
  templateUrl: './capacity-feed.component.html',
  styleUrls: ['./capacity-feed.component.scss']
})
export class CapacityFeedComponent implements OnInit {

public myFile:any;

  constructor() { }

  ngOnInit() {
  }

changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(" output :"+ myReader.result);
    }

    myReader.readAsText(file);
  }


}

