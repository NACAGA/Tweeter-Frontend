import { TPost } from '../types/TPost';

export default class PostUtilis {
    static createPost = (username: string, date: Date, content: string, memberOf: boolean, groupName: string): TPost => ({
        username: username,
        date: date,
        content: content,
        memberOf: memberOf,
        groupName: groupName,
    });
}
