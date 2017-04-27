import { Component, OnInit, Inject } from '@angular/core';
import {Validators, FormGroup, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer.model';

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
      email: ['',[Validators.required, Validators.pattern("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/")]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
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
