import { Routes } from '@angular/router';
import {AuthComponent} from "../pages/auth-page/auth-page.component";
import {RulesPageComponent} from "../pages/rules-page/rules-page.component";
import {GameFieldPageComponent} from "../pages/game-field-page/game-field-page.component";


export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    },
    {
        path: 'rules',
        component: RulesPageComponent,
    },
    {
        path: 'game',
        component: GameFieldPageComponent,
    }
];
