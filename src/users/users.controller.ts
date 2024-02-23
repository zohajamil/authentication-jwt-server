import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticateUserRequestDto } from './dto/req/authenticate-user.req.dto';
import { AuthenticatedUserResponseDto } from './dto/res/authenticated-user.res.dto';
import { CreateUserRequestDto } from './dto/req/create-user.req.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(
    @Res() response,
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<AuthenticatedUserResponseDto> {
    try {
      console.log(createUserDto);
      const data = await this.usersService.signUp(createUserDto);
      return response.status(HttpStatus.OK).send(data);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post('/authenticate')
  async authenticate(
    @Res() response,
    @Body() authenticateUserDto: AuthenticateUserRequestDto,
  ): Promise<AuthenticatedUserResponseDto> {
    try {
      const data = await this.usersService.authenticate(authenticateUserDto);
      return response.status(HttpStatus.OK).send(data);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
