import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  public inputType:string='password';

  public showPassword(event:any):void{

    if(event.target.checked){
      this.inputType='text';
    }
    else{
      this.inputType='password';
    }

  }
  
  bUrl= "http://localhost:3000/signupUsers";

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { 
    this.signupForm=formBuilder.group({});
  }

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      fullName:['', Validators.required],
      email:['', Validators.email],
      mobile:['', [Validators.required,
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'),Validators.maxLength(11)
    ]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe(res=>{
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Something went wrong !!")
    }
    )

  }

}
