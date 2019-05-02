import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { config } from '../../configs/config';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class LikeService {
  IP: string = config.IP;
  likesSocket = io(config.IP + "/likes");
  constructor(private http: HttpClient, private storage: Storage) { }



  like(event_id, user_id) {
    this.likesSocket.emit('like', event_id, user_id, 'like');
  }
  unlike(event_id, user_id) {
    this.likesSocket.emit('like', event_id, user_id, 'unlike');
  }

  newLike(): Observable<any> {
    return Observable.create((obs) => {
      this.likesSocket.on('new like', (event) => {
        obs.next(event);
      });
    });
  }


}
