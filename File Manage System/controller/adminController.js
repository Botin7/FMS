const UserComment = require("../models/userCommentModel");
const addPizza = require("../models/addPizza.model");
const Order = require("../models/order");

exports.getHomePage = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("លិខិតស្នើសុំថវិកាចំណាយ", {
        product: product,
        title: "Online Ordering Pizza",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAttendacePage = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("សមាសភាពឯកឧត្តមអគ្គនាយកអ គ រ ហ", {
        product: product,
        title: "Online Ordering Pizza",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getsignupPage = (req, res, next) => {
  res.render("signup", {
    pageTitle: "signup",
  });
};


exports.getMondaySpecial = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("លិខិតអញ្ជើញ", {
        product: product,
        pageTitle: "Monday Special",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCombodeals = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("លិខិតរដ្ឋបាលទូទៅ", {
        product: product,
        title: "Combo deals",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getdrinksPage = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("ឯកសារគម្រោង", {
        product: product,
        title: "Drinks Page",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getpizzaPage = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("អង្គភាពថវិកា អគរហ", {
        product: product,
        title: "Pizza Page",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllFile = (req, res, next) => {
  var perPage = 5;
  var page = req.query.page || 1;
  console.log(req.query);
    addPizza.countDocuments().then((count) => {
      addPizza
        .find()
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then((product) => {
          console.log(product);
          console.log("lll", product.length);
          res.render("ឯកសារទាំងអស់", {
            product: product,
            pageTitle: "ALL Page",
            current: page,
            length: product.length,
            pages: Math.ceil(count / perPage),
            username: req.cookies["username"],
          });
        });
    });
    // .exec(function (err, product) {
    //     addPizza.count().exec(function (err, count) {
    //         console.log("errerr",err);
    //         if (err) return next(err)
    //         res.render('adminPage', {
    //             product: product,
    //             current: page,
    //             pages: Math.ceil(count / perPage)
    //         })
    //         // }).then(product => {
    //         console.log(product);
    //         // console.log("lll", product.length);
    //         // res.render('adminPage', { product: product, pageTitle: 'Add Product' });
    //     }).catch(err => {
    //         console.log("err=====",err);
    //     })
    // })
  };

exports.editfilepage = (req, res, next) => {
  addPizza
    .findById(req.query.prodId)
    .then((product) => {
      console.log(product);
      res.render("edit-product", {
        product: product,
        title: "ធ្វើបច្ចុប្បន្នភាព",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserProfile = (req, res, next) => {
  if (!req.cookies["username"]) {
    return res.redirect("/signup");
  } else {
    addPizza
      .find()
      .then((product) => {
        console.log(product);
        res.render("profile", {
          product: product,
          title: "Profile Page",
          username: req.cookies["username"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getsidesPage = (req, res, next) => {
  addPizza
    .find()
    .then((product) => {
      console.log(product);
      res.render("លទ្ធកម្ម", {
        product: product,
        title: "លទ្ធកម្ម",
        username: req.cookies["username"],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getprofilePage = (req, res, next) => {
  res.render("profilePage", {
    pageTitle: "Profile page",
  });
};

exports.getorderform = (req, res, next) => {
  if (!req.cookies["username"]) {
    return res.redirect("/signup");
  } else {
    addPizza
      .findById(req.params.id)
      .then((product) => {
        // console.log(comment);
        res.render("orderform", {
          product: product,
          username: req.cookies["username"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.getproductPage = (req, res, next) => {
  addPizza.findById(req.params.id, function (err, product) {
    console.log(product);
    UserComment.find()
      .then((comment) => {
        // console.log(comment);
        res.render("productPage", {
          comment: comment,
          product: product,
          username: req.cookies["username"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.getPurchase = (req, res, next) => {
  res.render("purchaseHistory", {
    pageTitle: "purchaseHistory",
  });
};

exports.getadminPage = async (req, res, next) => {
  var perPage = 7;
  var page = req.query.page || 1;
  console.log(req.query);
  if (req.cookies["username"] == "admin2021") {
    addPizza.countDocuments().then((count) => {
      addPizza
        .find()
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then((product) => {
          console.log(product);
          console.log("lll", product.length);
          res.render("adminPage", {
            product: product,
            pageTitle: "Add Product",
            current: page,
            length: product.length,
            pages: Math.ceil(count / perPage),
          });
        });
    });
    // .exec(function (err, product) {
    //     addPizza.count().exec(function (err, count) {
    //         console.log("errerr",err);
    //         if (err) return next(err)
    //         res.render('adminPage', {
    //             product: product,
    //             current: page,
    //             pages: Math.ceil(count / perPage)
    //         })
    //         // }).then(product => {
    //         console.log(product);
    //         // console.log("lll", product.length);
    //         // res.render('adminPage', { product: product, pageTitle: 'Add Product' });
    //     }).catch(err => {
    //         console.log("err=====",err);
    //     })
    // })
  } else {
    res.write("You are not an admin, imposter!");
    res.end();
  }
};

exports.getPage = (req, res, next) => {
  var perPage = 9;
  var page = req.params.page || 1;

  addPizza
    .find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      addPizza.count().exec(function (err, count) {
        if (err) return next(err);
        res.render("main/products", {
          products: products,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
      console.log(products);
    });
};

exports.editFile = (req, res, next) => {
  if (req.cookies["username"] == "admin2021") {
    addPizza
      .find()
      .then((product) => {
        console.log(product);
        res.render("edit-product", {
          product: product,
          pageTitle: "ធ្វើបច្ចុប្បន្នភាព",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.write("You are not an admin, imposter!");
    res.end();
  }
};

exports.getmessage = (req, res, next) => {
  res.render("messageBox", {
    pageTitle: "Inbox page",
  });
};

exports.getrecipt = (req, res, next) => {
  res.render("Recipt", {
    pageTitle: "Recipt",
  });
};

exports.getorderlog = (req, res, next) => {
  if (req.cookies["username"] == "admin2021") {
    Order.find()
      .then((order) => {
        res.render("orderlog", { order: order });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.write("You are not an admin, imposter!");
    res.end();
  }
};

exports.getcommentlog = (req, res, next) => {
  if (req.cookies["username"] == "admin2021") {
    addPizza.find(function (err, product) {
      UserComment.find()
        .then((comment) => {
          res.render("commentlog", { comment: comment, product: product });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.write("You are not an admin, imposter!");
    res.end();
  }
};

exports.search = (req, res, next) => {
  let search = new RegExp(req.body.search2, "i");
  console.log(search);
  addPizza
    .find({
      $or: [{ category: search }, { title: search }, { description: search }],
    })
    .then((product) => {
      res.render("ឯកសារទាំងអស់", {
        product: product,
        title: "Online Ordering Pizza",
        username: req.cookies["username"],
        pages:1,
        current:1,
        length: product.length,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.searchAdmin=(req,res,next)=>{
    let search= new RegExp(req.body.search2,'i');
    console.log(search);
    addPizza.find({"$or":[
        {category:search},
        {title:search},
        {description:search},
    ],}).then(product =>{
    res.render('adminPage',{product: product,length: product.length,pages:1,current:1, title: 'Online Ordering Pizza', username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

// exports.searchAdmin = (req, res, next) => {
//   let search = new RegExp(req.body.search2, "i");
//   console.log(search);
//   var perPage = 7;
//   var page = req.query.page || 1;
//   addPizza.countDocuments().then((count) => {
//     addPizza
//       .find({
//         $or: [{ category: search }, { title: search }, { description: search }],
//       })
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .then((product) => {
//         console.log(product);
//         console.log("lll", product.length);
//         res.render("adminPage", {
//           product: product,
//           pageTitle: "Online Ordering Pizza",
//           current: page,
//           length: product.length,
//           pages: Math.ceil(count / perPage),
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// };
