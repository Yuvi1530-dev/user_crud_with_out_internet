import { Component, OnInit } from '@angular/core';
import { SampleService } from '../service/sample.service'
import { Observable } from "rxjs";
import * as $ from'jquery'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  public start: Date = new Date (); 
    public end: Date = new Date ();
  imge: any=''
  AddnewData: any = '';
  limit: number = 3;
  offset: number = 0;
  page_value: number = 1;
  current_page: any = 1;
  filteredUsers: any = [
    {"id": 1,
    "image":'',
    "product_name": "",
    "detail": "",
    "price": "",
    "quantity": "",
    "total": "",
    "date": "",
    "status": true}];
  Olddata: any = [];
  searchText: string = '';
  constructor() {

  }
  ngOnInit(): void {
if(localStorage.getItem("product_dat")){
this.Olddata = JSON.parse(localStorage.getItem("product_dat") || "[]")
this.filteredUsers = JSON.parse(localStorage.getItem("product_dat") || "[]" );
}
this.getTask();
  }
   getTask() {
    const taskCreatedAt = localStorage.getItem("taskCreatedAt");
    const timePassed = Date.now() - Number(taskCreatedAt);
  
    if (timePassed > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("taskCreatedAt");
      localStorage.removeItem("product_dat");

    }
  
    return localStorage.getItem("taskCreatedAt");
  }
  onDateSort() {
    const filteredData = this.filteredUsers.sort((a: any, b: any) =>
      a.date.localeCompare(b.date));
    this.filteredUsers = filteredData;
  }

  filter(event: any, ty: any) {
    let search = event.target.value;
    if (search.length != 0) {
      this.filteredUsers = this.filteredUsers.filter((searchData: any) => {
        let values = Object.values(searchData);
        let flag = false
        values.forEach((val: any) => {
          if (val.toString().toLowerCase().indexOf(search) > -1) {
            flag = true;
            return;
          }
        })
        if (flag) {
          return searchData
        }
        // if (type=="product") {
        //   return searchData.product_name == search;
        // } else if(type=="details") {
        //   return searchData.detail == search;
        // } else if(type=="price") {
        //   return searchData.price == search;
        // } else {
        //   return false
        // }
        // let search = event;
        // let values = Object.values(searchData);
        // let flag = false
        // values.forEach((val: any) => {
        //   if (val.toString().toLowerCase().indexOf(search) > -1) {
        //     flag = true;
        //     return;
        //   }
        // })
        // if (flag) {
        //   return searchData
        // }
      });
    } else {
      this.filteredUsers = this.Olddata
    }

  }

  onEdit(userObj: any) {
    
    userObj.status = true;
    this.AddnewData = '';
  }
  onAdd() {
    this.AddnewData = this.filteredUsers.length + 1;
    const obj = {
      "id": this.filteredUsers.length + 1,
      "image":'',
      "product_name": "",
      "detail": "",
      "price": "",
      "quantity": "",
      "total": "",
      "date": "",
      "status": true
    };
    this.filteredUsers.unshift(obj);
    localStorage.setItem("product_dat",JSON.stringify(this.filteredUsers))
  }
  onUpdate(userObj: any) {
    
   userObj.image=this.imge
    userObj.status = false;
    this.AddnewData = '';
    localStorage.setItem("product_dat",JSON.stringify(this.filteredUsers))
    //write api call and send obj
    var date =Date.now()
    localStorage.setItem("taskCreatedAt",date.toString());
  }
  onCancel(obj: any) {

    if (this.AddnewData != '') {
      let findIndex = this.filteredUsers.findIndex((element: any) => element.id == obj.id);
      this.filteredUsers.splice(findIndex, 1);
    }
    obj.status = false;
  }

  onDelete(obj: any) {
    Swal.fire({
      title: 'Delete',
      showCancelButton: false,
      text: 'Are you sure you want delete this?',
      icon: 'error',
      confirmButtonText: 'Okay'
    }).then((result)=>{
  if(result.isConfirmed){
    let findIndex = this.filteredUsers.findIndex((element: any) => element.id == obj.id);
    this.filteredUsers.splice(findIndex, 1);
    localStorage.setItem("product_dat",JSON.stringify(this.filteredUsers))
  }
    });
    
  }

  getPage(event: any) {

  }
  profileUpload(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = (file: any) => {
        this.imge=file.target.result;
      }
    }
  }
}
