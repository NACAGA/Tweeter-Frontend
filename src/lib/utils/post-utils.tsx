import { TPost } from '../types/TPost';

export default class PostUtilis {
    static createPost = (
        id: number,
        username: string,
        date: Date,
        content: string,
        memberOf: boolean,
        groupName: string,
        groupid: number
    ): TPost => ({
        id: id,
        username: username,
        date: date,
        content: content,
        memberOf: memberOf,
        groupName: groupName,
        groupid: groupid,
    });
}
