import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  OnUndefined,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { UserService } from '../services/UserService';

class BaseUser {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public username: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
  }
}

export class UserResponse extends BaseUser {
  @IsUUID()
  public id: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string
  ) {
    super(firstName, lastName, email, username);
    this.id = id;
  }
}

class CreateUserBody extends BaseUser {
  @IsNotEmpty()
  public password: string;
}

/**
 * UserController.
 */
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {
  private userResponse: UserResponse;

  private userResponses: UserResponse[];

  private userResponseNull: UserResponse;

  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private userService: UserService
  ) {
    this.userResponse = new UserResponse(
      'i000',
      'faaa',
      'lbbb',
      'eccc',
      'uddd'
    );
    this.userResponses = new Array<UserResponse>();
    this.userResponses.push(this.userResponse);
    this.userResponses.push(this.userResponse);
  }

  /**
   * Get: /users
   */
  @Get()
  @ResponseSchema(UserResponse, { isArray: true })
  public findAll(): Promise<UserResponse[]> {
    this.log.info('Find all users');
    return this.userService.findAll();
  }

  /**
   * Get: /users/me
   */
  // @Get('/me')
  // @ResponseSchema(UserResponse)
  // public findMe(): Promise<UserResponse> {
  //   return new Promise((resovle, reject) => {
  //     resovle(this.userResponse);
  //   });
  // }

  /**
   * Get: /users/:id
   */
  @Get('/:id')
  @OnUndefined(UserNotFoundError)
  @ResponseSchema(UserResponse)
  public findOne(@Param('id') id: string): Promise<UserResponse> {
    this.log.info('Find one user');
    return this.userService.findOne(id);
  }

  /**
   * Post: /users with Body
   */
  @Post()
  @ResponseSchema(UserResponse)
  public create(@Body() body: CreateUserBody): Promise<UserResponse> {
    this.log.info('Create a user');
    return this.userService.create();
  }

  /**
   * Put: /users/:id with Body
   */
  @Put('/:id')
  @OnUndefined(UserNotFoundError)
  @ResponseSchema(UserResponse)
  public update(
    @Param('id') id: string,
    @Body() body: BaseUser
  ): Promise<UserResponse | undefined> {
    this.log.info('Update a user');
    return this.userService.update(id);
  }

  /**
   * Delete: /users/:id
   */
  @Delete('/:id')
  public delete(@Param('id') id: string): Promise<UserResponse> {
    this.log.info('Delete a user');
    return this.userService.delete(id);
  }
}
