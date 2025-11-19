export default interface IModel<T>{
    create(t: T) : Promise<T>;
    read(readById: number): Promise<T[]>;
    update(t: T): Promise<T>;
    delete(t: T): Promise<T>;
}