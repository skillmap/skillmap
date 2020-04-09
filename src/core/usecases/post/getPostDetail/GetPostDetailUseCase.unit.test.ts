import GetPostDetailUseCase from "core/usecases/post/getPostDetail/GetPostDetailUseCase";
import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";
import { Post, PostDetail } from "core/entities";
import { PostNotFound, PostDetailInvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";
import { GetPostDetailRequestDTO } from "core/usecases/post/getPostDetail/GetPostDetailRequestDTO";
import SamplePosts from "__fixtures__/Posts";
import SamplePostDetails from "__fixtures__/PostDetails";

let getPostDetailUseCase: GetPostDetailUseCase;

beforeAll(() => {

  const dataSource: PostDataAdapter = {
    getRecentPosts: (): Post[] => SamplePosts,
    getPostDetail: (postId: string): PostDetail | undefined => SamplePostDetails.find(p => p.postId == postId)
  };

  getPostDetailUseCase = new GetPostDetailUseCase(dataSource);
});

describe("get post detail use case", () => {

  test("invalid request", async () => {

    let invalidInput: unknown = {};
    let invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(invalidCall.getError()).toBeInstanceOf(PostDetailInvalidRequest);

    invalidInput = { postId: "" };
    invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(invalidCall.getError()).toBeInstanceOf(PostDetailInvalidRequest);

  });

  test("post not found", async () => {
    const invalidInput: unknown = { postId: "-1" };
    const invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(invalidCall.getError()).toBeInstanceOf(PostNotFound);
  });

  test("on error the usecase get value should throw error", async () => {
    const invalidInput: unknown = { postId: "-1" };
    const invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(() => {
      invalidCall.getValue();
    }).toThrowError("Can't get the value of an error result. Use 'errorValue' instead.");
  });

});
