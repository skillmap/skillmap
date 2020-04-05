import UseCase from "core/definition/UseCase";
import { GetRecentPostRequestDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsRequestDTO";
import { GetRecentPostsResponseDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsResponseDTO";
import { Post } from "core/entities";
import Result from "core/definition/Result";
import { GetRecentPostsDataAdapter } from "core/usecases/post/getRecentPosts/GetRecentPostsDataAdapter";

export default class GetRecentPostsUseCase implements UseCase<GetRecentPostRequestDTO, GetRecentPostsResponseDTO>{

    private getRecentPostsDataAdapter: GetRecentPostsDataAdapter;
    constructor(getRecentPostsDataAdapter: GetRecentPostsDataAdapter) {
      this.getRecentPostsDataAdapter = getRecentPostsDataAdapter;
    }

    execute(request: GetRecentPostRequestDTO): GetRecentPostsResponseDTO | Promise<GetRecentPostsResponseDTO> {

      const posts: Post[] = this.getRecentPostsDataAdapter.getRecentPosts(request.page);

      return Result.ok<Post[]>(posts);
    }

}
