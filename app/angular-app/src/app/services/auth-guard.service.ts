import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import {AppConfigService} from "./app-config.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor( private appConfig: AppConfigService, private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appConfig.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
  }

}

