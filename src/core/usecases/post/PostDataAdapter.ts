import { PostDetail, Post } from "core/entities";

export interface PostDataAdapter {

    getRecentPosts(page: number): Post[];

    getPostDetail(postId: string): PostDetail | undefined;

}
