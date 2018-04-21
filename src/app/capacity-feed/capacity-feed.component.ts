import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacity-feed',
  templateUrl: './capacity-feed.component.html',
  styleUrls: ['./capacity-feed.component.scss']
})
export class CapacityFeedComponent implements OnInit {



public myFile:any;
astInvObj: any; 
fileData:any;
formattedFile:any;
  constructor(private router: Router) { }

  ngOnInit() {
  
  this.astInvObj = { assetId : "" };
          
  
  public columns: Array<any> = [
    { title: 'Capacity Notification Id', name: 'capacityNotificationId', sort: false, className: 'text-center', dataClassName: 'text-center' },
    { title: 'Processing Pharmacy Id', name: 'processingPharmacyId', sort: false, className: 'text-center', dataClassName: 'text-center' },
    { title: 'lookAhead TimeBand', name: 'lookAheadTimeBand_loadTime', className: 'text-center' },
    { title: 'Time Band', name: 'timeBand', className: 'text-center', dataClassName: 'text-center' },
    { title: 'Load Time', name: 'loadTime', className: 'text-center', dataClassName: 'text-center' }
  ];

   public data: Array<any>;
  

changeListener(e) : void {
    //this.readThis($event.target);
    this.fileData = e.target.files[0];
  }
  
  uploadFile()
{
this.readThis(this.fileData);
}

  readThis(inputValue: any) : void {
    var file:File = inputValue; 
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(" output :"+ myReader.result);
      
      // object format 
      this.data=myReader.result;
      
    }

    myReader.readAsText(file);
  }


 public viewClinicRequest($event) {
    console.log($event)
    this.router.navigate(['/store-user/view-clinic-request',
      {
        clinic_id: $event.clinic_id,
        stat_cd: $event.stat_cd,
        user: 'store'
      }]);
  }

}
}

