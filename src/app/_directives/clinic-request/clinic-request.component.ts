import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

import { StatesListService } from '../../_services/states-list.service';
import { ClinicData } from '../../_models/clinic-data';
import { ClientTypeVaccinationService } from '../../_services/clienttype-vaccination.service';
import { ClinicService } from '../../_services/clinic.service';
import { SharedService } from '../../_services/shared.service';
import { AuthService } from '../../_services/auth.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'clinic-request',
  templateUrl: './clinic-request.component.html',
  styleUrls: ['./clinic-request.component.scss']
})
export class ClinicRequestComponent implements OnInit {

  @Input() data: ClinicData;
  @Input() action: string = 'create';
  @Input() status: string = '';
  @Input() user: string = '';
  @Input() type: string = '';

  @Output() submitCB: EventEmitter<any> = new EventEmitter();
  @Output() cancelCB: EventEmitter<any> = new EventEmitter();
  @Output() rejectCB: EventEmitter<any> = new EventEmitter();
  @Output() reAssignCB: EventEmitter<any> = new EventEmitter();

  isConfirmed: boolean = false;
  isCancelledStore:boolean=false;
   isSL: boolean = false;
  states: any;
  hasError: boolean = false;
  vaccinationList: any;
  updatedVaccinationList = [];
  popupMsg: string ;
  success: boolean = true;
   showModal: boolean = false;
   notesMandatory: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private authService : AuthService,private statesService: StatesListService, private clientTypeVaccinationService: ClientTypeVaccinationService , private clinicService : ClinicService,private sharedService : SharedService) { }

  ngOnInit() {
    this.states = this.statesService.getStates();
    var that = this;
    this.notesMandatory=false
     this.sharedService.notifyUserTypeObservable$.subscribe((res) => {
       this.isSL = this.clinicService.selectedUserType == "SL";
       this.updatedVaccinationList = this.clinicService.updatedVaccinationList;
       this.updatedVaccinationList = this.updatedVaccinationList.map(function (el) {
       return el.trim();
    });
       debugger;
    });
    
    
    console.log(this.states);
    this.isSL = this.data.userType == "SL";
    this.isConfirmed = (this.status.toLowerCase() == "confirmed" || this.status.toLowerCase() == "completed");
    this.isCancelledStore=this.user=='store' && this.status.toLowerCase() == "cancelled";

    this.data.vaccinations = [];
    this.clientTypeVaccinationService.getVaccinationList(this.data.userType).
      subscribe(data => {
        let responseJson = data;

        console.log("inside subscribe");
        console.log(data);
        console.log(responseJson);
        this.vaccinationList = data;
        console.log(this.vaccinationList);
        console.log('clinic data not added successfully');

        //this.loading = false;
      }, error => {
        console.log(error);
        //this.loading = false;
      });

    console.log("writing");
    console.log(this.vaccinationList);
    // this.vaccArray=this.vaccinationList
    // console.log(this.vaccArray);
  }

  ngAfterViewInit() {
    let data = this.data;
    $(function () {
      var date = new Date();
      //use the constructor to create by milliseconds
      var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      $('#clinicDate1').datetimepicker({
        format: 'MM/DD/YYYY',
        minDate: tomorrow
      }).on("dp.change", function (e) {
        console.log("clinicDate -> dp.change", data)
        data.clinicDate = e.target.children[0].value;
        //this.data.clinicDate = data.clinicDate;
        $('#clinicDate').val(data.clinicDate);
        //console.log("THIS", this.data.clinicDate);
      });
      data.clinicDate = '';
      var start = tomorrow;
      start.setHours(0, 0, 0, 0);
      var end = tomorrow;
      end.setHours(23, 59, 59, 999);
      $('#clinicStartTime1').datetimepicker({
        format: 'hh:mm:A',
        // minDate: start,
        // maxDate: end
      }).on("dp.change", function (e) {
        data.clinicStartTime = e.target.children[0].value;
        // $('#clinicEndTime1').data("DateTimePicker").minDate(e.date);
        $('#clinicEndTime').val('');
        data.clinicEndTime = '';
      });
      $('#clinicEndTime1').datetimepicker({
        format: 'hh:mm:A',
        // minDate: start,
        maxDate: end
      }).on("dp.change", function (e) {
        data.clinicEndTime = e.target.children[0].value;
        let startTimeArr: any[] = data.clinicStartTime.split(":");
        if(startTimeArr[2] == "PM") {
          startTimeArr[0] = parseInt(startTimeArr[0]) + 12;
        }
        let endTimeArr: any[] = data.clinicEndTime.split(":");
        if(endTimeArr[2] == "PM" && parseInt(endTimeArr[0]) != 12) {
          endTimeArr[0] = parseInt(endTimeArr[0]) + 12;
        }
        console.log(startTimeArr, endTimeArr);
        if(endTimeArr[0] < startTimeArr[0]) {
          data.clinicEndTime = '';
          $('#clinicEndTime').val('');
        } else if(endTimeArr[0] == startTimeArr[0]) {
          if(endTimeArr[1] < startTimeArr[1]) {
            data.clinicEndTime = '';
            $('#clinicEndTime').val('');
          }
        }
        // $('#clinicStartTime1').data("DateTimePicker").maxDate(e.date);
      });
    });
  }

  dateKeyUp(evt) {
    if ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 &&
      evt.keyCode <= 105)) {
      evt = evt || window.event;
      let val = evt.target.value;
      let size = val.length;

      if ((size == 2 && val > 31) || (size == 5 && Number(val.split('/')[1]) > 12)) {
        alert('Invalid Date');
        evt.target.value = '';
        return;
      }

      if ((size == 2 && val < 32) || (size == 5 && Number(val.split('/')[1]) < 13)) {
        evt.target.value += '/';
      }
    }
  }
  timeKeyUp(evt) {
    if ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 &&
      evt.keyCode <= 105)) {
      evt = evt || window.event;
      let val = evt.target.value;
      let size = val.length;

      if ((size == 2 && val > 12) || (size == 5 && Number(val.split(':')[1]) > 60)) {
        alert('Invalid Time');
        evt.target.value = '';
        return;
      }

      if ((size == 2 && val < 13) || (size == 5 && Number(val.split(':')[1]) < 61)) {
        evt.target.value += ':';
      }
    }
  }

  showPopup(id) {
    $("#" + id).modal().on('hidden.bs.modal', function () {
      if (id == "successPopup") {
        $("#ccForm")[0].reset();
      }
    });
  }

   showConfirmClinicPopup(id) {
          console.log(this.success);
          
          $("#" + id).modal();
          this.showModal = true;
        }

  goNext(event, nextId) {
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46) {
      return;
    }
    if (event.target.value.length == event.target.maxLength) {
      $("#" + nextId).focus();
    }
    if (nextId == 'email') {
      for (var i = 1; i <= 9; i++) {
        if (this.data.phoneNum1 == (111 * i).toString() &&
          this.data.phoneNum2 == (111 * i).toString() &&
          this.data.phoneNum3 == (1111 * i).toString()) {
          this.data.phoneNum1 = '';
          this.data.phoneNum2 = '';
          this.data.phoneNum3 = '';
          break;
        }
      }
    }
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.data.vaccinations.push(option);
    } else {
      for (var i = 0; i < this.vaccinationList.length; i++) {
        if (this.data.vaccinations[i] == option) {
          this.data.vaccinations.splice(i, 1);
        }
      }
    }
    console.log(this.data.vaccinations);
  }

  cancelClinic() {
    console.log(this.data.notes)
    this.notesMandatory=false
    if(this.data.notes==undefined || this.data.notes.trim()==''){
      this.data.notes=''
    
    this.notesMandatory=true 
    }else{
      this.cancelCB.emit();
   
    }
  
  }

  cancel() {
    this.notesMandatory=false
    this.cancelCB.emit();
    }

  // submitCancel(){
  //   $("#cancelPopup").modal('hide');
  //   this.cancelCB.emit();
  // }

  reject() {
    console.log(this.data.notes)
    this.notesMandatory=false
    if(this.data.notes==undefined || this.data.notes.trim()==''){
      this.data.notes=''
    
    this.notesMandatory=true 
    }else{
      this.rejectCB.emit();
   
    }
    
  }

  reAssign() {
    console.log("reAssign");
    this.notesMandatory=false
    this.reAssignCB.emit();
  }

  clinicNameKeydown(event) {
    let val = event.target.value;
    if(val == '' || val.indexOf(' ') != -1) {
      // If 1st character is space, then ignore it!
      if(event.keyCode == 32)
        return false;
    }
  }

  clinicDateChanged(event) {
    console.log("clinicDate -> clinicDateChanged")
    if (!this.isValidDate(event.target.value)) {
      console.log("clinicDate -> clinicDateChanged -- invalid")
      this.data.clinicDate = '';
    } else {
      this.data.clinicDate = event.target.value;
    }
  }

  clinicStartTimeChanged(event) {
    this.data.clinicStartTime = event.target.value;
  }
  clinicEndTimeChanged(event) {
    this.data.clinicEndTime = event.target.value;
  }

  isValidDate(s) {
    // format M(M)/D(D)/(YY)YY
    var dateFormat = /^\d{1,2}[\.|\/|-]\d{1,4}[\.|\/|-]\d{1,4}$/;

    if (dateFormat.test(s)) {
      // remove any leading zeros from date values
      s = s.replace(/0*(\d*)/gi, "$1");
      var dateArray = s.split(/[\.|\/|-]/);

      // correct month value
      dateArray[0] = dateArray[0] - 1;

      // correct year value
      if (dateArray[2].length < 4) {
        // correct year value
        dateArray[2] = (parseInt(dateArray[2]) < 50) ? 2000 + parseInt(dateArray[2]) : 1900 + parseInt(dateArray[2]);
      }

      console.log("Checking date: " + dateArray[2] + "," + dateArray[0] + "," + dateArray[1])
      var testDate = new Date(dateArray[2], dateArray[0], dateArray[1]);
      if (testDate.getDate() != dateArray[1] || testDate.getMonth() != dateArray[0] || testDate.getFullYear() != dateArray[2]) {
        console.log("invalid date!");
        return false;
      } else {
        return true;
      }
    } else {
      console.log("Format is wrong!");
      return false;
    }
  }

  submit() {
    console.log("submit");
    this.submitCB.emit();
  }

  addDefaults(event) {

    if (this.action == 'create' || this.status == 'Pending') {
      let val_4_64 = $("#participants_4_64").val();
      let val_65_up = $("#participants_65_up").val();
      if (val_4_64 != '' && val_4_64 != undefined) {
        if (val_65_up == '' || val_65_up == undefined) {
          this.data.participants_65_up = 0;
        }
      }

      if (val_65_up != '' && val_65_up != undefined) {
        if (val_4_64 == '' || val_4_64 == undefined) {
          this.data.participants_4_64 = 0;
        }
      }
    }
    console.log("event...");
    console.log(event);
    this.notesMandatory=false
    if( this.status == 'Pending' && event.target.id =='confBtn') {
      this.showPopup("confirmPopup");
    }

   
    
  }

  submitConfirm(){
     debugger;
    console.log("confirmClinic")
    this.data.clinicID = this.authService.clinicID;
    this.data.updatedBy=this.user
    this.data.statCd = "Confirmed";
    this.clinicService.updateClinicRequestStatCd(this.data).subscribe(data =>{
      debugger;
        console.log('data' , data);
        let responseJson = JSON.stringify(data);
        var responseData = JSON.parse(responseJson);
        if (responseData.status == 'success') {
          this.success = true;
          this.showConfirmClinicPopup('confirmClinicPopup');
          this.popupMsg = "Clinic data has been updated successfully"
         console.log('clinic data has been added successfully');
      } else {
         console.log('clinic data not added successfully');
       }
     }, error => {
       
       console.log(error);
       this.popupMsg = "Updation error, please try again later";
       this.success = false;
       this.showConfirmClinicPopup('confirmClinicPopup');
     });
    $("#confirmPopup").modal('hide');
    this.submitCB.emit();
  }

  _isPeriod(code) {
    return code == 190;
  }
  _isDash(code) {
    return code == 189;
  }
  isNumber(code) {
    return (code >= 48 && code <= 57);
  }
  isAlpha(code) {
    return (code >= 'a' && code <= 'z') || (code >= 'A' && code <= 'Z');
  }

  onlyNumber(event) {
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46) {
      return true;
    }
    console.log(event);
  //  if((event.target.id=='participants_4_64'||event.target.id=='participants_65_up') &&event.target.value.length == 3) {
     if (event.target.value.length ==event.target.maxlenth){
      return false; 
    }
    return (!this.isAlpha(event.key) &&
      !this.isInvalidChar(event.key)) && (event.key != '-');
  }

  //// Validations //// 
  invalidChars = "^/[]:;<>?~`!@#$%&*()-+_=|\}{\"',.";
  invalidCharsForEmail = "^/[]:;<>?~`!#$%&*()|\}{\"',";
  isInvalidChar(key) {
    return (this.invalidChars.indexOf(key) != -1);
  }
  validateEmail(event) {
    if (this.invalidCharsForEmail.indexOf(event.key) != -1) {
      return false;
    }
    let val = event.target.value;
    if (val != undefined && val.length > 1) {
      var atCount = (val.match(/\@/g) || []).length;
      return !(atCount > 0 && event.keyCode == 50);
    }
    return true;
  }

   navigate() {
    this.showModal = false;
    $("#confirmClinicPopup").modal('hide');
    if(this.authService.user=='store'){
    this.router.navigateByUrl('/store-user/upcoming');
    }else  if(this.authService.user=='dl'){
      this.router.navigateByUrl('/district-leader/upcoming');
      }
 
   }
}
