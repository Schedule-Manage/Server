export type PasswordCompareInput = {
  password: string;
  encrypted: string;
};

export type ServerResponse<T> = {
  status: number;
  message: string;
  data?: T;
  error?: ServerError;
};
