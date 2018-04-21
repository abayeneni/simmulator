import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {UploadData} from '../_models/upload-data';
import {SimulatorService} from '../_services/simulator.service';
import {StoreFeedRequest} from '../_models/storefeed-request';
import {RetailPharmacyLocation} from '../_models/retail-pharmacy-location';
import {StoreHours} from '../_models/store-hours';
import {StoreAttributes} from '../_models/store-attributes';
import {StoreFeed} from '../_models/store-feed';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-store-feed',
  templateUrl: './store-feed.component.html',
  styleUrls: ['./store-feed.component.scss']
})
export class StoreFeedComponent implements OnInit {

  data: UploadData = new UploadData();
  @Output() submitCB: EventEmitter<any> = new EventEmitter();
  @Output() cancelCB: EventEmitter<any> = new EventEmitter();
  storeFeedRequest: StoreFeedRequest  = new StoreFeedRequest(); 
  errors: Array<string> = [];
  msg: string
  dragAreaClass: string = 'dragarea';
  enableButton: boolean = false;
  @Input() fileExt: string = "csv";
  @Input() maxFiles: number = 1;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
  excelFile: any;
  astInvObj: any;
  public selectedFiles;
  public csvdata: Array<any>;

  // constructor(private fileService: FileService) { }
  constructor(private simulatorService: SimulatorService) {
  }

  ngOnInit() {
   this.astInvObj = { assetId : "" };
    this.enableButton = false

  }

  uploadStoreFile() {
  console.log(this.csvdata);
    this.simulatorService.addMultipleClinics(this.convertToStoreFeedRequest()).subscribe(data => {
      let responseJson = data.json();
      if (responseJson) {
        console.log("successfully uploaded file");
      } else {
        console.log("ERROR UPLOADING");
      }
    }, error => {
      console.log(error.json());
      
    });

  }

  cancel() {
    this.cancelCB.emit();
  }
  
	  changeListener(event) {
	    let files = event.target.files;
	    this.ValidateFiles(files);
	    debugger;
	    this.readThis(this.data.excelFile);
	  }
 
	readThis(inputValue: any) : void {
	    var file:File = inputValue; 
	    var myReader:FileReader = new FileReader();
	
	 	myReader.readAsText(file);
	    myReader.onloadend = function(e){
	    	this.csvdata = myReader.result;
	    	console.log("readThis csv data" +this.csvdata);
	    }
	}

   ValidateFiles(files) {
    this.enableButton = false
    this.msg = ''//Clear message
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
      this.uploadStatus.emit(false);
      return;
    }

    if (this.errors.length === 0) {
      for (var i = 0; i < files.length; i++) {
        this.enableButton = true
        this.msg = files[i].name + " uploaded";
        this.data.excelFile = files[i];
      }
    } else {
      this.msg = ''
    }

  }

	private convertToStoreFeedRequest(): StoreFeedRequest {
		let request: StoreFeedRequest = new StoreFeedRequest();
		 // you can perform an action with read data here
		  console.log("convertToStoreFeedRequest csv data" +this.csvdata);
		let row = this.csvdata.split('\n');
		var isFirst: boolean = true;
      
      	request.storefeed = new Array();
      	row.forEach(function (data){
	    	if(isFirst) {
	      		isFirst = false;
	      		return;
	      	} 
		      let storeFeed = new StoreFeed(); 
		      let retailPharmacyLocation = new RetailPharmacyLocation();
		      let storeAttribute = new StoreAttributes();
		   	  let storeHours = new StoreHours();
		   	  storeFeed.storeHours = new Array(); 
		      let value = data.split(',');
		      //10003,PA,AREA11,REGION75,DISTRICT02,1,CO,1,23:00,Y,23:00,N,23:00,Y,23:00,Y,23:00,N,23:00,Y,23:00,
		      storeFeed.retailStoreId = value[0];
		      retailPharmacyLocation.state = value[1];
		      retailPharmacyLocation.division = value[2];
		      retailPharmacyLocation.region = value[3];
		      retailPharmacyLocation.district = value[4];
		      storeFeed.retailPharmacyLocation = retailPharmacyLocation;
		      storeAttribute.storeType = value[5];
		      storeAttribute.facilityType = value[6];
		      storeAttribute.pharmacyStatus = value[7];
		      storeFeed.storeAttribute = storeAttribute;
		      
		      storeHours.day = "sunday"
		      storeHours.closeHour = value[8];
		      storeHours.twentyFourHourIndicator = value[9];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "monday"
		      storeHours.closeHour = value[10];
		      storeHours.twentyFourHourIndicator = value[11];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "tuesday"
		      storeHours.closeHour = value[12];
		      storeHours.twentyFourHourIndicator = value[13];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "wednesday"
		      storeHours.closeHour = value[14];
		      storeHours.twentyFourHourIndicator = value[15];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "thursday"
		      storeHours.closeHour = value[16];
		      storeHours.twentyFourHourIndicator = value[17];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "friday"
		      storeHours.closeHour = value[18];
		      storeHours.twentyFourHourIndicator = value[19];
		      storeFeed.storeHours.push(storeHours);
		      
		      storeHours = new StoreHours(); 
		      storeHours.day = "saturday"
		      storeHours.closeHour = value[20];
		      storeHours.twentyFourHourIndicator = value[21];
		      storeFeed.storeHours.push(storeHours);
 	      
				request.storefeed.push(storeFeed);
      		});
      	console.log("Read Method "+JSON.stringify(request));
		return request;
		}
		

 
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push("Error: At a time you can upload only " + this.maxFiles + " file");
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = (this.fileExt.split(','))
      .map(function (x) {
        return x.toLocaleUpperCase().trim()
      });
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name + " Allowed Extn is xlsx");
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize)
      this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  }
}
