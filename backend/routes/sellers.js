const router = require("express").Router();
const Seller = require("../model/Seller");

//done by seller
//http://localhost:8070/seller/register
router.route("/register").post((req, res) => {
  const userRole = req.body.userRole;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const district = req.body.district;

  const newSeller = new Seller({
    userRole,
    fname,
    lname,
    email,
    district,
    password,
  });

  newSeller
    .save()
    .then(() => {
      res.json("New seller added succesfully!");
    })
    .catch((error) => {
      console.log(error);
    });
});

//done by admin
//http://localhost:8070/seller/
router.route("/").get((req, res) => {
  Seller.find()
    .then((sellers) => {
      res.json(sellers);
    })
    .catch((error) => {
      console.log(error);
    });
});

//done by seller
//http://localhost:8070/seller/update/id
router.route("/update/:id").put(async (req, res) => {
  let sellerID = req.params.id;
  const { userRole, fname, lname, email, district, password } = req.body;

  const updateSeller = {
    userRole,
    fname,
    lname,
    email,
    district,
    password,
  };

  await Seller.findByIdAndUpdate(sellerID, updateSeller)
    .then(() => {
      res.status(200).send({ status: "seller updated" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by either seller or admin
//http://localhost:8070/seller/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const sellerID = req.params.id;
    await Seller.findByIdAndDelete(sellerID);
    res.status(200).send({ status: "Seller deleted" });
  } catch (error) {
    console.error("Error deleting seller:", error);
    res.status(500).json({ status: "Error with deleting data" });
  }
});

//done by admin
//http://localhost:8070/seller/get/id
router.route("/get/:id").get(async (req, res) => {
  let sellerID = req.params.id;
  await Seller.findById(sellerID)
    .then((seller) => {
      res.status(200).send({ status: "Seller fetched", seller });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "error with ferching student" });
    });
});

//done by admin
//http://localhost:8070/seller/count
router.get("/count", async (req, res) => {
  try {
    const count = await Seller.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting sellers:", error);
    res.status(500).json({ error: "Server error. Failed to count sellers." });
  }
});

module.exports = router;
