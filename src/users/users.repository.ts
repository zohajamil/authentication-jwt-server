import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthenticatedUserResponseDto } from './dto/res/authenticated-user.res.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDto } from './dto/req/create-user.req.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signUp(
    createUserDto: CreateUserRequestDto,
  ): Promise<AuthenticatedUserResponseDto> {
    try {
      Logger.log('Creating new user');
      const createdUser = await this.userModel.create({
        firstName: createUserDto.firstName,
        surname: createUserDto.surname,
        email: createUserDto.email,
        password: createUserDto.password,
      });
      return {
        ...createdUser,
        accessToken: 'dfgtyhuj',
      };
    } catch (error) {
      Logger.error('user.repository', 'signUp', error.message, error.stack, '');
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getUser(email: string): Promise<User> {
    try {
      Logger.log('Getting user');

      const user: User = await this.userModel
        .findOne({ email: email }, { __v: 0 })
        .lean();
      return user;
    } catch (error) {
      Logger.error(
        'user.repository',
        'getUser',
        error.message,
        error.stack,
        '',
      );
      throw new InternalServerErrorException(error.message);
    }
  }
}
