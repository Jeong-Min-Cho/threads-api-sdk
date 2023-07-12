export interface GetUser {
  data: UserData;
  extensions: { is_final: boolean };
}

export interface UserData {
  user: User;
}

export interface User {
  is_private: boolean;
  profile_pic_url: string;
  username: string;
  hd_profile_pic_versions: HdProfilePicVersion[];
  is_verified: boolean;
  biography: string;
  biography_with_entities: BiographyWithEntities;
  follower_count: number;
  profile_context_facepile_users: null;
  bio_links: BioLink[];
  pk: string;
  full_name: string;
  id: number | null;
}

export interface HdProfilePicVersion {
  height: number;
  url: string;
  width: number;
}

// I don't know how entities are structured, so I'm just going to leave it as any[]
export interface BiographyWithEntities {
  entities: any[];
  raw_text: string;
}

export interface BioLink {
  url: string;
}
