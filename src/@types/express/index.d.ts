// acrescentar tipificacao a interface request,
// para aceitar user

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
