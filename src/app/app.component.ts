import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  customerForm: FormGroup;
  user: FormGroup;

  form: FormGroup;
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

  onSubmit(user) {
    console.log(user);
  }
}
