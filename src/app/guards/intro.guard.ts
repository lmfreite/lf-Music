import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

export const introGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  try {
    const introSeen = await storageService.getItem('introSeen');
    if (introSeen !== 'true') {
      router.navigate(['/intro']);
      return false;
    }
    return true;
  } catch (error) {
    router.navigate(['/intro']);
    return false;
  }
};
