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
      firstName: '',
      lastName: '',
      email: '',
      password: null
    })
  }

  onSubmit(user) {
    console.log(user);
  }
}
