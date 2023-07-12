export type UserThreads = {
  data: {
    mediaData: {
      threads: Thread[];
    };
  };
  extensions: { is_final: boolean };
};

export interface Thread {
  id: string;
  thread_items: ThreadItems[];
}

export interface ThreadItems {
  post: Post;
  line_type: string;
  view_replies_cta_string: string;
  reply_facepile_users: [];
  should_show_replies_cta: boolean;
  __typename: string;
}

export interface Post {
  user: User;
  image_versions2: { candidates: [] };
  original_width: number;
  original_height: number;
  video_versions: [];
  carousel_media: null;
  carousel_media_count: null;
  pk: string;
  has_audio: null;
  text_post_app_info: TextPostAppInfo;
  caption: { text: string };
  taken_at: number;
  like_count: number;
  code: string;
  media_overlay_info: null;
  id: string;
}

export interface User {
  profile_pic_url: string;
  username: string;
  id: string;
  is_verified: boolean;
  pk: string;
}

export interface TextPostAppInfo {
  link_preview_attachment: null;
  share_info: ShareInfo;
  reply_to_author: null;
  is_post_unavailable: boolean;
}

export interface ShareInfo {
  quoted_post: null;
  reposted_post: null;
}
