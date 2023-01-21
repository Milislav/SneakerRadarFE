import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  constructor(private http: HttpClient) {
  }

  getPage(request: string): Observable<any> {
    const url = `${environment.sneakerPaginationUrl}${request}`;
    return this.http.get<any>(url);
  }

}
