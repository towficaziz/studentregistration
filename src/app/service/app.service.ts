import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl= "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }

  // POST GET PUT DELETE Method

  postStudent(data: any){
    return this.http.post<any>(this.baseUrl, data);
  }

  getStudent(){
    return this.http.get<any>(this.baseUrl);
  }

  putStudent(data: any, id:number){
    return this.http.put<any>(this.baseUrl+'/'+id, data);
  }

  deleteStudent(id: number){
    return this.http.delete<any>(this.baseUrl+'/'+id);
  }
}
