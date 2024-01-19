import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    register(data: any): Promise<User>;
    findOne(condition: any): Promise<User>;
    findAllUsers(): Promise<User[]>;
    getUser(id: any): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
