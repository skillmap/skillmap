import UseCase from "core/definition/UseCase";
import { GetRecentPostRequestDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsRequestDTO";
import { GetRecentPostsResponseDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsResponseDTO";
import { Post } from "core/entities";
import Result from "core/definition/Result";
import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";

export default class GetRecentPostsUseCase implements UseCase<GetRecentPostRequestDTO, GetRecentPostsResponseDTO>{

  private getRecentPostsDataAdapter: PostDataAdapter;

  constructor(getRecentPostsDataAdapter: PostDataAdapter) {
    this.getRecentPostsDataAdapter = getRecentPostsDataAdapter;
  }

  execute(request: GetRecentPostRequestDTO): GetRecentPostsResponseDTO | Promise<GetRecentPostsResponseDTO> {

    const posts: Post[] = this.getRecentPostsDataAdapter.getRecentPosts(request.page);

    return Result.ok<Post[]>(posts);
  }

}
