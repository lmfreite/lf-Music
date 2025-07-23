import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

export const loginGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  try {
    const isLoggedIn = await storageService.getItem('login');
    if (isLoggedIn !== 'true') {
      router.navigate(['/intro']);
      return false;
    }
    return true;
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
