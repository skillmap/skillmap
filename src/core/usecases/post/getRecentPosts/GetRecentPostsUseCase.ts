import UseCase from "core/definition/UseCase";
import GetRecentPostsRequestDTO from "core/usecases/post/getRecentPosts/GetRecentPostsRequestDTO";
import GetRecentPostsResponseDTO from "core/usecases/post/getRecentPosts/GetRecentPostsResponseDTO";
import { Post, PaginatedData } from "core/entities";
import Result from "core/definition/Result";
import PostEntityGateway from "core/usecases/post/PostEntityGateway";
import { GetRecentPostsInvalidRequest as GetRecentPostsInvalidRequest, NextPageNotFound } from "core/usecases/post/getRecentPosts/GetRecentPostsErrors";

const PAGE_SEEK_COUNT = 10;

class GetRecentPostsUseCase implements UseCase<GetRecentPostsRequestDTO, GetRecentPostsResponseDTO>{

  private getRecentPostsDataAdapter: PostEntityGateway;

  constructor(getRecentPostsDataAdapter: PostEntityGateway) {
    this.getRecentPostsDataAdapter = getRecentPostsDataAdapter;
  }

  execute(request: GetRecentPostsRequestDTO): GetRecentPostsResponseDTO | Promise<GetRecentPostsResponseDTO> {

    if (!request || !request.pageKey) {
      return Result.fail(new GetRecentPostsInvalidRequest(request));
    }

    const posts = this.getRecentPostsDataAdapter.getRecentPosts(request.pageKey, PAGE_SEEK_COUNT);

    if (posts) {
      return Result.ok<PaginatedData<Post, number>>(posts);
    } else {
      return Result.fail(new NextPageNotFound(request.pageKey));
    }
  }

}

export default GetRecentPostsUseCase;
