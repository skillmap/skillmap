import GetPostDetailUseCase from "core/usecases/post/getPostDetail/GetPostDetailUseCase";
import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";
import { Post, PostDetail, PaginatedData } from "core/entities";
import { PostNotFound, PostDetailInvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";
import { GetPostDetailRequestDTO } from "core/usecases/post/getPostDetail/GetPostDetailRequestDTO";
import SamplePaginatedPosts from "__fixtures__/PaginatedPosts";
import SamplePostDetails from "__fixtures__/PostDetails";

let getPostDetailUseCase: GetPostDetailUseCase;

beforeAll(() => {

  const dataSource: PostDataAdapter = {
    getRecentPosts: (nextPageKey: string): PaginatedData<Post>| undefined  => SamplePaginatedPosts.find(item => item.pageInfo.currentPageKey === nextPageKey),
    getPostDetail: (postId: string): PostDetail | undefined => SamplePostDetails.find(p => p.postId == postId)
  };

  getPostDetailUseCase = new GetPostDetailUseCase(dataSource);

});

describe("get post detail usecase", () => {

  it("invalid request", async () => {

    let invalidInput: unknown = {};
    let result = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(result.getError()).toBeInstanceOf(PostDetailInvalidRequest);

    invalidInput = { postId: "" };
    result = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(result.getError()).toBeInstanceOf(PostDetailInvalidRequest);

    expect((result.getError() as PostDetailInvalidRequest).message).toEqual("request '{\"postId\":\"\"}' is not valid");
    expect((result.getError() as PostDetailInvalidRequest).getErrorType()).toEqual("POSTDETAILINVALIDREQUEST");

  });

  it("post not found", async () => {
    const invalidInput: unknown = { postId: "-1" };
    const result = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(result.getError()).toBeInstanceOf(PostNotFound);

    expect((result.getError() as PostNotFound).message).toEqual("postId '-1' not found");
    expect((result.getError() as PostNotFound).getErrorType()).toEqual("POSTNOTFOUND");
  });

  it("on error, result.getValue() throws error", async () => {
    const invalidInput: unknown = { postId: "-1" };
    const result = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(() => {
      result.getValue();
    }).toThrowError("Can't get the value of an error result. Use 'errorValue' instead.");
  });

});
