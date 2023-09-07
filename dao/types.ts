type SQLRecord<TData> = {
  data: TData | TData[];
};

export interface Repository<T, K> {
  read(): Promise<T[]>;
  readById(id: K): Promise<T | undefined>;
  create(entity: Omit<T, "id" | "created_at">): Promise<T>;
  update(entity: T): Promise<T | void>;
  //delete(entity: T): Promise<void>; can delete a session by id, or session -- users have same issue with account id
}
