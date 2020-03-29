import { Post } from '../../../entities';
import Result from '../../../definition/Result';

export type GetRecentPostsResponse = Result<Post[]>;
