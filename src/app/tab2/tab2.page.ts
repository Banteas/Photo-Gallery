import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false  // <--- ADD THIS LINE
})
export class Tab2Page {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      icon: 'close'
    }]
  });
  await actionSheet.present();
}

}