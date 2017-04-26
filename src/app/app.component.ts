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
      firstName: ['',[Validators.required, Validators.minLength(3)]],
      lastName: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit(user) {
    console.log(user);
  }
}
