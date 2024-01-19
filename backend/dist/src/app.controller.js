"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.appService.findOne({ email });
        if (user) {
            throw new common_1.BadRequestException({
                message: 'This Email already exists in our database. Please try with different Email.',
                statusCode: 400,
            });
        }
        return this.appService.register({
            message: 'Registration successful',
            name,
            email,
            password: hashedPassword,
        });
    }
    async login(email, password) {
        const user = await this.appService.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException({
                message: 'Invalid Credentials',
                statusCode: 400,
            });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.BadRequestException({
                message: 'Invalid Credentials',
                statusCode: 400,
            });
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        return {
            message: 'Login successful',
            token: jwt,
            statusCode: 200,
        };
    }
    async findAllUsers() {
        return await this.appService.findAllUsers();
    }
    async getUser(id) {
        const userDetails = await this.appService.getUser({ id });
        return {
            id: userDetails.id,
            name: userDetails.name,
            email: userDetails.email,
        };
    }
    async deleteUser(id) {
        return await this.appService.deleteUser(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('getAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('getUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map