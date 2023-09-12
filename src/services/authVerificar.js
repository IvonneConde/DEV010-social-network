import { sendEmailVerification } from 'firebase/auth';

export function verify(user) {
  const verifyEmail = sendEmailVerification(user);
  return (verifyEmail);
}
