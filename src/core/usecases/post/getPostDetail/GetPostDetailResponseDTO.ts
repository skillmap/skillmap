import Result from "core/definition/Result";
import { PostDetail } from "core/entities";
import { PostNotFound, PostDetailInvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";


export type GetPostDetailResponseDTO = Result<PostDetail | PostNotFound | PostDetailInvalidRequest>;
