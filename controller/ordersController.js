const ordersDb = require("../model/ordersModel");

exports.getOrders = (req, res, next) => {
  ordersDb
    .find({ isActive: true })
    .populate("userId", "emailid")
    .populate("material", "title imgUrl")
    .populate("dimension", "title imgUrl")
    .populate("itemDetails", "_id name imgUrl originalPrice creator")
    .then((orders) => {
      res
        .status(200)
        .json({ message: "Orders fetched successfully!!!", orders: orders });
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.createOrders = async (req, res, next) => {
  const {
    userId,
    itemDetails,
    material,
    dimension,
    quantity,
    total,
    status,
  } = req.body;

  let newOrder = await new ordersDb({
    userId,
    itemDetails,
    material,
    dimension,
    quantity,
    total,
    status,
  });

  newOrder.save().then((order) => {
    if (order) {
      res.status(200).json({
        message: "Order placed Successfully",
        orderid: order._id,
      });
    } else {
      res.status(400).json({ error: `${err}` });
    }
  });
};

exports.updateOrders = async (req, res, next) => {
  const { orderId, status } = req.body;

  try {
    let result = await ordersDb.updateOne({ _id: orderId }, { status }).exec();
    res.status(200).json({ status_Updated: status });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

exports.deleteOrders = async (req, res, next) => {
  let { orderId } = req.body;

  try {
    let result = await ordersDb
      .updateOne({ _id: orderId }, { isActive: false })
      .exec();
    res.json({ cancelled: true, message: "order Cancelled Successfully :(" });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }

};
