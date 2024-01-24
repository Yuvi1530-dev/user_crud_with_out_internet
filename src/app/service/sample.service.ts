import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor() { }

  public getFun = new BehaviorSubject<{value: any}>({value:null});

  retrunValue$=this.getFun.asObservable();

  setValue(value:any){
    this.getFun.next({value})
  }
}
