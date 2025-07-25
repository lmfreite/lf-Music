export interface IArtistLocaleResponse {
    artists: Artist[];
}

export interface Artist {
    nombre:       string;
    genero:       string;
    pais:         string;
    anios_activo: string;
    albumes:      Albume[];
}

export interface Albume {
    titulo: string;
    anio:   number;
}