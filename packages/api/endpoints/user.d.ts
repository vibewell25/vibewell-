import { UserProfile } from '../types';
export declare const getUserProfile: (userId: string) => Promise<UserProfile | null>;
export declare const updateUserProfile: (userId: string, profile: Partial<UserProfile>) => Promise<UserProfile | null>;
//# sourceMappingURL=user.d.ts.map