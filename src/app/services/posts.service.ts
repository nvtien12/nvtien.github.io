import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) { }

  
  uploadImage(selectedImage: any, postData: any, formStatus: string, id: any) {
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image success full');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        if (formStatus == "Add New") {
          this.saveData(postData);
        } else {
          this.updateData(id, postData);
        }
      })
    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id
          return { id, data }
        })
      })
    )
  }

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Insert Successfully ..!');
      this.router.navigate(['posts'])
    })
      .catch(err => { console.log(err) })
  }

  updateData(id: any, postData: any) {
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success('Data update successfully');
      this.router.navigate(['/posts']);
    })
  }

  deleteImage(postImgPath: string, id: string){
    this.storage.storage.refFromURL(postImgPath).delete().then(() =>{
      this.deleteData(id)
    })
  }

  deleteData(id: string){
    this.afs.doc(`posts/${id}`).delete().then(() =>{
      this.toastr.warning('Data Deleted....!')
    })
  }

  markFeatured(id: any, featuredData: any){
    this.afs.doc(`posts/${id}`).update(featuredData).then(() =>{
      this.toastr.info('Featured Status Updated')
    })
  }

}
