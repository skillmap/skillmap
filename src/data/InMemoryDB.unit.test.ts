import InMemoryDatabase from "data/InMemoryDB";

import SamplePosts from "__fixtures__/Posts";
import SampleSkills from "__fixtures__/Skills";
import samplePostDetails from "__fixtures__/PostDetails";

let inMemoryDB: InMemoryDatabase;

beforeAll(() => {
  inMemoryDB = new InMemoryDatabase();
  inMemoryDB.setPosts(SamplePosts);
  inMemoryDB.setSkills(SampleSkills);
});


describe("in memory database", () => {

  it("posts, invalid request key", () => {

    expect(SamplePosts.length).toBe(3);

    const invalidResult = inMemoryDB.getRecentPosts(0, 10);

    expect(invalidResult).toBeUndefined();

  });

  it("posts, page without next page", async () => {
    expect(SamplePosts.length).toBe(3);
    const pageKey = Date.now();
    const pageWithoutNextPage = inMemoryDB.getRecentPosts(pageKey, 10);

    expect(pageWithoutNextPage?.data.length).toBe(3);
    expect(pageWithoutNextPage?.pageInfo.count).toBe(3);
    expect(pageWithoutNextPage?.pageInfo.currentPageKey).toBe(pageKey);
    expect(pageWithoutNextPage?.pageInfo.nextPageKey).toBe(-1);

  });

  it("posts, page include next page", async () => {
    expect(SamplePosts.length).toBe(3);
    const take = 2;
    const pageKey = Date.now();
    const pageWithNextPage = inMemoryDB.getRecentPosts(pageKey, take);

    expect(pageWithNextPage?.data.length).toBe(take);
    expect(pageWithNextPage?.pageInfo.count).toBe(take);
    expect(pageWithNextPage?.pageInfo.currentPageKey).toBe(pageKey);
    expect(pageWithNextPage?.pageInfo.nextPageKey).toBe(1580511600000);


  });

  it("skills", async () => {
    expect(samplePostDetails.length).toBe(3);

    const postDetail = inMemoryDB.getPostDetail("e9109c9c");

    expect(postDetail?.skills.length).toBe(4);
    expect(postDetail?.skills[0].postId).toBe("e9109c9c");
    expect(postDetail?.skills[0].skillId).toBe("s1");
    expect(postDetail?.skills[0].title).toBe("GIT");
    expect(postDetail?.skills[0].description).toBe("git is a source control tool");
  });

  it("skills, invalid request", () => {
    const postDetail = inMemoryDB.getPostDetail("INVALID");

    expect(postDetail).toBeUndefined();
  });

});
