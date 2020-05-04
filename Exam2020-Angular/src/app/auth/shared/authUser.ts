export interface AuthUser {
  uid: string;
  email: string;
  username: string;
  profilePic?: string;
  certificateList?: string[];
  phone?: string;
  name?: string;
}
