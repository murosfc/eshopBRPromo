export abstract class DomainError extends Error {
    name: string;
        
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
    }
            
}