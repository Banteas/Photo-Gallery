import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

// The Blueprint (Interface)
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // The Storage Box (Array)
  public photos: UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery() {
    // 1. Take the photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // 2. Add it to the box (unshift adds to the beginning)
    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    });
  }
}