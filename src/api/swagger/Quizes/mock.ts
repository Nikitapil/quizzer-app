import { faker } from '@faker-js/faker';

import {
  QuizDifficultiesEnum,
  QuizQuestionTypeEnum,
  type GenerateQuizDto,
  type ReturnGeneratedQuizDto,
  type CreateQuizQuestionDto,
  type CreateQuizDto,
  type SuccessMessageDto,
  type GetAllQuizesDto,
  type QuizDto,
  type AllQuizesReturnDto,
  type QuizQuestionReturnDto,
  type SingleQuizReturnDto,
  type PlayQuestionDto,
  type PlayQuizDto,
  type CorrectAnswerReturnDto,
  type QuizCategoriesReturnDto,
  type CategoryCountReturnDto,
  type EditQuizDto,
  type RateQuizDto
} from './data-contracts';

export class GenerateQuizDtoMock {
  public static create(
    overrides: Partial<GenerateQuizDto> = {}
  ): GenerateQuizDto {
    return {
      amount: faker.number.int(),
      category: faker.number.int(),
      difficulty: QuizDifficultiesEnum.Easy,
      type: QuizQuestionTypeEnum.Multiple,
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<GenerateQuizDto> = {}
  ): GenerateQuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class ReturnGeneratedQuizDtoMock {
  public static create(
    overrides: Partial<ReturnGeneratedQuizDto> = {}
  ): ReturnGeneratedQuizDto {
    return {
      id: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<ReturnGeneratedQuizDto> = {}
  ): ReturnGeneratedQuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class CreateQuizQuestionDtoMock {
  public static create(
    overrides: Partial<CreateQuizQuestionDto> = {}
  ): CreateQuizQuestionDto {
    return {
      question: faker.lorem.word(),
      correctAnswer: faker.lorem.word(),
      incorrectAnswers: [faker.lorem.word(), faker.lorem.word()],
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<CreateQuizQuestionDto> = {}
  ): CreateQuizQuestionDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class CreateQuizDtoMock {
  public static create(overrides: Partial<CreateQuizDto> = {}): CreateQuizDto {
    return {
      name: faker.lorem.word(),
      isPrivate: faker.datatype.boolean(),
      questions: [
        CreateQuizQuestionDtoMock.create(),
        CreateQuizQuestionDtoMock.create()
      ],
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<CreateQuizDto> = {}
  ): CreateQuizDto[] {
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

export class GetAllQuizesDtoMock {
  public static create(
    overrides: Partial<GetAllQuizesDto> = {}
  ): GetAllQuizesDto {
    return {
      page: faker.number.int(),
      limit: faker.number.int(),
      search: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<GetAllQuizesDto> = {}
  ): GetAllQuizesDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class QuizDtoMock {
  public static create(overrides: Partial<QuizDto> = {}): QuizDto {
    return {
      id: faker.lorem.word(),
      createdAt: faker.lorem.word(),
      updatedAt: faker.lorem.word(),
      name: faker.lorem.word(),
      isPrivate: faker.datatype.boolean(),
      userId: faker.number.int(),
      isInFavourites: faker.datatype.boolean(),
      canEdit: faker.datatype.boolean(),
      canDelete: faker.datatype.boolean(),
      questionsCount: faker.number.int(),
      author: faker.lorem.word(),
      rating: faker.number.int(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<QuizDto> = {}
  ): QuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class AllQuizesReturnDtoMock {
  public static create(
    overrides: Partial<AllQuizesReturnDto> = {}
  ): AllQuizesReturnDto {
    return {
      quizes: [QuizDtoMock.create(), QuizDtoMock.create()],
      totalCount: faker.number.int(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<AllQuizesReturnDto> = {}
  ): AllQuizesReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class QuizQuestionReturnDtoMock {
  public static create(
    overrides: Partial<QuizQuestionReturnDto> = {}
  ): QuizQuestionReturnDto {
    return {
      id: faker.lorem.word(),
      createdAt: faker.lorem.word(),
      updatedAt: faker.lorem.word(),
      question: faker.lorem.word(),
      correctAnswer: faker.lorem.word(),
      incorrectAnswers: [faker.lorem.word(), faker.lorem.word()],
      quizId: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<QuizQuestionReturnDto> = {}
  ): QuizQuestionReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class SingleQuizReturnDtoMock {
  public static create(
    overrides: Partial<SingleQuizReturnDto> = {}
  ): SingleQuizReturnDto {
    return {
      rating: faker.number.int(),
      id: faker.lorem.word(),
      createdAt: faker.lorem.word(),
      updatedAt: faker.lorem.word(),
      name: faker.lorem.word(),
      isPrivate: faker.datatype.boolean(),
      userId: faker.number.int(),
      questions: [
        QuizQuestionReturnDtoMock.create(),
        QuizQuestionReturnDtoMock.create()
      ],
      isInFavourites: faker.datatype.boolean(),
      isGenerated: faker.datatype.boolean(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<SingleQuizReturnDto> = {}
  ): SingleQuizReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class PlayQuestionDtoMock {
  public static create(
    overrides: Partial<PlayQuestionDto> = {}
  ): PlayQuestionDto {
    return {
      id: faker.lorem.word(),
      question: faker.lorem.word(),
      answers: [faker.lorem.word(), faker.lorem.word()],
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<PlayQuestionDto> = {}
  ): PlayQuestionDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class PlayQuizDtoMock {
  public static create(overrides: Partial<PlayQuizDto> = {}): PlayQuizDto {
    return {
      id: faker.lorem.word(),
      name: faker.lorem.word(),
      isPrivate: faker.datatype.boolean(),
      isGenerated: faker.datatype.boolean(),
      questions: [PlayQuestionDtoMock.create(), PlayQuestionDtoMock.create()],
      isInFavourites: faker.datatype.boolean(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<PlayQuizDto> = {}
  ): PlayQuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class CorrectAnswerReturnDtoMock {
  public static create(
    overrides: Partial<CorrectAnswerReturnDto> = {}
  ): CorrectAnswerReturnDto {
    return {
      answer: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<CorrectAnswerReturnDto> = {}
  ): CorrectAnswerReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class QuizCategoriesReturnDtoMock {
  public static create(
    overrides: Partial<QuizCategoriesReturnDto> = {}
  ): QuizCategoriesReturnDto {
    return {
      id: faker.number.int(),
      name: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<QuizCategoriesReturnDto> = {}
  ): QuizCategoriesReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class CategoryCountReturnDtoMock {
  public static create(
    overrides: Partial<CategoryCountReturnDto> = {}
  ): CategoryCountReturnDto {
    return {
      total_question_count: faker.number.int(),
      total_easy_question_count: faker.number.int(),
      total_medium_question_count: faker.number.int(),
      total_hard_question_count: faker.number.int(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<CategoryCountReturnDto> = {}
  ): CategoryCountReturnDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class EditQuizDtoMock {
  public static create(overrides: Partial<EditQuizDto> = {}): EditQuizDto {
    return {
      name: faker.lorem.word(),
      isPrivate: faker.datatype.boolean(),
      questions: [
        CreateQuizQuestionDtoMock.create(),
        CreateQuizQuestionDtoMock.create()
      ],
      id: faker.lorem.word(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<EditQuizDto> = {}
  ): EditQuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}

export class RateQuizDtoMock {
  public static create(overrides: Partial<RateQuizDto> = {}): RateQuizDto {
    return {
      quizId: faker.lorem.word(),
      rating: faker.number.int(),
      ...overrides
    };
  }

  public static createMany(
    count = 1,
    overrides: Partial<RateQuizDto> = {}
  ): RateQuizDto[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }
}
