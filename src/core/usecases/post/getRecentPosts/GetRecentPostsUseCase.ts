import UseCase from "core/definition/UseCase";
import { GetRecentPostRequestDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsRequestDTO";
import { GetRecentPostsResponseDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsResponseDTO";
import { Post, PaginatedData } from "core/entities";
import Result from "core/definition/Result";
import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";
import { GetRecentPostInvalidRequest as GetRecentPostInvalidRequest, NextPageNotFound } from "core/usecases/post/getRecentPosts/GetRecentPostsErrors";

const PAGE_SEEK_COUNT = 10;

export default class GetRecentPostsUseCase implements UseCase<GetRecentPostRequestDTO, GetRecentPostsResponseDTO>{

  private getRecentPostsDataAdapter: PostDataAdapter;

  constructor(getRecentPostsDataAdapter: PostDataAdapter) {
    this.getRecentPostsDataAdapter = getRecentPostsDataAdapter;
  }

  execute(request: GetRecentPostRequestDTO): GetRecentPostsResponseDTO | Promise<GetRecentPostsResponseDTO> {

    if (!request || !request.pageKey) {
      return Result.fail(new GetRecentPostInvalidRequest(request));
    }

    const posts = this.getRecentPostsDataAdapter.getRecentPosts(request.pageKey, PAGE_SEEK_COUNT);

    if (posts) {
      return Result.ok<PaginatedData<Post>>(posts);
    } else {
      return Result.fail(new NextPageNotFound(request.pageKey));
    }
  }

}
