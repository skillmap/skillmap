import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";
import { Post, PostDetail, PaginatedData } from "core/entities";
import SamplePaginatedPosts from "__fixtures__/PaginatedPosts";
import SamplePostDetails from "__fixtures__/PostDetails";
import GetRecentPostsUseCase from "core/usecases/post/getRecentPosts/GetRecentPostsUseCase";
import { GetRecentPostRequestDTO } from "core/usecases/post/getRecentPosts/GetRecentPostsRequestDTO";
import { GetRecentPostInvalidRequest, NextPageNotFound } from "core/usecases/post/getRecentPosts/GetRecentPostsErrors";
let getRecentPostsUseCase: GetRecentPostsUseCase;

beforeAll(() => {

  const dataSource: PostDataAdapter = {
    getRecentPosts: (nextPageKey: string): PaginatedData<Post> | undefined => SamplePaginatedPosts.find(item => item.pageInfo.currentPageKey === nextPageKey),
    getPostDetail: (postId: string): PostDetail | undefined => SamplePostDetails.find(p => p.postId == postId)
  };

  getRecentPostsUseCase = new GetRecentPostsUseCase(dataSource);

});


describe("get recent post usecase", () => {

  it("invalid request", async () => {

    const invalidInput: unknown = {};
    const result = await getRecentPostsUseCase.execute(invalidInput as GetRecentPostRequestDTO);

    expect(result.getError()).toBeInstanceOf(GetRecentPostInvalidRequest);

    expect((result.getError() as GetRecentPostInvalidRequest).message).toEqual("request '{}' is not valid");
    expect((result.getError() as GetRecentPostInvalidRequest).getErrorType()).toEqual("GETRECENTPOSTINVALIDREQUEST");
  });


  it("next page not found", async () => {
    const invalidInput = { nextPageKey: "Z" };
    const result = await getRecentPostsUseCase.execute(invalidInput);

    expect(result.getError()).toBeInstanceOf(NextPageNotFound);


    expect((result.getError() as NextPageNotFound).message).toEqual("posts for page key 'Z' not found");
    expect((result.getError() as NextPageNotFound).getErrorType()).toEqual("NEXTPAGENOTFOUND");
  });

  it("on error, result.getValue() throws error", async () => {
    const invalidInput: unknown = { postId: "-1" };
    const result = await getRecentPostsUseCase.execute(invalidInput as GetRecentPostRequestDTO);

    expect(() => {
      result.getValue();
    }).toThrowError("Can't get the value of an error result. Use 'errorValue' instead.");
  });

  it("traverse pages", async () => {

    const request: GetRecentPostRequestDTO = { nextPageKey: "A" };
    const result = await getRecentPostsUseCase.execute(request);

    expect((result.getValue() as PaginatedData<Post>).pageInfo).toEqual({ nextPageKey: "B", currentPageKey: "A", count: 3 });

    const nextPageRequest: GetRecentPostRequestDTO = {
      nextPageKey: (result.getValue() as PaginatedData<Post>).pageInfo.nextPageKey
    };
    const nextPageResult = await getRecentPostsUseCase.execute(nextPageRequest);
    expect((nextPageResult.getValue() as PaginatedData<Post>).pageInfo).toEqual({ nextPageKey: "C", currentPageKey: "B", count: 3 });

  });

});
