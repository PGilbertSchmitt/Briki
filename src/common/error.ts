export interface IError {
  message: string
}

export type ErrorPayload = {
  success: false,
  error: IError
};
