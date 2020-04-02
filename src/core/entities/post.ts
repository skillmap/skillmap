import { Skill } from '.';

export interface Post {
    postId: string;
    description: string;
    title: string;
    publishDate: Date;
}

export interface PostDetail extends Post {
    skills: Skill[];
}
