import { Database } from '.';
import { Post, Skill } from '../core/entities';

export default class InMemoryDatabase implements Database {

    private posts: Post[];
    private skills: Skill[];

    constructor() {
        this.posts = [];
        this.skills = [];
    }

    getPosts(): Post[] {
        return this.posts;
    }

    getSkills(): Skill[] {
        return this.skills;
    }

}