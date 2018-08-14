var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

/**
 * Products Schema
 */
var productsSchema = new Schema(
  {
    image: String,
    productName: String,
    description: String,
    productId: String,
  },
  { collection: 'products' }
);

var Products = mongoose.model('Products', productsSchema);
module.exports = Products;
