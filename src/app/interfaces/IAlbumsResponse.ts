export interface IAlbumsResponse {
    id:           number;
    image:        string;
    name:         string;
    popularity:   number;
    release_date: Date;
    total_tracks: number;
    genres:       string[];
    label:        string;
    created_at:   Date;
    updated_at:   Date;
    artist_id:    number;
}