import { faker } from '@faker-js/faker';

import {
  UserRolesEnum,
  type CreateUserDto,
  type UserReturnDto,
  type AuthResponseDto,
  type LoginUserDto,
  type SuccessMessageDto,
  type GetRestoreKeyDto,
  type RestorePasswordDto
} from './data-contracts';

export class CreateUserDtoMock {
  public static create(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      username: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<CreateUserDto> = {}
  ): CreateUserDto[] {
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

export class AuthResponseDtoMock {
  public static create(
    overrides: Partial<AuthResponseDto> = {}
  ): AuthResponseDto {
    return {
      accessToken: faker.lorem.word(),
      user: UserReturnDtoMock.create(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<AuthResponseDto> = {}
  ): AuthResponseDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class LoginUserDtoMock {
  public static create(overrides: Partial<LoginUserDto> = {}): LoginUserDto {
    return {
      email: faker.internet.email(),
      password: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<LoginUserDto> = {}
  ): LoginUserDto[] {
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

export class GetRestoreKeyDtoMock {
  public static create(
    overrides: Partial<GetRestoreKeyDto> = {}
  ): GetRestoreKeyDto {
    return {
      email: faker.internet.email(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<GetRestoreKeyDto> = {}
  ): GetRestoreKeyDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class RestorePasswordDtoMock {
  public static create(
    overrides: Partial<RestorePasswordDto> = {}
  ): RestorePasswordDto {
    return {
      key: faker.lorem.word(),
      password: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<RestorePasswordDto> = {}
  ): RestorePasswordDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
