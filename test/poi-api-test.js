'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function() {
  let pois = fixtures.pois;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

  const poiService = new POIService(fixtures.poiService);

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });
  
  setup(async function() {
    poiService.deleteAllCategories();
    poiService.deleteAllPOIs();
  });

  teardown(async function() {});

  test('create a poi', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    await poiService.makePOI(returnedCategory._id, pois[0]);
    const returnedPOIs = await poiService.getPOIs(returnedCategory._id);
    assert.equal(returnedPOIs.length, 1);
    assert(_.some([returnedPOIs[0]], pois[0]), 'returned poi must be a superset of poi');
  });

  test('create a poi and check creator', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    await poiService.makePOI(returnedCategory._id, pois[0]);
    const returnedPOIs = await poiService.getPOIs(returnedCategory._id);
    assert.isDefined(returnedPOIs[0].creator);

    const users = await poiService.getUsers();
    assert(_.some([users[0]], newUser), 'returnedUser must be a superset of newUser');

  });

  test('create multiple pois', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePOI(returnedCategory._id, pois[i]);
    }

    const returnedPOIs = await poiService.getPOIs(returnedCategory._id);
    assert.equal(returnedPOIs.length, pois.length);
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([returnedPOIs[i]], pois[i]), 'returned poi must be a superset of poi');
    }
  });

  test('delete all pois', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePOI(returnedCategory._id, pois[i]);
    }

    const d1 = await poiService.getPOIs(returnedCategory._id);
    assert.equal(d1.length, pois.length);
    await poiService.deleteAllPOIs();
    const d2 = await poiService.getPOIs(returnedCategory._id);
    assert.equal(d2.length, 0);
  });
});