import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Search } from "./app.component";

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    getData(data?: Search){
        return this.http.get("http://localhost:3000/schooldata", {
            params: {
                key: data?.key || "", 
                value: data?.value || ""
            }
        });
        
    }
}