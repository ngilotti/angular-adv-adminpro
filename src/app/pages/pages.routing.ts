// Modules
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';

// Mantenimientos components
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';


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
            // Principal
            {  path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
            {  path: 'account-settings', component: AccountSettingComponent, data: { title: 'Tema'} },
            {  path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica'} },
            {  path: 'perfil', component: PerfilComponent, data: { title: 'Perfil'} },
            {  path: 'progress', component: ProgressComponent, data: { title: 'Progres'} },
            {  path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
            {  path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },

            // Mantenimientos
            {  path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios de aplicacion'} },
            {  path: 'medicos', component: MedicosComponent, data: { title: 'Medicos'} },
            {  path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
