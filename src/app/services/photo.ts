import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

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
  private PHOTO_STORAGE: string = 'photos';

  constructor() { 
    this.loadSaved();
  }

  public async addNewToGallery() {
    // 1. Take the photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

  // Use the helper function to save the photo to the hard drive
  const savedImageFile = await this.savePicture(capturedPhoto);
  
  // Add the result to our storage box
  this.photos.unshift(savedImageFile);

  // Save the updated list to our "Sticky Note" (Preferences)
  this.cachePhotos();
  }

  private async savePicture(photo: Photo) {
  // 1. Convert photo to base64 format, required by the Filesystem API to save
  const base64Data = await this.readAsBase64(photo);

  // 2. Write the file to the Data Directory
  const fileName = Date.now() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  });

  // 3. Use webPath to display the new image instead of base64 since it's 
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath
  };
}
private async readAsBase64(photo: Photo) {
  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();

  return await this.convertBlobToBase64(blob) as string;
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

private async cachePhotos() {
  await Preferences.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos),
  });
}

public async loadSaved() {
  // 1. Retrieve the cached list of photo filenames from Preferences
  const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
  
  // 2. If there is data, convert the text string back into an Array
  this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

  console.log("Found photos in storage:", this.photos);

  // 3. For the web version: Load each photo's data from the Filesystem
  for (let photo of this.photos) {
    const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
    });

    // Web platform only: Load the photo as base64 data
    photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
  }
}

public async deletePicture(photo: UserPhoto, position: number) {
  // 1. Remove the photo from the "Screen" (the Array)
  this.photos.splice(position, 1);

  // 2. Update the "Sticky Note" (Preferences) with the new shorter list
  Preferences.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos)
  });

  // 3. Delete the physical file from the "Garage" (Filesystem)
  const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);

  await Filesystem.deleteFile({
    path: filename,
    directory: Directory.Data
  });
}
}