import GetPostDetailUseCase from "core/usecases/post/getPostDetail/GetPostDetailUseCase";
import { PostDataAdapter } from "core/usecases/post/PostDataAdapter";
import { Post, PostDetail } from "core/entities";
import { PostNotFound, InvalidRequest } from "core/usecases/post/getPostDetail/GetPostDetailErrors";
import { GetPostDetailRequestDTO } from "core/usecases/post/getPostDetail/GetPostDetailRequestDTO";

let dataSource: PostDataAdapter;

const samplePosts: Post[] = [];

const samplePostDetails: PostDetail[] = [];

let getPostDetailUseCase: GetPostDetailUseCase;

beforeAll(() => {
  samplePosts.push({
    postId: "ABC_1",
    description: "This is first post",
    title: "post one",
    publishDate: new Date()
  });

  samplePosts.push({
    postId: "ABC_2",
    description: "This is second post",
    title: "post two",
    publishDate: new Date()
  });

  samplePostDetails.push({
    postId: "ABC_1",
    description: "This is first post",
    title: "post one",
    publishDate: new Date(),
    skills: []
  });

  samplePostDetails.push({
    postId: "ABC_2",
    description: "This is second post",
    title: "post two",
    publishDate: new Date(),
    skills: []
  });


  dataSource = {
    getRecentPosts: (): Post[] => samplePosts,
    getPostDetail: (postId: string): PostDetail | undefined => samplePostDetails.find(p => p.postId == postId)
  };

  getPostDetailUseCase = new GetPostDetailUseCase(dataSource);
});

describe("get post detail use case", () => {

  test("invalid request", async () => {

    let invalidInput: unknown = {};
    let invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(invalidCall.getError()).toBeInstanceOf(InvalidRequest);

    invalidInput = { postId: "" };
    invalidCall = await getPostDetailUseCase.execute(invalidInput as GetPostDetailRequestDTO);

    expect(invalidCall.getError()).toBeInstanceOf(InvalidRequest);

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
