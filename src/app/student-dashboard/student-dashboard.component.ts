import { Studentmodel } from './../model/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../service/app.service';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  studentForm!: FormGroup;

  studentObj = new Studentmodel;


  studentList: any=[];

  btnSaveShow:boolean=true;
  btnUpdateShow:boolean=false;

  constructor(private fb: FormBuilder, private apis: AppService) { 
     this.studentForm=fb.group({});

  }

  

  ngOnInit(): void {
    this.studentForm=this.fb.group({
      name:['', Validators.required],
      class:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      // email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      mobile:['', [Validators.required,
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')
    ]]
    });
    this.getStudent();
    
  }
/* code for search function */
  searchText: string='';
  searchTextEntered(searchValue:string){
    this.searchText= searchValue;
  }
  
  addStudent(){
    this.studentObj.name= this.studentForm.value.name;
    this.studentObj.class= this.studentForm.value.class;
    this.studentObj.email= this.studentForm.value.email;
    this.studentObj.mobile= this.studentForm.value.mobile;

    this.apis.postStudent(this.studentObj).subscribe({next: _res=>{
      alert("Student Record Added!");
      this.getStudent();
      this.studentForm.reset();
    }
  } )
  
  }

  getStudent(){
    this.apis.getStudent().subscribe(res=>{
      this.studentList=res;
    })
  }

  deleteStudent(data:any){
    this.apis.deleteStudent(data.id).subscribe( _res=>{
      alert("Student Record Deleted!");
     this.getStudent();
    }
    )
  }

  editStudent(data:any){
    this.studentForm.controls["name"].setValue(data.name);
    this.studentForm.controls["class"].setValue(data.class);
    this.studentForm.controls["email"].setValue(data.email);
    this.studentForm.controls["mobile"].setValue(data.mobile);
    this.studentObj.id=data.id;
    this.showUpdate();
    
  }

   updateStudent(){
    this.studentObj.name= this.studentForm.value.name;
    this.studentObj.class= this.studentForm.value.class;
    this.studentObj.email= this.studentForm.value.email;
    this.studentObj.mobile= this.studentForm.value.mobile;

    this.apis.putStudent(this.studentObj,this.studentObj.id).subscribe( _res =>{
     
      alert('Student record Updated!')
      this.getStudent();
      this.showSave();
      this.studentObj.id=0;
      this.studentForm.reset();

    }
  )
      
   }

  showSave(){
    this.btnSaveShow=true;
    this.btnUpdateShow=false; 
  }

  showUpdate(){
    this.btnSaveShow=false;
    this.btnUpdateShow=true; 
  }

}

