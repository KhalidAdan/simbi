export interface Repository<T, K> {
  read(): Promise<T[]>;
  readById(id: K): Promise<T | undefined>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
