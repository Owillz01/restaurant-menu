const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu, seedItem
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
          const createdRestaurant = await Restaurant.create(seedRestaurant[0]);
          expect(createdRestaurant).toEqual(
            expect.objectContaining(seedRestaurant[0])
          );

        // expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can create a Menu', async () => {
        // TODO - write test
        const createdMenu = await Menu.create(seedMenu[0]);
        expect(createdMenu).toEqual(expect.objectContaining(seedMenu[0]));
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        await Restaurant.create(seedRestaurant[0]);
        let [found] = await Restaurant.findAll()
        expect(found).toEqual(
          expect.objectContaining({
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood",
          })
        );
    });

    test('can find Menus', async () => {
        await Menu.create(seedMenu[0]);
        let [found] = await Menu.findAll();
        expect(found).toEqual(
          expect.objectContaining({
            title: "Breakfast",
          })
        );
    });

    test("can Update Restaurants", async () => {
      // TODO - write test
      await Restaurant.create(seedRestaurant[0]);
      let [found] = await Restaurant.findAll();
      let updated = await found.update({
        name: "Spice Grill",
        location: "Houston",
        cuisine: "Indian",
      });
      expect(updated).toEqual(
        expect.objectContaining({
          name: "Spice Grill",
          location: "Houston",
          cuisine: "Indian",
        })
      );
    });

    test("can Update Menus", async () => {
      await Menu.create(seedMenu[0]);
      let [found] = await Menu.findAll();
      let updated = await found.update({
    title: 'Dinner'
  })
      expect(updated).toEqual(
        expect.objectContaining({
        title: 'Dinner'
    }));
    });

    test("Can delete a Restaurant instance", async () => {
      // TODO - write test
    //   await Restaurant.create(seedRestaurant[0]);
      let [found] = await Restaurant.findAll();
      let deleted = await found.destroy();
      expect(deleted).toEqual(
        expect.objectContaining({
          name: "Spice Grill",
          location: "Houston",
          cuisine: "Indian",
        })
      );
    });

    test("Can delete a Menu instance", async () => {
    //   await Menu.create(seedMenu[0]);
      let [found] = await Menu.findAll();
      let deleted = await found.destroy();
      expect(deleted).toEqual(
        expect.objectContaining({
          title: "Dinner",
        })
      );
    });

    test('Eager loading', async () => {
        let allMenus = await Menu.bulkCreate(seedMenu)
        let allMenuItems = await Item.bulkCreate(seedItem);
        await allMenus[0].addItems(allMenuItems);
        let menuss = await Menu.findAll({
          include: { model: Item},
        });

        expect(menuss[2].Items.length).toBe(3
        );
        
        // let menus = Menu.ge
    })

//     await User.findAll({
//   include: { model: Tool, as: 'Instruments' },
// });


})