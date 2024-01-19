import {
  BadRequestException,
  Body,
  Param,
  Controller,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.appService.findOne({ email });

    if (user) {
      throw new BadRequestException({
        message:
          'This Email already exists in our database. Please try with different Email.',
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

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.appService.findOne({ email });

    if (!user) {
      throw new BadRequestException({
        message: 'Invalid Credentials',
        statusCode: 400,
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({
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

  @Get('getAllUsers')
  async findAllUsers() {
    return await this.appService.findAllUsers();
  }

  @Get('getUser/:id')
  async getUser(@Param('id') id: number) {
    // console.log(id, '-----id');
    const userDetails = await this.appService.getUser({ id });
    return {
      // message: 'User details fetched successfully',
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.appService.deleteUser(id);
  }
}
