const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const { Item } = require("./Item");

Menu.belongsToMany(Item, { through: "Menu-Item" });
Item.belongsToMany(Menu, { through: "Menu-Item" });

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

module.exports = { Restaurant, Menu, Item };
