export type Response<T = void> = {
  success: true;
  payload: T;
} | {
  success: false;
  error: string;
}
