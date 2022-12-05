import { Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { getAuth } from 'firebase-admin/auth';
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseAuthService implements AuthService {
  async checkUserToken(token: string): Promise<DecodedIdToken> {
    return await getAuth().verifyIdToken(token);
  }
}
