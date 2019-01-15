import { HousesRoutingModule } from './houses-routing.module';

describe('HousesRoutingModule', () => {
  let housesRoutingModule: HousesRoutingModule;

  beforeEach(() => {
    housesRoutingModule = new HousesRoutingModule();
  });

  it('should create an instance', () => {
    expect(housesRoutingModule).toBeTruthy();
  });
});
