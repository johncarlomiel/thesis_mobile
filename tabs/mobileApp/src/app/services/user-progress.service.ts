import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { config } from '../configs/config';
@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  IP: string = config.IP;
  constructor(private http: HttpClient, private storage: Storage) { }

  getProgress(token) {
    const url = this.IP + "/user/get-progress";
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
    }
    return this.http.get<Progress[]>(url, httpOptions);

  }


}
interface Progress {
  basic_info: boolean,
  eform: boolean,
  more_info: boolean,
  problems: boolean,
}
