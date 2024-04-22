export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullname: string;
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
}
