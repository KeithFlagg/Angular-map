import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder } from '@angular/forms';

//bind search to key and value
export interface Search{
  key: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent{
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
    ){
    //fetches data from backend
    this.showData()
  }

  title = 'choptank-map';
  latitude = 41.4925;
  longitude = -99.9018;
  geoJsonObject: any;
  tableData: any[] = [];
  filterForm = this.formBuilder.group({
    //dropdown item
    key: '',
    //input
    value: ''
    });

  onSubmit(): void{
    this.showData(this.filterForm.value);
    console.log(this.filterForm.value);
  }

  showData(data?: Search) {
    console.log(data);
    return this.dataService.getData(data)
      .subscribe((data: any) => {
        console.log(data);
        this.geoJsonObject = { ...data };
        this.tableData = [ ...data.features ];
        console.log(this.tableData);
      })
  }
}
let map: google.maps.Map;

