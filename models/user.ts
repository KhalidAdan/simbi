export class User {
  id: string;
  name?: string;
  email: string;
  emailVerified: Date;
  image?: string;
  createdDate?: Date;
  updatedDate?: Date;
  constructor(row: any) {
    this.id = row.id;
    this.name = row.name ?? null;
    this.email = row.email ?? null;
    this.emailVerified = row.email_verified; // TODO: Fix this if we ever allow paswordless logins
    this.image = row.image ?? null;
    this.createdDate = row.created_date ?? null;
    this.updatedDate = row.update_date ?? null;
  }
}
