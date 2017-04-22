import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';
import { config } from '../config';

@Injectable()
export class TweetService {
  private url = config.backend_url;
  private socket;

  constructor (private http: Http) { }

  connectToStream() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('tweet', (tweet) => {
        observer.next(tweet);
      });
      return () => {
        this.socket.disconnect();
      }; 
    })
    return observable;
  }

  disconnectFromStream(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.url + '/closetwitterstream', {dummy:"object"}, options)
      .catch(this.handleError)
      .toPromise()
      .then(()=>{
        console.log("disconnected from twitter stream");
      });
    //this.socket.disconnect();
  }

  setSearchTerm(searchTerm: string): Observable<any> {
    return this.http.get(this.url + `/stream/${searchTerm}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
