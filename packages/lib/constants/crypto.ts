import { env } from '../utils/env';

export const SHIELDSIGN_ENCRYPTION_KEY = env('NEXT_PRIVATE_ENCRYPTION_KEY');

export const SHIELDSIGN_ENCRYPTION_SECONDARY_KEY = env('NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY');

// if (typeof window === 'undefined') {
//   if (!SHIELDSIGN_ENCRYPTION_KEY || !SHIELDSIGN_ENCRYPTION_SECONDARY_KEY) {
//     throw new Error('Missing SHIELDSIGN_ENCRYPTION_KEY or SHIELDSIGN_ENCRYPTION_SECONDARY_KEY keys');
//   }

//   if (SHIELDSIGN_ENCRYPTION_KEY === SHIELDSIGN_ENCRYPTION_SECONDARY_KEY) {
//     throw new Error(
//       'SHIELDSIGN_ENCRYPTION_KEY and SHIELDSIGN_ENCRYPTION_SECONDARY_KEY cannot be equal',
//     );
//   }
// }

// if (SHIELDSIGN_ENCRYPTION_KEY === 'CAFEBABE') {
//   console.warn('*********************************************************************');
//   console.warn('*');
//   console.warn('*');
//   console.warn('Please change the encryption key from the default value of "CAFEBABE"');
//   console.warn('*');
//   console.warn('*');
//   console.warn('*********************************************************************');
// }
