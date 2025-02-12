const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list(options = {}) {
    const { offset = 0, limit = 25, tag } = options
    const data = await fs.readFile(productsFile, 'utf-8') // Ensure proper encoding
  
    return JSON.parse(data)
        .filter(product => {
            if (!tag) {
                return true // Properly return true to include all products
            }
            return product.tags.some(t => t.title === tag) // Correct filtering logic
        })
        .slice(offset, offset + limit) // Slice the products
}

async function get (id) {
  const products = JSON.parse(await fs.readFile(productsFile))
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }

  return null;
}
module.exports = {
  list,
  get
}