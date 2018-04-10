import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter,HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadData } from '../../_models/upload-data';
import { Subscription } from 'rxjs'


import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'clinic-request-multiple',
  templateUrl: './clinic-request-multiple.component.html',
  styleUrls: ['./clinic-request-multiple.component.scss']
})
export class ClinicRequestMultipleComponent implements OnInit {


  

  

  @Output() submitCB: EventEmitter<any> = new EventEmitter();
  @Output() cancelCB: EventEmitter<any> = new EventEmitter();
 
  errors: Array<string> =[];
  msg:string
  dragAreaClass: string = 'dragarea';
 enableButton:boolean =false;
  @Input() fileExt: string = "xlsx";
  @Input() maxFiles: number = 1;
  @Input() maxSize: number = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();
 excelFile:any
 @Input() data: UploadData;

  ngOnInit() {
    this.enableButton=false
   
  }
  submit() {
    console.log("inside 1")
  
    this.submitCB.emit();
  }
  cancel() {
    this.cancelCB.emit();
    }

  public selectedFiles;


  

  // constructor(private fileService: FileService) { }
  constructor(){}
  onFileChange(event){
    let files = event.target.files; 
   
    this.ValidateFiles(files);
 }
 @HostListener('dragover', ['$event']) onDragOver(event) {
  this.dragAreaClass = "droparea";
  event.preventDefault();
}
@HostListener('dragend', ['$event']) onDragEnd(event) {
  this.dragAreaClass = "dragarea";
  event.preventDefault();
}
@HostListener('dragleave', ['$event']) onDragLeave(event) {
  this.dragAreaClass = "dragarea";
  event.preventDefault();
}
@HostListener('drop', ['$event']) onDrop(event) {   
  this.dragAreaClass = "dragarea";           
  event.preventDefault();
  event.stopPropagation();
  var files = event.dataTransfer.files;
  this.ValidateFiles(files);
}
ValidateFiles(files){
  this.enableButton=false
  this.msg=''//Clear message
  this.errors = []; // Clear error
  // Validate file size and allowed extensions
  if (files.length > 0 && (!this.isValidFiles(files))) {
      this.uploadStatus.emit(false);
      return;
  }       
  
    if(this.errors.length === 0){
      for (var i = 0; i < files.length; i++) {
        this.enableButton=true
      this.msg=files[i].name +" uploaded";
      this.data.excelFile=files[i];
      }
    }else{
      this.msg=''
    }

}
private isValidFiles(files){
  // Check Number of files
   if (files.length > this.maxFiles) {
       this.errors.push("Error: At a time you can upload only " + this.maxFiles + " file");
       return;
   }        
   this.isValidFileExtension(files);
   return this.errors.length === 0;
}
private isValidFileExtension(files){
  // Make array of file extensions
  var extensions = (this.fileExt.split(','))
                  .map(function (x) { return x.toLocaleUpperCase().trim() });
  for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
          this.errors.push("Error (Extension): " + files[i].name+" Allowed Extn is xlsx");
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
