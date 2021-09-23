interface LoginResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}
interface UserProfile {
  id: number;
  kakao_account: KakaoAccount;
  synched_at: string;
  connected_at: string;
  properties: Profile;
}
interface KakaoAccount {
  profile: Profile;
  email: string;
  age_range: string;
  birthday: string;
  birthyear: string;
  gender: "female" | "male";
  phone_number: string;
  ci: string;
}
interface Profile {
  nickname: string;
  profile_image_url: string;
  thumbnail_image_url: string;
  profile_needs_agreement?: boolean;
}

// Server interface
export class SocialAuthResponse {
  uid?: number;
  thumbnail?: string;
  username?: string;
  email: string;
  gender?: string;
}

export class SocialRedirectResponse {
  ok: boolean;
  code: number;
  data: {
    token: string;
    uid: string;
    username: string;
    email: string;
    profile: {
      id: profileId;
      thumbnail: string;
    };
  };
}
