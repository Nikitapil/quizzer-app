import { useDocTitle } from '@/composables/useDocTitle';

describe('Composables', () => {
  it('should work useDocTitle composable', () => {
    const document = window.document;

    useDocTitle('Hello');

    expect(document.title).toBe('Quizzer | Hello');
  });
});
