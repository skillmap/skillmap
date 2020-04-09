import { PostDetail, Post, PaginatedData } from "core/entities";

export interface PostDataAdapter {

    getRecentPosts(nextPageKey: string, seek: number): PaginatedData<Post> | undefined;

    getPostDetail(postId: string): PostDetail | undefined;

}
