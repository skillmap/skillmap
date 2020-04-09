import Posts from "./Posts";
import { PaginatedData, Post } from "core/entities";

const paginatedPosts: PaginatedData<Post>[] = [
  {
    pageInfo: { 
      currentPageKey : "A",
      nextPageKey: "B",
      count: 3 
    },
    data: Posts
  }, {
    pageInfo: { 
      currentPageKey : "B",
      nextPageKey: "C",
      count: 3 
    },
    data: Posts
  }, {
    pageInfo: { 
      currentPageKey : "C",
      nextPageKey: "",
      count: 3 
    },
    data: Posts
  }
];

export default paginatedPosts;
