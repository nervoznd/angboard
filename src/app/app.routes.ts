import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * Application routes.
 *
 * The dashboard is the only screen for now, so it is mapped to the root path.
 */
export const routes: Routes = [{ path: '', component: DashboardComponent }];
