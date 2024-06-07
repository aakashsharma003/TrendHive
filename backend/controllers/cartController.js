const { Cart, Cart_Item } = require("../models/schema");

const getUserCart = async (req, res) => {
  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user_id: req.params.userId });
    if (!cart) {
      return res.status(200).send({ cart: [] });
    }

    // Find the cart items for the cart and populate the product details
    const cartItems = await Cart_Item.find({ cart_id: cart._id }).populate(
      "product_id"
    );

    // Transform cart items to include SKU
    const cartItemsWithSKU = cartItems.map((item) => ({
      _id: item._id,
      product: {
        _id: item.product_id._id,
        title: item.product_id.title,
        price: item.product_id.price,
        sku: item.product_id.sku, // assuming the product schema has an SKU field
        description: item.product_id.description,
      },
      quantity: item.quantity,
    }));

    res.status(200).send({ cart: cartItemsWithSKU });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // Find or create cart for the user
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = new Cart({ user_id: userId });
      await cart.save();
    }
    // console.log(cart);
    // Check if item already exists in cart
    let cartItem = await Cart_Item.findOne({
      cart_id: cart._id,
      product_id: productId,
    });
    console.log(cartItem);
    if (cartItem) {
      // If exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If not, create new cart item
      console.log("hello");
      cartItem = new Cart_Item({
        cart_id: cart._id,
        product_id: productId,
        quantity,
      });

      await cartItem.save();
    }

    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add product to cart", details: err });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId, "items.product": req.params.productId },
      { $set: { "items.$.quantity": req.body.quantity } },
      { new: true }
    ).populate("items.product");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { items: { product: req.params.productId } } },
      { new: true }
    ).populate("items.product");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
};

module.exports = {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
