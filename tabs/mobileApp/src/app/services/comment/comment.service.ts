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
export class CommentService {
  IP: string = config.IP;
  commentSocket = io(config.IP + "/comments");
  constructor(private http: HttpClient, private storage: Storage) { }


  sendComment(event_id, user_id, message) {
    this.commentSocket.emit('send comment', event_id, user_id, message);
  }
  deleteComment(comment_id, event_id) {
    this.commentSocket.emit('delete comment', comment_id, event_id);
  }

  editComment(comment: { any }, event_id, newComment) {
    this.commentSocket.emit('edit comment', comment, event_id, newComment);
  }

  receiveNewCommentUpdating(): Observable<any> {
    return Observable.create((obs) => {
      this.commentSocket.on('new comment from edit', (comment, event_id) => {
        obs.next({
          comment,
          event_id
        });
      });
    });
  }

  receiveNewCommentsDeletion(): Observable<any> {
    return Observable.create((obs) => {
      this.commentSocket.on('new comment from deletion', (event, comments, comment_id) => {
        obs.next({
          event,
          comments,
          comment_id
        });
      });
    });
  }

  receiveNewComment(): Observable<any> {
    return Observable.create((obs) => {
      this.commentSocket.on('new comment', (event, comment) => {
        obs.next({
          event,
          comment
        });
      });
    });
  }


}
