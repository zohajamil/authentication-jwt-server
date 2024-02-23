import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticatedUserResponseDto } from './dto/res/authenticated-user.res.dto';
import { CreateUserRequestDto } from './dto/req/create-user.req.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserRequestDto } from './dto/req/authenticate-user.req.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signUp(
    createUserDto: CreateUserRequestDto,
  ): Promise<AuthenticatedUserResponseDto> {
    try {
      const existingUser = await this.userRepository.getUser(
        createUserDto.email,
      );
      if (existingUser && existingUser.email) {
        throw new HttpException('User already exists!', HttpStatus.CONFLICT);
      } else {
        const passwordHash = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.signUp({
          ...createUserDto,
          password: passwordHash,
        });
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async authenticate(
    authenticateUserDto: AuthenticateUserRequestDto,
  ): Promise<AuthenticatedUserResponseDto> {
    try {
      const user = await this.userRepository.getUser(authenticateUserDto.email);
      const passwordValidated = await this.validateUserPassword(
        authenticateUserDto.password,
        user,
      );
      if (passwordValidated) return { ...user, accessToken: 'dfghj' };
      else throw new NotFoundException('Wrong email or password');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUserPassword(
    enteredPassword: string,
    user: User,
  ): Promise<boolean> {
    try {
      if (user) {
        let isMatch = false;
        if (user.password) {
          isMatch = await bcrypt.compare(enteredPassword, user.password);
        }

        return isMatch;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
