import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContributeComponent } from './contribute/contribute.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UnknownComponentComponent } from './unknown-component/unknown-component.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { AskComponent } from './ask/ask.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:id', component: ArticleDetailComponent},
  {path: 'contribute', component: ContributeComponent, canActivate: [AuthGuard]},
  {path: 'discussions', component: DiscussionsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ask', component: AskComponent},
  {path: 'myarticles', component: MyArticlesComponent},
  {path: '**', component: UnknownComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
