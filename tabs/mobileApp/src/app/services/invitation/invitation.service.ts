import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { config } from '../../configs/config';
@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  IP = config.IP;
  constructor(private http: HttpClient, private storage: Storage) { }



  getPendingInvitation(token) {
    const url = this.IP + "/user/invitation";
    const params = new HttpParams().set("status", "pending");
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    }

    return this.http.get<Event[]>(url, httpOptions);
  }

  acceptInvitation(token, event_id) {
    const url = this.IP + "/user/invitation";
    const body = {
      status_val: "accepted",
      event_id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.patch<UpdateRes>(url, body, httpOptions);
  }

  declineInvitation(token, event_id) {
    const url = this.IP + "/user/invitation";
    const body = {
      status_val: "declined",
      event_id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.patch<UpdateRes>(url, body, httpOptions);
  }




}


interface Event {
  created_at: string,
  date: string,
  description: string,
  event_id: number,
  likes_counter: number,
  location: string,
  name: string,
  poster_url: string,
  seeMore: boolean,
  time_from: string,
  time_to: string
}

interface UpdateRes {
  message: string
}