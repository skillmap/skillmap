import Post from "core/entities/Post";
import Skill from "core/entities/Skill";


interface PostDetail extends Post {
  skills: Skill[];
}

export default PostDetail;
