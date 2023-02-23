import { describe, it, expect } from '@jest/globals';
import { getWorkSpace } from '../';

describe('getWorkSpace', () => {
  it('it should be the absolute path', () => {
    expect(getWorkSpace()).toBe('D:\\A-Space\\ChuTing\\Project\\console-lib');
  });
});