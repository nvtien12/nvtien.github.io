import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../../models/posts';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/default.png';
  selectedImg: any;
  categories: Array<any> = [];
  postForm: FormGroup;
  post: any;
  docId: string | undefined;
  formStatus: string = "Add New";
  isDisable: boolean = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(val => {
      this.docId = val.id;
      if (this.docId) {
        this.postService.loadOneData(val.id).subscribe((post: any) => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required]],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(20)]],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          })
          this.imgSrc = this.post.postImgPath
          this.formStatus = "Edit "
        })
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required]],
          excerpt: ['', [Validators.required, Validators.minLength(20)]],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    })
  }

  ngOnInit(): void {
  }

  get fc() {
    return this.postForm.controls;
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    const postData: Posts = {
      title: this.postForm.value.title || null,
      postImgPath: '',
      excerpt: this.postForm.value.excerpt || null,
      content: this.postForm.value.content || null,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/default.png';
  }

}
