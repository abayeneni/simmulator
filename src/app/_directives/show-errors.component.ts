// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
   <ul *ngIf="shouldShowErrors()" style="list-style:none;padding:0;">
     <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
   </ul>
 `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Entry required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'Invalid entry', // 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input() private f: NgForm;
  @Input() private control: NgModel;
  @Input() private sameValue: NgModel;
  @Input() private other: NgModel;
  @Input() private invalidVal: string;

  shouldShowErrors(): boolean {
    let ret = this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched || this.f.submitted) ||
      (this.control.touched && this.sameValue != undefined && this.sameValue.value != this.control.value) ||
      (this.invalidVal != undefined && this.control.value == this.invalidVal);

    if (this.other != undefined) {
      // ret - true means, there is an error, now check other field
      ret = ret && (this.other.value == undefined || this.other.value == '');
    }
    return ret;
  }

  listOfErrors(): string[] {
    if (this.other != undefined && (this.other.value == undefined || this.other.value == '')) {
      return ["Either " + this.other.name + " or " + this.control.name + " is required"];
    }
    if (this.invalidVal != undefined && this.control.value == this.invalidVal) {
      return ["Invalid value"];
    }

    if (this.sameValue != undefined) {
      if (this.sameValue.valid && this.sameValue.value != this.control.value) {
        return ["Must be same as " + this.sameValue.name];
      }
    }

    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}