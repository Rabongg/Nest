export interface TokenSuccessResult {
  name: string;
  id: string;
  major: string;
  status: string;
}

export interface TokenErrorResult {
  status: string;
  message: string;
}
