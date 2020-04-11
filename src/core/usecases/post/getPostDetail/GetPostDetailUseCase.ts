import GetPostDetailRequestDTO from "core/usecases/post/getPostDetail/GetPostDetailRequestDTO";
import GetPostDetailResponseDTO from "core/usecases/post/getPostDetail/GetPostDetailResponseDTO";
import UseCase from "core/definition/UseCase";
import PostEntityGateway from "core/usecases/post/PostEntityGateway";
import Result from "core/definition/Result";
import { PostNotFound, PostDetailInvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";

class GetPostDetailUseCase implements UseCase<GetPostDetailRequestDTO, GetPostDetailResponseDTO>{

  private getPostDetailDataAdapter: PostEntityGateway;

  constructor(getPostDetailDataAdapter: PostEntityGateway) {
    this.getPostDetailDataAdapter = getPostDetailDataAdapter;
  }


  execute(request: GetPostDetailRequestDTO): GetPostDetailResponseDTO | Promise<GetPostDetailResponseDTO> {
    if (!request || !request.postId) {
      return Result.fail(new PostDetailInvalidRequest(request));
    }

    const { postId } = request;

    const result = this.getPostDetailDataAdapter.getPostDetail(postId);

    if (result) {
      return Result.ok(result);
    } else {
      return Result.fail(new PostNotFound(postId));
    }
  }

}

export default GetPostDetailUseCase;
