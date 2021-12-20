import IRepository from './repository/repository';
import IMessage from './repository/repository.ts';
import {Db, MongoClient, Collection, InsertOneWriteOpResult, WithId, DeleteWriteOpResultObject, UpdateWriteOpResult, ObjectId} from 'mongodb';



export abstract class DaosRepo<T extends WithId> implements IRepository<T> {
    protected collection: Collection<T>;
    protected db: Db;

    constructor(db: Db, collectionName: string) {
        this.db = db;
        this.collection = this.db.collection(collectionName);
    }

    public async create(item: T): Promise<T> {
        const result: InsertOneWriteOpResult<WithId> = await this.collection.insertOne(item);
        return this.findById(result.insertedId);
    }

    public async getAll(): Promise<T[]> {
        const result: T[] = await this.collection.find().toArray();
        return result;
    }

    public async findById(id: string): Promise<T> {
        const result: T = await this.collection.findOne({_id: new ObjectId(id)});
        return result;
    }

    public async update(id: string, item: T): Promise<T> {
        const result: UpdateWriteOpResult = await this.collection.updateOne({_id: new ObjectId(id)}, item);
        return this.findById(id);
    }

    public async delete(id: string): Promise<DeleteWriteOpResultObject> {
        const result: DeleteWriteOpResultObject = await this.collection.deleteOne({_id: new ObjectId(id)});
        return result;
    }

}