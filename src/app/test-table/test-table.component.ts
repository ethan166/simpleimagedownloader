import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { Car } from './car';
import { TestServiceService } from './test-service.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit {

  cars: Car[];
  selectedCars: Car[];
  cols: any[];
 // rowGroupMetadata: any;
  constructor(private carService: TestServiceService) { }

  ngOnInit(): void {
    this.carService.getCarsSmall().subscribe(data =>{
      this.cars = data
      //console.log(data);
   });

   this.cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
    ];
  }
  download() {
    let date: Date = new Date(); 
    var extension: string = date.toTimeString()
    var zip = new JSZip();
    var folder = zip.folder("Sample_" + extension );

   // zip.file(this.selectedCar4.brand, "Hello " + this.selectedCar4.color);
    this.selectedCars.forEach((car) =>
      folder.file(car.brand, "Hello" + car.color)
      
    );

   zip.generateAsync({ type: "blob" })
   .then(function (content) {
     FileSaver.saveAs(content, "Sample.zip");
   });

  }
}
