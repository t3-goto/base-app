import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';

class BaseUser {
  public firstName: string;

  public lastName: string;

  public email: string;

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

@Service()
export class UserService {
  private userResponse: UserResponse;

  private userResponses: UserResponse[];

  private userResponseNull: UserResponse;

  constructor(@Logger(__filename) private log: LoggerInterface) {
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

  public findAll(): Promise<UserResponse[]> {
    this.log.info('Find all users');
    return new Promise((resovle, reject) => {
      resovle(this.userResponses);
    });
  }

  public findOne(id: string): Promise<UserResponse> {
    this.log.info('Find one user');
    return new Promise((resolve, reject) => {
      if (id === 'test') {
        resolve(this.userResponse);
      } else {
        resolve(this.userResponseNull);
      }
    });
  }

  public create(): Promise<UserResponse> {
    this.log.info('Create a user');
    return new Promise((resolve, reject) => {
      resolve(this.userResponse);
    });
  }

  public update(id: string): Promise<UserResponse> {
    this.log.info('Update a user');
    return new Promise((resolve, reject) => {
      if (id === 'test') {
        resolve(this.userResponse);
      } else {
        resolve(this.userResponseNull);
      }
    });
  }

  public delete(id: string): Promise<UserResponse> {
    this.log.info('Delete a user');
    return new Promise((resolve, reject) => {
      if (id === 'test') {
        resolve(this.userResponse);
      } else {
        resolve(this.userResponseNull);
      }
    });
  }
}
