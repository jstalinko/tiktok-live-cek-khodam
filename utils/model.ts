import {Container} from "nosql-json-database";

const database = new Container();
type Users = {
    username: string,
    comment: string,
    kodam: string
};
const userCollection = database.createCollection<Users>("users");

export const save = async (data: string[]) => {
    userCollection.addOne({username: data[0], comment: data[1], kodam: data[2]});
};
export const readByUsername = async (username: string , comment: string) => {
    return userCollection.findOne({username: username, comment: comment});
};
export const readAll = async () => {
    return userCollection.find();
};