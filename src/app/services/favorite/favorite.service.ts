import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'favorite_tracks';
  private favoritesSubject = new BehaviorSubject<ITracksResponse[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadFavorites();
  }

  // Cargar favoritos desde el storage
  private async loadFavorites(): Promise<void> {
    try {
      const favorites = await this.storageService.getItem(this.FAVORITES_KEY) || [];
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favoritesSubject.next([]);
    }
  }

  // Obtener todos los favoritos
  async getFavorites(): Promise<ITracksResponse[]> {
    return await this.storageService.getItem(this.FAVORITES_KEY) || [];
  }

  // Verificar si una track es favorita por ID (más estricto)
  async isFavorite(trackId: string | number): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const stringId = String(trackId);
      return favorites.some(track => String(track.id) === stringId);
    } catch (error) {
      console.error('Error checking if favorite:', error);
      return false;
    }
  }

  // Verificar si una track específica es favorita (validación completa)
  async isTrackFavorite(track: ITracksResponse): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => 
        String(fav.id) === String(track.id) &&
        fav.name === track.name // Validación adicional por nombre
      );
    } catch (error) {
      console.error('Error checking if track is favorite:', error);
      return false;
    }
  }

  // Obtener track favorita por ID
  async getFavoriteById(trackId: string | number): Promise<ITracksResponse | null> {
    try {
      const favorites = await this.getFavorites();
      const stringId = String(trackId);
      return favorites.find(track => String(track.id) === stringId) || null;
    } catch (error) {
      console.error('Error getting favorite by ID:', error);
      return null;
    }
  }

  // Agregar track a favoritos (validación de duplicados mejorada)
  async addToFavorites(track: ITracksResponse): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const isAlreadyFavorite = favorites.some(fav => String(fav.id) === String(track.id));
      
      if (!isAlreadyFavorite) {
        favorites.push({
          ...track,
          // Asegurar que el ID sea consistente
          id: Number(track.id)
        });
        await this.storageService.setItem(this.FAVORITES_KEY, favorites);
        this.favoritesSubject.next(favorites);
        console.log(`Track ${track.name} (ID: ${track.id}) added to favorites`);
      } else {
        console.log(`Track ${track.name} (ID: ${track.id}) is already in favorites`);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  // Eliminar track de favoritos por ID
  async removeFromFavorites(trackId: string | number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const stringId = String(trackId);
      const initialLength = favorites.length;
      const updatedFavorites = favorites.filter(track => String(track.id) !== stringId);
      
      if (updatedFavorites.length < initialLength) {
        await this.storageService.setItem(this.FAVORITES_KEY, updatedFavorites);
        this.favoritesSubject.next(updatedFavorites);
        console.log(`Track with ID: ${trackId} removed from favorites`);
      } else {
        console.log(`Track with ID: ${trackId} was not found in favorites`);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }

  // Toggle favorito con validación mejorada
  async toggleFavorite(track: ITracksResponse): Promise<boolean> {
    try {
      const isCurrentlyFavorite = await this.isTrackFavorite(track);
      
      if (isCurrentlyFavorite) {
        await this.removeFromFavorites(track.id);
        return false;
      } else {
        await this.addToFavorites(track);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  // Limpiar todos los favoritos
  async clearFavorites(): Promise<void> {
    try {
      await this.storageService.removeItem(this.FAVORITES_KEY);
      this.favoritesSubject.next([]);
      console.log('All favorites cleared');
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }
}
