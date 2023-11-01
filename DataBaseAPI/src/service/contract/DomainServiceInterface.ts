export interface DomainServiceInterface<T> {
    save<T>(entity: T): Promise<T> | Error;
    update<T>(entity: T): Promise<T> | Error;
    delete<T>(entity: T): Promise<boolean>;
    findById<T>(id: number): Promise<T> | Error;
    findAll<T>(): Promise<T[]>;
}