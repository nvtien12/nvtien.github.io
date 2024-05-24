import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { EduComponent } from './component/edu/edu.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { NewsComponent } from './component/news/news.component';
import { WorksComponent } from './component/works/works.component';
import { ContactComponent } from './component/contact/contact.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { LoginComponent } from './component/auth/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edu', component: EduComponent },
  { path: 'news', component: NewsComponent },
  { path: 'works', component: WorksComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'posts/new', component: NewPostComponent, canActivate: [authGuard] },
  { path: 'posts', component: AllPostComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
