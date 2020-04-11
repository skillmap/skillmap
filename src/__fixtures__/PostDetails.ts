import { PostDetail } from "core/entities";
import Skills from "./Skills";

const samplePostDetails: PostDetail[] = [
  {
    postId: "e9109c9c",
    title: "React Frontend Developer",
    description: "set of skills to become a frontend developer",
    publishDate: 1585692000000,
    skills: Skills.filter(s => s.postId === "e9109c9c")
  },
  {
    postId: "398f0c8f",
    title: "Javascript Backend Developer",
    description: "Skills required for Javascript Backend Developer",
    publishDate: 1583017200000,
    skills: Skills.filter(s => s.postId === "398f0c8f")
  },
  {
    postId: "5a38a0db",
    description: "DevOps engineer skill set",
    title: "DevOps Engineer",
    publishDate: 1580511600000,
    skills: Skills.filter(s => s.postId === "5a38a0db")
  }
];


export default samplePostDetails;
