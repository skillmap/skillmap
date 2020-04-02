import { Post } from 'core/entities';

export interface GetRecentPostsDataAdapter {
    getRecentPosts(page: number): Post[];
}
