import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITracksResponse } from 'src/app/interfaces/ITracksResponse';
import { Observable, from } from 'rxjs';
import { IAlbumsResponse } from 'src/app/interfaces/IAlbumsResponse';
import * as dataArtist from 'src/assets/artistas.json'
import { IArtistLocaleResponse } from 'src/app/interfaces/IArtistLocaleResponse';
import { IArtistResponse } from 'src/app/interfaces/IArtistResponse';

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

  getLocalArtists(): Observable<IArtistLocaleResponse[]> {
    return from(
      new Promise<IArtistLocaleResponse[]>(resolve => {
        resolve([{ artists: (dataArtist as IArtistLocaleResponse).artists }]);
      })
    );
  }

  getTracksAlbumById(id: number): Observable<ITracksResponse[]> {
    return from(
      fetch(`${this.baseUrl}/tracks/album/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener el álbum');
          }
          return response.json();
        })
        .then((data: ITracksResponse[]) => data)
        .catch(error => {
          console.error('Error fetching album:', error);
          return [];
        })
    );
  }

  getArtists(): Observable<IArtistResponse[]> {
    return from(
      fetch(`${this.baseUrl}/artists`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los artistas');
          }
          return response.json();
        })
        .then((data: IArtistResponse[]) => data)
        .catch(error => {
          console.error('Error fetching artists:', error);
          return [];
        })
    );
  }

  getTracksArtistById(id: number): Observable<ITracksResponse[]> {
    return from(
      fetch(`${this.baseUrl}/tracks/artist/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las pistas del artista');
          }
          return response.json();
        })
        .then((data: ITracksResponse[]) => data)
        .catch(error => {
          console.error('Error fetching artist tracks:', error);
          return [];
        })
    );
  }
  }
