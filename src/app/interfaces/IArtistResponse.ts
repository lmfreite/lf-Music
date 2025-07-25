export interface IArtistResponse {
    id:         number;
    followers:  number;
    genres:     string[];
    image:      string;
    name:       string;
    popularity: number;
    created_at: Date;
    updated_at: Date;
}