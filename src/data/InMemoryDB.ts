import PostDataAdapter from "core/usecases/post/PostDataAdapter";
import { PaginatedData, Post, PostDetail, Skill } from "core/entities";

class InMemoryDatabase implements PostDataAdapter {

  #posts: Post[];
  #skills: Skill[];

  constructor() {
    this.#posts = [];
    this.#skills = [];
  }

  getRecentPosts(pageKey: number, take: number): PaginatedData<Post, number> | undefined {
    // sort on key
    // find the first key fewer than key
    // then take the page + 1 to find the next key
    const sortedPosts = this.#posts.sort((a, b) => (b.publishDate.getTime() - a.publishDate.getTime()));
    const firstIndex = sortedPosts.findIndex(item => item.publishDate.getTime() < pageKey);
    if (!firstIndex) {
      return undefined;
    }

    const result = sortedPosts.slice(firstIndex, firstIndex + take + 1);
    let nextPageKey = -1;
    
    if (result.length === take + 1){
      nextPageKey = result[result.length].publishDate.getTime();
      result.pop();
    }

    return {
      data: result,
      pageInfo: {
        currentPageKey : pageKey,
        nextPageKey,
        count : result.length
      }
    };
  }

  getPostDetail(postId: string): PostDetail | undefined {
    const skills = this.#skills.filter(s => s.postId === postId) || [];
    const post = this.#posts.find(p => p.postId === postId);

    if(!post){
      return undefined;
    }

    return {
      ...post,
      skills
    };

  }

}

export default InMemoryDatabase;
