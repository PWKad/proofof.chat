const utils = require('../../../helpers/utils');

// TODO: Test
describe('Utils', () => {
  beforeEach(() => {
    console.log('setting up')
  });

  describe('getCurrent()', () => {
    it('returns the current user', () => {

    });

    it('returns the current users wallet hydrated', () => {

    });
  });

  describe('getSystemWallet()', () => {
    it('gets the system wallet', () => {

    });

    it('hydrates the paymentRequests', () => {

    });

    it('hydrates the paymentRequests.listing', () => {

    });

    it('hydrates the addresses', () => {

    });
  });

  describe('validateRoute()', () => {
    it('does not block execution if the role is valid', () => {

    });

    it('returns a 403 response if route is not valid', () => {

    });
  });

  describe('checkUserRouteRequirements()', () => {
    describe('when route requires a leader', () => {
      it('returns a populated errors array if user is not a leader', () => {

      });
    });

    describe('when route requires at least an approved user', () => {
      it('returns an empty array if user is approved', () => {

      });

      it('returns an empty array if user is a leader and approved', () => {

      });

      it('returns a populated errors array if user is a leader and not approved', () => {

      });

      it('returns a populated errors array if user is not approved', () => {

      });
    });

    describe('when route requires at least a read-only user', () => {
      it('returns an empty array if user is approved', () => {

      });

      it('returns a populated errors array if user does not exist', () => {

      });
    });
  });

  afterEach(() => {
    console.log('clearing');
  });
});
