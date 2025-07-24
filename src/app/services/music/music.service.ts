import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';
import { Observable, from } from 'rxjs';
import { IAlbumsResponse } from 'src/app/interfaces/IAlbumsResponse';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private baseUrl: string = environment.apiUrl;

  constructor() { }

  getTracks(): Observable<ITracksResponse[]> {
    return from(
      fetch(`${this.baseUrl}/tracks`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las pistas');
          }
          return response.json();
        })
        .then((data: ITracksResponse[]) => data)
        .catch(error => {
          console.error('Error fetching tracks:', error);
          return [];
        })
    );
  }

  getAlbums(): Observable<IAlbumsResponse[]> {
    return from(
      fetch(`${this.baseUrl}/albums`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los álbumes');
          }
          return response.json();
        })
        .then((data: IAlbumsResponse[]) => data)
        .catch(error => {
          console.error('Error fetching albums:', error);
          return [];
        })
    );
  }
}
