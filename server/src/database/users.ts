import * as DB from "./db";

interface User {
  id: string;
  name: string;
  pw_hash: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  return await DB.get("SELECT * FROM users");
};
