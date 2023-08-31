import { AccountRepository } from "@/dao/account";
import { SessionRepository } from "@/dao/session";
import { UserRepository } from "@/dao/user";
import { Session } from "@/models/session";
import { User } from "@/models/user";
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";
import { QueryRunner } from "./query-runner";

class SymbyAdapter implements Adapter {
  async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
    const userRepository = new UserRepository(new QueryRunner());
    const newUser = new User(user);
    const newSavedUser = await userRepository.create(newUser);

    return {
      id: newSavedUser.id,
      email: newSavedUser.email,
      emailVerified: newSavedUser.emailVerified,
    };
  }

  async getUser(id: string): Promise<AdapterUser | null> {
    const userRepository = new UserRepository(new QueryRunner());
    const user = await userRepository.readById(Number(id));

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  async getUserByEmail(email: string): Promise<AdapterUser | null> {
    const userRepository = new UserRepository(new QueryRunner());
    const user = await userRepository.readByEmail(email);

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  async getUserByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<AdapterUser | null> {
    const userRepository = new UserRepository(new QueryRunner());
    const user = await userRepository.readByAccount(providerAccountId);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  async updateUser(
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Promise<AdapterUser> {
    const userRepository = new UserRepository(new QueryRunner());
    const updatedUser = new User(user);
    const { id, email, emailVerified } = await userRepository.update(
      updatedUser
    );
    return {
      id,
      email,
      emailVerified,
    };
  }

  async deleteUser(userId: string): Promise<void> {
    const userRepository = new UserRepository(new QueryRunner());
    await userRepository.delete({ id: userId } as User);
  }

  async linkAccount(account: AdapterAccount): Promise<void> {
    const accountRepository = new AccountRepository(new QueryRunner());
    await accountRepository.create(account);
  }

  async createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> {
    const sessionRepository = new SessionRepository(new QueryRunner());
    const newSession = new Session(session);
    const newSavedSession = await sessionRepository.create(newSession);
    return {
      sessionToken: newSavedSession.sessionToken,
      userId: newSavedSession.user.id,
      expires: newSavedSession.expires,
    };
  }

  async getSessionAndUser(
    sessionToken: string
  ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
    const sessionRepository = new SessionRepository(new QueryRunner());
    const session = await sessionRepository.readByToken(sessionToken);
    if (!session) {
      return null;
    }
    return {
      session: {
        sessionToken: session.sessionToken,
        userId: session.user.id,
        expires: session.expires,
      },
      user: {
        id: session.user.id,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
      },
    };
  }

  async updateSession(
    session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
  ): Promise<AdapterSession> {
    const sessionRepository = new SessionRepository(new QueryRunner());
    const updatedSession = new Session(session);
    await sessionRepository.update(updatedSession);
    return {
      sessionToken: updatedSession.sessionToken,
      userId: updatedSession.user.id,
      expires: updatedSession.expires,
    };
  }

  async deleteSession(sessionToken: string): Promise<void> {
    const sessionRepository = new SessionRepository(new QueryRunner());
    await sessionRepository.deleteByToken(sessionToken);
  }
}

export default SymbyAdapter;
