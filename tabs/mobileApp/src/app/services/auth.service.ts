import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { config } from '../configs/config';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  IP: string = config.IP;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {



  }

  checkSession(token) {

    //Check if there is a token inside localStorage

    //Verify the token
    const url = this.IP + "/auth/users/checkSession";
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.get<UserInfo>(url, httpOptions);
  }

  getPayload(token) {
    const url = this.IP + "/auth/payload";
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.get<Payload>(url, httpOptions);
  }

  login(username, password) {
    const url = this.IP + "/auth/users/login";
    const data = {
      username,
      password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(url, data, httpOptions).pipe(
      map((data) => {
        return data;
      })
    );

  }





}


interface UserInfo {
  id: number,
  name: string,
  username: string,
  iat: number,
  exp: number
}
interface Payload {
  dp_path: string,
  exp: number,
  iat: number,
  id: number,
  name: string,
  username: string
}

