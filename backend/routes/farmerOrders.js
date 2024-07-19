const router = require("express").Router();
const FarmerOrder = require("../model/FarmerOrder");

//http://localhost:8070/farmerorder/add
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const item = req.body.item;
  const productImage = req.body.productImage;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const district = req.body.district;
  const company = req.body.company;
  const mobile = req.body.mobile;
  const land = req.body.land;
  const email = req.body.email;
  const address = req.body.address;
  const expireDate = req.body.expireDate;

  const newFarmerOrder = new FarmerOrder({
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    company,
    mobile,
    land,
    email,
    address,
    expireDate,
  });

  newFarmerOrder
    .save()
    .then(() => {
      res.json("New Seller Order added succesfully!");
    })
    .catch((error) => {
      console.log(error);
    });
});

//http://localhost:8070/sellerorder/
router.route("/").get((req, res) => {
  FarmerOrder.find()
    .then((farmerorders) => {
      res.json(farmerorders);
    })
    .catch((error) => {
      console.log(error);
    });
});

//http://localhost:8070/sellerorder/update/id
router.route("/update/:id").put(async (req, res) => {
  let farmerOrderID = req.params.id;
  const {
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    company,
    mobile,
    land,
    email,
    address,
    expireDate,
  } = req.body;
  const updateFarmerOrder = {
    name,
    item,
    productImage,
    category,
    quantity,
    price,
    district,
    company,
    mobile,
    land,
    email,
    address,
    expireDate,
  };

  await FarmerOrder.findByIdAndUpdate(farmerOrderID, updateFarmerOrder)
    .then(() => {
      res.status(200).send({ status: "seller updated" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by either seller or admin
//http://localhost:8070/sellerorder/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  let farmerOrderID = req.params.id;

  await FarmerOrder.findByIdAndDelete(farmerOrderID)
    .then(() => {
      res.status(200).send({ status: "seller deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by admin
//http://localhost:8070/farmerorder/get/id
router.route("/get/:id").get(async (req, res) => {
  let farmerOrderID = req.params.id;
  await FarmerOrder.findById(farmerOrderID)
    .then((farmerOrder) => {
      res.status(200).send({ status: "post fetched", farmerOrder });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "error with ferching post" });
    });
});

//done by admin
//http://localhost:8070/farmerorder/count
router.get("/count", async (req, res) => {
  try {
    const count = await FarmerOrder.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting farmer orders:", error);
    res.status(500).json({ error: "Server error. Failed to count farmer orders." });
  }
});

// http://localhost:8070/farmerorder/getrecent
router.route("/getrecent").get(async (req, res) => {
  try {
    const farmerOrders = await FarmerOrder.find().sort({ createdAt: -1 });
    // Reverse the order of farmerOrders array to display the last data first
    const reversedOrders = farmerOrders.reverse();
    res.json(reversedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error fetching farmer orders" });
  }
});


module.exports = router;
