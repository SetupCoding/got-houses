import { HousesModule } from './houses.module';

describe('HousesModule', () => {
  let housesModule: HousesModule;

  beforeEach(() => {
    housesModule = new HousesModule();
  });

  it('should create an instance', () => {
    expect(housesModule).toBeTruthy();
  });
});
