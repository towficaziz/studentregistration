import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // visible:boolean=true;
  // changetype:boolean=true;

  // viewpass(){
  //   this.visible=!this.visible;
  //   this.changetype=!this.changetype;
  // }
  
  public inputType:string='password';

  public showPassword(event:any):void{

    if(event.target.checked){
      this.inputType='text';
    }
    else{
      this.inputType='password';
    }

  }

  public loginForm! : FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  // http://localhost:3000/signupUsers

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }else{
        alert("User not Found");
      }
    }, err=>{
      alert("Something went wrong!!");
    })
  }

 

}
