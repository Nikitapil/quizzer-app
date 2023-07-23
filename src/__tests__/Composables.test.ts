import { useDocTitle } from '@/composables/useDocTitle';

describe('Composables', () => {
  it('should word useDocTitle composable', () => {
    const document = window.document;

    useDocTitle('Hello');

    expect(document.title).toBe('Quizzer | Hello');
  });
});
