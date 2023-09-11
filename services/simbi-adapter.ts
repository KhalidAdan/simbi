import { AccountRepository } from "@/dao/account";
import { SessionRepository } from "@/dao/session";
import { UserRepository } from "@/dao/user";
import { Session, SessionType } from "@/models/session";
import { UserType } from "@/models/user";
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";

const SimbiAdapter = (): Adapter => {
  return {
    createUser: async (user: Omit<AdapterUser, "id">): Promise<AdapterUser> => {
      console.log("creating user");
      const userRepository = new UserRepository();
      const newSavedUser = await userRepository.create({
        ...user,
        emailVerified: user.emailVerified ? new Date() : null,
      } as UserType);
      return {
        id: String(newSavedUser.id),
        email: newSavedUser.email,
        emailVerified: newSavedUser.emailVerified ?? null,
      };
    },
    getUser: async (id: string): Promise<AdapterUser | null> => {
      console.log("getting user");
      const userRepository = new UserRepository();
      const user = await userRepository.readById(id);

      if (!user) return null;

      return {
        id: String(user.id),
        email: user.email,
        emailVerified: user.emailVerified ?? null,
      };
    },
    getUserByEmail: async (email: string): Promise<AdapterUser | null> => {
      console.log("getting user by email");
      const userRepository = new UserRepository();
      const user = await userRepository.readByEmail(email);

      if (!user) return null;

      return {
        id: String(user.id),
        email: user.email,
        emailVerified: user.emailVerified ?? null,
      };
    },
    getUserByAccount: async (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<AdapterUser | null> => {
      console.log("getting user by account");
      const userRepository = new UserRepository();
      const user = await userRepository.readByAccount(providerAccountId);
      if (!user) {
        return null;
      }
      return {
        id: String(user.id),
        email: user.email,
        emailVerified: user.emailVerified ?? null,
      };
    },
    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> => {
      console.log("updating user");
      const userRepository = new UserRepository();
      const { id, email, emailVerified } = await userRepository.update(
        user as any
      );
      return {
        id: String(id),
        email,
        emailVerified: emailVerified ?? null,
      };
    },
    linkAccount: async (account: AdapterAccount): Promise<void> => {
      console.log("linking account");
      const accountRepository = new AccountRepository();
      const acct = await accountRepository.create({
        ...account,
        userId: Number(account.userId),
      });
      console.log("created account", acct);
      await accountRepository.linkAccount(account);
      console.log("linked account");
    },
    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> => {
      console.log("creating session");
      const sessionRepository = new SessionRepository();
      const newSavedSession = await sessionRepository.create({
        sessionToken: session.sessionToken,
        user: {
          id: Number(session.userId),
        },
        expires: session.expires,
      } as SessionType);
      if (
        !newSavedSession ||
        !newSavedSession.sessionToken ||
        !newSavedSession.user ||
        !newSavedSession.expires
      ) {
        throw new Error("Failed to create session"); // only happen when you are using a session strategy that saves into the DB and not JWTs
      }
      return {
        sessionToken: newSavedSession.sessionToken,
        userId: String(newSavedSession.user.id),
        expires: newSavedSession.expires,
      };
    },
    getSessionAndUser: async (
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
      console.log("getting session and user");
      const sessionRepository = new SessionRepository();
      const session = await sessionRepository.readByToken(sessionToken);
      if (
        !session ||
        !session.user ||
        !session.expires ||
        !session.sessionToken
      ) {
        return null;
      }
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: String(session.user.id),
          expires: session.expires,
        },
        user: {
          id: String(session.user.id),
          email: session.user.email,
          emailVerified: session.user.emailVerified ?? null,
        },
      };
    },
    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession> => {
      console.log("updating session");
      const sessionRepository = new SessionRepository();
      const updatedSession = Session.parse(session);
      await sessionRepository.update(updatedSession);
      if (
        !updatedSession ||
        !updatedSession.sessionToken ||
        !updatedSession.user ||
        !updatedSession.expires
      ) {
        throw new Error("Failed to update session"); // only happen when you are using a session strategy that saves into the DB and not JWTs
      }
      return {
        sessionToken: updatedSession.sessionToken,
        userId: String(updatedSession.user.id),
        expires: updatedSession.expires,
      };
    },
    deleteSession: async (sessionToken: string): Promise<void> => {
      const sessionRepository = new SessionRepository();
      await sessionRepository.deleteByToken(sessionToken);
    },
  };
};

export default SimbiAdapter;
