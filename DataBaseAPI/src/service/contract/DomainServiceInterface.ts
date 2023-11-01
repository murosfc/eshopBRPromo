export interface DomainServiceInterface<T> {
    save<T>(entity: T): Promise<T>;
    update<T>(entity: T): Promise<T>;
    delete<T>(entity: T): Promise<T>;
    findById<T>(id: number): Promise<T>;
    findAll<T>(): Promise<T[]>;
}