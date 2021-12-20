export class Message {
    private name: string;
    private message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }
}

export class Repository {
    private messages: Message[] = [];

    public addMessage(message: Message): void {
        this.messages.push(message);
    }

    public getMessages(): Message[] {
        return this.messages;
    }
}

export interface IRepository {
    addMessage(message: Message): void;
    getMessages(): Message[];
}

export interface IMessage {
    create(item: Message): Promise<Message>;
    getAll(): Promise<Message[]>;
}
