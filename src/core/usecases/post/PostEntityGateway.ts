import { PostDetail, Post, PaginatedData } from "core/entities";

interface PostEntityGateway {

    getRecentPosts(key: number, take: number): PaginatedData<Post, number> | undefined;

    getPostDetail(postId: string): PostDetail | undefined;

}

export default PostEntityGateway;
