import Result from "core/definition/Result";
import { Post, PaginatedData } from "core/entities";
import {
  GetRecentPostInvalidRequest,
  NextPageNotFound
} from "core/usecases/post/getRecentPosts/GetRecentPostsErrors";

type GetRecentPostsResponseDTO = Result<PaginatedData<Post, number> | GetRecentPostInvalidRequest | NextPageNotFound>;

export default GetRecentPostsResponseDTO;
