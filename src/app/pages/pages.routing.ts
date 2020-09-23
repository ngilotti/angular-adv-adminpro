// Modules
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {  path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
            {  path: 'progress', component: ProgressComponent, data: { title: 'Progres'} },
            {  path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica'} },
            {  path: 'account-settings', component: AccountSettingComponent, data: { title: 'Tema'} },
            {  path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
            {  path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
