import { PostDetail } from 'core/entities';

export interface GetPostDetailDataAdapter {
    getPostDetail(postId: string): PostDetail;
}
