import { faker } from '@faker-js/faker';

import {
  UserRolesEnum,
  type EditUserDto,
  type UserReturnDto,
  type SuccessMessageDto
} from './data-contracts';

export class EditUserDtoMock {
  public static create(overrides: Partial<EditUserDto> = {}): EditUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<EditUserDto> = {}
  ): EditUserDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class UserReturnDtoMock {
  public static create(overrides: Partial<UserReturnDto> = {}): UserReturnDto {
    return {
      id: faker.number.int(),
      email: faker.internet.email(),
      username: faker.lorem.word(),
      role: UserRolesEnum.User,
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<UserReturnDto> = {}
  ): UserReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class SuccessMessageDtoMock {
  public static create(
    overrides: Partial<SuccessMessageDto> = {}
  ): SuccessMessageDto {
    return {
      message: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<SuccessMessageDto> = {}
  ): SuccessMessageDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
