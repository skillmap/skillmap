import Posts from "./Posts";
import { PaginatedData, Post } from "core/entities";

const paginatedPosts: PaginatedData<Post, number>[] = [
  {
    pageInfo: { 
      currentPageKey : 1,
      nextPageKey: 2,
      count: 3 
    },
    data: Posts
  }, {
    pageInfo: { 
      currentPageKey : 2,
      nextPageKey: 3,
      count: 3 
    },
    data: Posts
  }, {
    pageInfo: { 
      currentPageKey : 3,
      nextPageKey: -1,
      count: 3 
    },
    data: Posts
  }
];

export default paginatedPosts;
