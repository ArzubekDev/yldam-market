declare module '@mancho.devs/authorizer' {
  export class Signer {
    constructor(requestData: any);
    sign(privateKey: string): Promise<string>;
  }

  export interface RequestData {
    httpMethod: string;
    path: string;
    headers: Record<string, string | undefined>;
    queryStringParameters?: Record<string, string> | undefined;
    body: any;
  }
}