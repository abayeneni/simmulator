import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
@Injectable()
export class SharedService {
  // observables for immediate changes
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  private notifyUserType = new Subject<any>();

 notifyUserTypeObservable$ = this.notifyUserType.asObservable();

  constructor() {
  }
  public notifyOther() {
    this.notify.next();
  }
  public notifyOtherUserType() {
    this.notifyUserType.next();
  }

}