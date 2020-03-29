import { Post, Skill } from '../core/entities';

export default interface Database {

    getPosts(): Post[];

    getSkills(): Skill[];

}