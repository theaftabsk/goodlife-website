export class CreateRedirectDto {
  from: string;
  to: string;
  code?: number;
}

export class UpdateRedirectDto {
  from?: string;
  to?: string;
  code?: number;
  clicks?: number;
}
