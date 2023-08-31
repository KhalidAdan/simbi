import { UserRepository } from "@/dao/user";
import { User } from "@/models/user";
import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";
import { QueryRunner } from "./query-runner";

class SymbyAdapter implements Adapter {
  async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
    const userRepositoy = new UserRepository(new QueryRunner());
    const newUser = new User(user);
    await userRepositoy.create(newUser);
    return user as AdapterUser;
  }

  async getUser(id: string): Promise<AdapterUser | null> {
    // Implement the getUser method here
    return null;
  }

  async getUserByEmail(email: string): Promise<AdapterUser | null> {
    // Implement the getUserByEmail method here
    return null;
  }

  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<AdapterUser | null> {
    // Implement the getUserByAccount method here
    return null;
  }

  async updateUser(
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Promise<AdapterUser> {
    // Implement the updateUser method here
    return user as AdapterUser;
  }

  async deleteUser(
    userId: string
  ): Promise<void> | Promise<AdapterUser | null | undefined> {
    // Implement the deleteUser method here
  }

  async linkAccount(
    account: AdapterAccount
  ): Promise<void> | Promise<AdapterAccount | null | undefined> {
    // Implement the linkAccount method here
  }

  async unlinkAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<void> | Promise<AdapterAccount | undefined> {
    // Implement the unlinkAccount method here
  }

  async createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> {
    // Implement the createSession method here
    return session as AdapterSession;
  }

export default SymbyAdapter;
