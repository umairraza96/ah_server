import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    try {
      const hashedPassword = await argon.hash(password);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  async verifyPassword(hashedPassword: string, password: string) {
    try {
      const isPasswordValid = await argon.verify(hashedPassword, password);
      return isPasswordValid;
    } catch (error) {
      throw new Error('Error verifying password');
    }
  }
}
