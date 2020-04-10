import { PostDetail, Post, PaginatedData } from "core/entities";

export default interface PostDataAdapter {

    getRecentPosts(key: number, take: number): PaginatedData<Post, number> | undefined;

    getPostDetail(postId: string): PostDetail | undefined;

}
