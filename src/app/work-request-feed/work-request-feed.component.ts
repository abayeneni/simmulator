import { Component, OnInit } from '@angular/core';
import {DOCUMENT} from '@angular/common';
// import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-work-request-feed',
  templateUrl: './work-request-feed.component.html',
  styleUrls: ['./work-request-feed.component.scss']
})
export class WorkRequestFeedComponent implements OnInit {
  
  constructor (@Inject(DOCUMENT) private document: any) {
   
  ngOnInit() {
  }

}
