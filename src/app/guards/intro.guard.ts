import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

export const introGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  
  try {
    const introSeen = await storageService.getItem('introSeen');
    
    // Si la intro no ha sido vista, redirigir a la intro
    if (!introSeen || introSeen !== 'true') {
      router.navigate(['/intro']);
      return false;
    }
    
    // Si la intro ya fue vista, permitir acceso
    return true;
  } catch (error) {
    // En caso de error, redirigir a la intro por seguridad
    router.navigate(['/intro']);
    return false;
  }
};
