export interface IRegister {
    user: User;
}

export interface User {
    email:                 string;
    password:              string;
    password_confirmation: string;
    name:                  string;
    last_name:             string;
}