export interface ILoginResponse {
    msg:    string;
    user:   User;
    status: string;
}

export interface User {
    id:        number;
    email:     string;
    name:      string;
    last_name: string;
    image:     null;
    username:  string;
    followees: any[];
    followers: any[];
}
