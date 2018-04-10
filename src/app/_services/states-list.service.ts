import { Injectable } from '@angular/core';
import { State } from '../_models/state';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { statesListURL } from './data.service';
 
@Injectable()
export class StatesListService {

 public getStates()  {
    
      return [
      new State(1,'AK' ),
     new State(2,'AL' ),
     new State(3,'AR'),
     new State(4,'AZ'),
     new State(5,'AS'),
     new State(6,'CA'),
     new State(7,'CO'),
     new State(8,'CT'),
     new State(9,'DC'),
     new State(10,'DE'),
     new State(11,'FL'),
     new State(12,'FM'),
     new State(13,'GA'),
     new State(14,'GU'),
     new State(15,'HI'),
     new State(16,'IA'),
     new State(17,'ID'),
     new State(18,'IL'),
     new State(19,'IN'),
     new State(20,'KS'),
     new State(21,'KY'),
     new State(22,'LA'),
     new State(23,'MA'),
     new State(24,'MD'),
     new State(25,'ME'),
     new State(26,'MH'),
     new State(27,'MI'),
     new State(28,'MN'),
     new State(29,'MO'),
     new State(30,'MP'),
     new State(31,'MS'),
     new State(32,'MT'),
     new State(33,'NC'),
     new State(34,'ND'),
     new State(35,'NE'),
     new State(36,'NH'),
     new State(37,'NJ'),
     new State(38,'NM'),
     new State(39,'NV'),
     new State(40,'NY'),
     new State(41,'OH'),
     new State(42,'OK'),
     new State(43,'OR'),
     new State(44,'PA'),
     new State(45,'PR'),
     new State(46,'PW'),
     new State(47,'RI'),
     new State(48,'SC'),
     new State(49,'SD'),
     new State(50,'TN'),
     new State(51,'TX'),
     new State(52,'UT'),
     new State(53,'VA'),
     new State(54,'VI'),
     new State(55,'VT'),
     new State(56,'WA'),
     new State(57,'WI'),
     new State(58,'WV'),
     new State(59,'WY')
     
    ];
  }
}