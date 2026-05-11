export interface ApiMessage {
  type: string;
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  message: ApiMessage | ApiMessage[];
  data: T | null;
}