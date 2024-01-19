import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<import("./entity/user.entity").User>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
        statusCode: number;
    }>;
    findAllUsers(): Promise<import("./entity/user.entity").User[]>;
    getUser(id: number): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    deleteUser(id: number): Promise<void>;
}
