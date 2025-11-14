import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { GranPremi } from './gran-premi/gran-premi';
import { GranPremio } from './gran-premio/gran-premio';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'gran-premi',
        component: GranPremi,
        title: 'Elenco gran premi',
    },
    {
        path: 'gran-premi/:id',
        component: GranPremio,
        title: 'Dettagli del gran premio',
    },
];
