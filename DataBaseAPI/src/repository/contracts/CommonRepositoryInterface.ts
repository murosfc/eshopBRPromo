export interface CommonRepositoryInterface<T> {
    create(data: T): Promise<T>;
    update(data: T): Promise<T>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    }   