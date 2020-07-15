import { DefaultTextPipe } from './default-text.pipe';

describe('DefaultTextPipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultTextPipe();
    expect(pipe).toBeTruthy();
  });
});
