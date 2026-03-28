interface IRegister {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

interface ILogin {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
}
