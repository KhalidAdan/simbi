export class Account {
  id?: string;
  userId: string;
  provider?: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpiresAt?: Date;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  createdDate?: Date;
  updatedDate?: Date;
  constructor(row: any) {
    this.id = row.id;
    this.userId = row.user_id;
    this.provider = row.provider ?? null;
    this.providerAccountId = row.provider_account_id ?? null;
    this.refreshToken = row.refresh_token ?? null;
    this.accessToken = row.access_token ?? null;
    this.accessTokenExpiresAt = row.expires_at ?? null;
    this.tokenType = row.token_type ?? null;
    this.scope = row.scope ?? null;
    this.idToken = row.id_token ?? null;
    this.tokenType = row.token_type ?? null;
    this.createdDate = row.created_date ?? null;
    this.updatedDate = row.update_date ?? null;
  }
}

export type AccountType = typeof Account;
