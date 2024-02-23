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
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly loggingService: LoggingService,
  ) {}

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

        const jwtToken = await this.jwtService.signAsync(
          { user },
          {
            secret: process.env.JWT_KEY,
          },
        );

        this.loggingService.create({
          description: `${user.email} signed up.`,
          isError: false,
        });

        return { ...user, accessToken: jwtToken };
      }
    } catch (error) {
      this.loggingService.create({
        description: `Error while signing up ${createUserDto.email} - ${error.message}.`,
        isError: true,
      });
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
      if (passwordValidated) {
        const jwtToken = await this.jwtService.signAsync(
          { user },
          {
            secret: process.env.JWT_KEY,
          },
        );
        this.loggingService.create({
          description: `${user.email} signed in.`,
          isError: false,
        });
        return { ...user, accessToken: jwtToken };
      } else {
        throw new NotFoundException('Wrong email or password');
      }
    } catch (error) {
      this.loggingService.create({
        description: `Error while logging in ${authenticateUserDto.email} - ${error.message}.`,
        isError: true,
      });
      throw new InternalServerErrorException(error.message);
    }
  }

  // async getUser(email: string): Promise<User> {
  //   try {
  //     const user = await this.userRepository.getUser(email);
  //     if (user) {
  //       return user;
  //     } else {
  //       throw new NotFoundException('User does not exist!');
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

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
