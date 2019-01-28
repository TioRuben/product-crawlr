import { Request, Response } from "express";
import { users } from "../database";

export const userLogin = (req: Request, res: Response) =>
  users
    .loginUser(req.body.user, req.body.password)
    .then(user => {
      console.log(user);
      user !== null
        ? (req.session.user = user && res.send(user))
        : res.status(401);
    })
    .catch(error => {
      console.log(error);
      res.status(401);
    })
    .finally(() => res.send());

export const userLogout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.send({ logout: true });
  });
};

export const userRegister = (req: Request, res: Response) => {
  try {
    users.getUser(req.body.user).then(userFound => {
      userFound
        ? res.status(409) && res.send()
        : users.registerUser(req.body.user, req.body.password).then(() => {
            users.getUser(req.body.user).then(user => res.send(user));
          });
    });
  } catch {
    res.status(502);
    res.send();
  }
};
