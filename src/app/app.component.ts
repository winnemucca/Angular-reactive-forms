import { Component, OnInit, Inject } from '@angular/core';
import {Validators, FormGroup, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer.model';


function passwordMatcher(c: AbstractControl): {[key: string]: boolean} |null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('passwordConfirm');
  if(passwordControl.pristine || confirmControl.pristine ) {
    return null;
  }
  if(passwordControl.value === confirmControl.value) {
    return null;
  }
  return {'mismatch': true};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  customerForm: FormGroup;
  user:Customer;
  emailMessage: string;
  form: FormGroup;

  private validateMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address'
  }
  constructor(private fb: FormBuilder) {
  }

  ngOnInit():void {
    this.customerForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      security: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
      }, {validator: passwordMatcher})

    })
  }

  onSubmit() {
    console.log(this.customerForm);
    console.log(JSON.stringify(this.customerForm.value));
  }

  setMessage(c:AbstractControl) {
    this.emailMessage = '';
    if((c.touched || c.dirty) && c. errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validateMessages[key]).join(' ')
    }
  }
}
