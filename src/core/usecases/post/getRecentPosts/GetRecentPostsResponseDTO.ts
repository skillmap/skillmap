import Result from "core/definition/Result";
import { Post, PaginatedData } from "core/entities";
import {
  GetRecentPostsInvalidRequest,
  NextPageNotFound
} from "core/usecases/post/getRecentPosts/GetRecentPostsErrors";

type GetRecentPostsResponseDTO = Result<PaginatedData<Post, number> | GetRecentPostsInvalidRequest | NextPageNotFound>;

export default GetRecentPostsResponseDTO;
