import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthService {
  checkUserToken(token: string): Promise<DecodedIdToken>;
}
