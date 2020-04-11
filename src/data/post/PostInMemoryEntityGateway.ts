import PostEntityGateway from "core/usecases/post/PostEntityGateway";
import { PaginatedData, Post, PostDetail, Skill } from "core/entities";



class PostInMemoryEntityGateway implements PostEntityGateway {

  #posts: Post[];
  #skills: Skill[];

  constructor() {
    this.#posts = [];
    this.#skills = [];
  }

  setPosts(posts: Post[]): void {
    this.#posts = posts;
  }

  setSkills(skills: Skill[]): void {
    this.#skills = skills;
  }

  addPosts(post: Post): void {
    this.#posts.push(post);
  }

  addSkills(skill: Skill): void {
    this.#skills.push(skill);
  }

  getRecentPosts(pageKey: number, take: number): PaginatedData<Post, number> | undefined {
    // sort on key
    // find the first key fewer than key
    // then take the page + 1 to find the next key
    const sortedPosts = this.#posts.sort((a, b) => (b.publishDate - a.publishDate));
    const firstIndex = sortedPosts.findIndex(item => item.publishDate < pageKey);

    if (firstIndex < 0) {
      return undefined;
    }

    const result = sortedPosts.slice(firstIndex, firstIndex + take + 1);
    let nextPageKey = -1;

    if (result.length === take + 1) {
      nextPageKey = result[result.length - 1].publishDate;
      result.pop();
    }

    return {
      data: result,
      pageInfo: {
        currentPageKey: pageKey,
        nextPageKey,
        count: result.length
      }
    };
  }

  getPostDetail(postId: string): PostDetail | undefined {
    const skills = this.#skills.filter(s => s.postId === postId) || [];
    const post = this.#posts.find(p => p.postId === postId);

    if (!post) {
      return undefined;
    }

    return {
      ...post,
      skills
    };

  }

}

export default PostInMemoryEntityGateway;
