import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { Product } from './product';
import { ProductServiceService } from './product-service.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-table-basic-demo',
  templateUrl: './table-basic-demo.component.html',
  styleUrls: ['./table-basic-demo.component.css']
})
export class TableBasicDemoComponent implements OnInit {
  products: Product[];
  value2: boolean;
  images : string[];

  selectedProducts: Product[];
  //selectedImages: string[] = [];
  cols: any[];
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.productService.getJSON().subscribe(data =>{
       this.products = data;
       //console.log(data);
    });

    this.cols = [
      { field: 'code', header: 'Code'},
      { field: 'name', header: 'Name'},
      { field: 'category', header: 'Category'},
      { field: 'quantity', header: 'Quantity'},
      { field: 'image', header: 'Image'}
    ];
  }

  // download() {
  //   let date: Date = new Date(); 
  //   var extension: string = date.toTimeString()
  //   var zip = new JSZip();
  //   var folder = zip.folder("Sample_" + extension );
  
  //   this.selectedProducts.forEach((car) =>
  //     folder.file(car.name, "Hello" + car.image)
      
  //   );

  //  zip.generateAsync({ type: "blob" })
  //  .then(function (content) {
  //    FileSaver.saveAs(content, "Sample.zip");
  //  });

  // }

  download() {
    let count = 0;
    var zip = new JSZip();
    var imgFolder = zip.folder("images"); 
    this.selectedProducts.forEach((product) => {
      const filename = product.image.split('/')[product.image.split('/').length - 1];
      console.log(filename);
      JSZipUtils.getBinaryContent(product.image, (err, data) => {

        console.log(data);
        if (err) {
          throw err;
        };

      imgFolder.file(filename, data, {binary: true});
      count++;
      if(count === this.selectedProducts.length) {
        zip.generateAsync({type : "blob"}). then(function (content) {
          FileSaver.saveAs(content, "img.zip");
        });
      }
    });
  });
}

}
     
  



    // download() {
  //   var zip = new JSZip();
  //   zip.file("Title.txt", this.title);
  //   var imgFolder = zip.folder("images");
  //   for (let i = 0; i < this.uploadFiles?.length; i++) {
  //     imgFolder.file(this.uploadFiles[i].name, this.uploadFiles[i], { base64: true });
  //   }
  //   zip.generateAsync({ type: "blob" })
  //     .then(function (content) {
  //       FileSaver.saveAs(content, "Sample.zip");
  //     });
  // }

  // downloadAsZip(): void {
  //   let count = 0;
  //   const zip = new JSZip();

  //   this.urls.forEach((url) => {
  //     const filename = url.split('/')[url.split('/').length - 1];

  //     JSZipUtils.getBinaryContent(url, (err, data) => {
  //       if (err) {
  //         throw err;
  //       }

  //       zip.file(filename, data, {binary: true});
  //       count++;

  //       if (count === this.urls.length) {
  //         zip.generateAsync({type: 'blob'}).then((content) => {
  //           const objectUrl: string = URL.createObjectURL(content);
  //           const link: any = document.createElement('a');

  //           link.download = 'sample-pdf-files.zip';
  //           link.href = objectUrl;
  //           link.click();
  //         });
  //       }
  //     });
  //   });
  // }


