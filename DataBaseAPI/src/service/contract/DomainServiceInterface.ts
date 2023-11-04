export interface DomainServiceInterface<T> {
    save(entity: T): Promise<T | Error> ;
    update(entity: T): Promise<T | Error>;
    delete(entity: T): Promise<boolean>;
    findById(id: number): Promise<T | Error>;
    findAll(): Promise<T[]>;
}