export class User {
  id?: number;
  name: string;
  email: string;
  emailVerified?: Date;
  image: string;
  createdDate?: Date;
  updatedDate?: Date;
  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.emailVerified = row.email_verified ?? undefined;
    this.image = row.image;
    this.createdDate = row.created_date ?? undefined;
    this.updatedDate = row.update_date ?? undefined;
  }
}
