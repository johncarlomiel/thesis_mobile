import { Component, OnInit } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

import { config } from '../configs/config';
@Component({
  selector: 'app-e-form',
  templateUrl: './e-form.page.html',
  styleUrls: ['./e-form.page.scss'],
})
export class EFormPage implements OnInit {
  imageToShow: any;
  debugger: any;
  isImageLoading = false;
  hasEform = false;
  constructor(
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private storage: Storage,
    private transfer: FileTransfer,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getEform();
  }


  viewImage(path) {
    let title = "Enrollment Form";
    let options = {
      share: true,
      closeButton: true
    }
    this.photoViewer.show(path, title, options)

  }

  getEform() {
    this.storage.get("Authorization").then((authToken) => {
      this.isImageLoading = true;
      this.userService.getEform(authToken).subscribe((successData) => {
        console.log(successData)
        this.isImageLoading = false;
        if (successData.hasEform) {
          this.hasEform = true;
          this.imageToShow = successData.url;
        } else {
          this.hasEform = false;
          this.imageToShow = successData.url;
        }
      }, (error) => {
        this.isImageLoading = false;
        console.log(error)
      })
    }).catch((error) => console.log(error))
  }

  cameraStart() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageToShow = imageData;


      this.storage.get("Authorization").then((authToken) => {
        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
          fileKey: 'image',
          fileName: 'try.jpg',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: { authorization: authToken }
        }

        fileTransfer.upload(this.imageToShow, config.IP + '/user/submitEform', options)
          .then((data) => {
            this.getEform();
          }, (err) => {
          });
      }, (error) => console.log(error))



    }, (err) => {
      this.debugger = err;
      // Handle error
    });
  }

}
