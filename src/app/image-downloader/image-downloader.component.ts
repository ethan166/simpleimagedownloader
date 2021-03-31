import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import * as JSZip from 'jszip';
import { Image } from './image';
import { ImageService } from './image.service';
import * as JSZipUtils from 'jszip-utils';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-downloader',
  templateUrl: './image-downloader.component.html',
  styleUrls: ['./image-downloader.component.css']
})
export class ImageDownloaderComponent implements OnInit {

 // products: Product[];
  value2: boolean;
  images : string[];
  selectedImages: Image[];
 // selectedOpt:string[];
  //fileUploads: Observable<string[]>;
 // selectedProducts: Product[];
  //selectedImages: string[] = [];
  cols: any[];
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    //this.fileUploads = this.imageService.getImages();
    this.imageService.getImages().subscribe(data =>{
       this.images = data;
       console.log(data);
    });

    this.cols = [
      { field: 'name', header: 'All Images'}
    ];
  }


createImageFromBlob(image: Blob) : any{
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      return reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}
  download() {
  //  console.log(this.selectedImages);
    let count = 0;
    var zip = new JSZip();
    var imgFolder = zip.folder("images"); 
    this.selectedImages.forEach((image) => {
      const filename = image.name;
      console.log(filename);
      JSZipUtils.getBinaryContent('./assets/imgs/' + filename, (err, data) => {
        console.log(data);
        if (err) {
          throw err;
        };

      imgFolder.file(filename, data, {binary: true});
      count++;
      if(count === this.selectedImages.length) {
        zip.generateAsync({type : "blob"}). then(function (content) {
          FileSaver.saveAs(content, "images.zip");
        });
      }
    });
  });
}


}
