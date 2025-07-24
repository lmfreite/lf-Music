export interface ITracksResponse {
    id:           number;
    album_id:     number;
    disc_number:  number;
    duration_ms:  number;
    name:         string;
    preview_url:  string;
    track_number: number;
    created_at:   Date;
    updated_at:   Date;
    artist_id:    number;
}