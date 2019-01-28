import * as DB from "./db";
import format from "pg-format";

interface User {
  id: string;
  name: string;
  pw_hash?: string;
}

export const getAllUsers = (): Promise<User[]> => {
  return DB.get("SELECT * FROM users") as Promise<User[]>;
};

export const loginUser = (user: string, password: string): Promise<User> =>
  DB.get(
    format(
      "SELECT id,name FROM users WHERE name=%L AND pw_hash = crypt(%L, pw_hash)",
      user,
      password
    )
  )
    .then(users => {
      console.log(users);
      return users.length > 0 ? users[0] : null;
    })
    .catch(error => {
      console.log(error);
      return [];
    });

export const getUser = (user: string): Promise<User> =>
  DB.get(format("SELECT id,name FROM users WHERE name=%L LIMIT 1", user))
    .then(users => users[0] as User)
    .catch(error => {
      console.log(error);
      return null;
    });

export const registerUser = (user: string, password: string): Promise<User[]> =>
  DB.get(
    format(
      "INSERT INTO users (name,pw_hash) VALUES(%L, crypt(%L, gen_salt('bf')))",
      user,
      password
    )
  ) as Promise<User[]>;
