import { TGroup } from '../types/TGroup';

export default class GroupUtils {
    static createGroup = (name: string, dateCreated: Date, description: string): TGroup => ({
        name: name,
        dateCreated: dateCreated,
        description: description,
    });
}
