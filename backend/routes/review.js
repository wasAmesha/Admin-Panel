const router = require("express").Router();
const Review = require("../model/Review");

//http://localhost:8070/review/add
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const userRole = req.body.userRole;
    const comment = req.body.comment;
    const date = req.body.date;
  
    const newReview = new Review({
        name,
        email,
        userRole,
        comment,
        date,
    });
  
    newReview
      .save()
      .then(() => {
        res.json("Review added succesfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  });


//http://localhost:8070/review/
router.route("/").get((req, res) => {
    Review.find()
    .then((review) => {
      res.json(review);
    })
    .catch((error) => {
      console.log(error);
    });
});

//http://localhost:8070/review/update/id
router.route("/update/:id").put(async (req, res) => {
  let reviewID = req.params.id;
  const {
    name,
    email,
    userRole,
    comment,
    date,
  } = req.body;
  const updateReview = {
    name,
    email,
    userRole,
    comment,
    date,
  };

  await Review.findByIdAndUpdate(reviewID, updateReview)
    .then(() => {
      res.status(200).send({ status: "review updated" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by admin
//http://localhost:8070/review/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  let reviewID = req.params.id;

  await Review.findByIdAndDelete(reviewID)
    .then(() => {
      res.status(200).send({ status: "Review deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//done by admin
//http://localhost:8070/review/get/id
router.route("/get/:id").get(async (req, res) => {
  let reviewID = req.params.id;
  await Review.findById(reviewID)
    .then((review) => {
      res.status(200).send({ status: "review fetched", review });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ status: "error with ferching review" });
    });
});

module.exports = router;
