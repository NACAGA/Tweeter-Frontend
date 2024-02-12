import { TComment } from '../types/TComment';

export default class CommentUtils {
    static createComment = (username: string, date: Date, content: string): TComment => ({
        username: username,
        date: date,
        content: content,
    });
}
