import { User } from "./user";

export class Session {
  id: string;
  user: User;
  expires: Date;
  sessionToken: string;
  constructor(row: any) {
    this.id = row.id ?? null;
    this.user = new User(row);
    this.expires = row.expires ?? null;
    this.sessionToken = row.session_token ?? null;
  }
}

export type SessionType = typeof Session;
