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

const SymbyAdapter = (): Adapter => {
  return {
    createUser: async (user: Omit<AdapterUser, "id">): Promise<AdapterUser> => {
      const userRepository = new UserRepository(new QueryRunner());
      const newUser = new User({
        ...user,
        emailVerified: user.emailVerified ? new Date() : null,
      });
      const newSavedUser = await userRepository.create(newUser);
      return {
        id: newSavedUser.id,
        email: newSavedUser.email,
        emailVerified: newSavedUser.emailVerified,
      };
    },
    getUser: async (id: string): Promise<AdapterUser | null> => {
      const userRepository = new UserRepository(new QueryRunner());
      const user = await userRepository.readById(id);

      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      };
    },
    getUserByEmail: async (email: string): Promise<AdapterUser | null> => {
      const userRepository = new UserRepository(new QueryRunner());
      const user = await userRepository.readByEmail(email);

      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      };
    },
    getUserByAccount: async (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<AdapterUser | null> => {
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
    },
    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> => {
      const userRepository = new UserRepository(new QueryRunner());
      const { id, email, emailVerified } = await userRepository.update(
        user as User
      );
      return {
        id,
        email,
        emailVerified,
      };
    },
    linkAccount: async (account: AdapterAccount): Promise<void> => {
      const accountRepository = new AccountRepository(new QueryRunner());
      await accountRepository.create(account);
      await accountRepository.linkAccount(account);
    },
    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> => {
      const sessionRepository = new SessionRepository(new QueryRunner());
      const newSavedSession = await sessionRepository.create({
        sessionToken: session.sessionToken,
        user: {
          id: session.userId,
        },
        expires: session.expires,
      } as Session);
      return {
        sessionToken: newSavedSession.sessionToken,
        userId: newSavedSession.user.id,
        expires: newSavedSession.expires,
      };
    },
    getSessionAndUser: async (
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
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
    },
    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession> => {
      const sessionRepository = new SessionRepository(new QueryRunner());
      const updatedSession = new Session(session);
      await sessionRepository.update(updatedSession);
      return {
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.user.id,
        expires: updatedSession.expires,
      };
    },
    deleteSession: async (sessionToken: string): Promise<void> => {
      const sessionRepository = new SessionRepository(new QueryRunner());
      await sessionRepository.deleteByToken(sessionToken);
    },
  };
};

export default SymbyAdapter;
