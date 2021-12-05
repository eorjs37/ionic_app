import * as fromNgrx from './ngrx.actions';

describe('loadNgrxs', () => {
  it('should return an action', () => {
    expect(fromNgrx.loadNgrxs().type).toBe('[Ngrx] Load Ngrxs');
  });
});
