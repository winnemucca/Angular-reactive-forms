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
  return {'match': true};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  customerForm: FormGroup;
  user:Customer;
  passwordMessage: string;

  private validationMessages = {
    required: 'Please enter your password.',
    validator: 'Password mismatch',
    minlength: 'Please limit password length between 4-16 characters',
    maxlength: 'Please limit password length between 4-16 characters',
    firstName: {
      required: 'First name is required',
      minlength: 'Name must include at least three letters',
      maxlength: 'Name cannot exceed 16 characters'
    },
    email: {
      required: 'Email is required'
    }
  }
  constructor(private fb: FormBuilder) {
  }

  ngOnInit():void {
    this.customerForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-zA-Z]')]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      security: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]]
      }, {validator: passwordMatcher})

    })

    const passwordControl = this.customerForm.get('security.passwordConfirm');
    passwordControl.valueChanges.debounceTime(1000).subscribe( value => {
      this.setMessage(passwordControl)
    })
  }

  onSubmit() {
    console.log(this.customerForm);
    console.log(JSON.stringify(this.customerForm.value));
  }

  setMessage(c:AbstractControl) {
    this.passwordMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ')
    }
  }
}
