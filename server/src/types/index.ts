export interface ErrorResponse {
  message: string;
  status: number;
}

export interface SuccessResponse {
  data: unknown;
  message: string;
}
