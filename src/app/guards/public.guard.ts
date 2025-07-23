import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

export const publicGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const isLoggedIn = await storageService.getItem('login');
  const introSeen = await storageService.getItem('introSeen');
  if (isLoggedIn === 'true' && introSeen === 'true') {
    router.navigate(['/app/home']);
    return false;
  }
  return true;
};
