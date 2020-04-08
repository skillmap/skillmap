import Result from "core/definition/Result";
import { PostDetail } from "core/entities";
import { PostNotFound, InvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";


export type GetPostDetailResponseDTO = Result<PostDetail | PostNotFound | InvalidRequest>;
