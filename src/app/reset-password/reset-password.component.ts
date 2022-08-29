import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.resetForm=formBuilder.group({});
  }

  ngOnInit(): void {
    this.resetForm= this.formBuilder.group({
            password:['',[Validators.required, Validators.minLength(8)]]
    })
  }

  resetPassword(){
  }
}
