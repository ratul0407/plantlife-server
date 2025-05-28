require("dotenv").config();
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { ObjectId } = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const port = process.env.PORT || 9000;

const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://plantlife-mu.vercel.app",
  ],
  credentials: true,
  optionalSuccessStatus: 200,
};
//middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ratul.gtek0.mongodb.net/?retryWrites=true&w=majority&appName=Ratul`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("plantLife");
    const plantsCollection = database.collection("plants");

    //auth related apis
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "3hr",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_DEV === "production",
          sameSite: process.env.NODE_DEV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    app.get("/plants", async (req, res) => {
      const result = await plantsCollection
        .aggregate([
          {
            $project: {
              name: 1,
              price: "$basePrice",
              img: {
                $let: {
                  vars: {
                    matchedVariant: {
                      $first: {
                        $filter: {
                          input: "$variants",
                          as: "variant",
                          cond: { $eq: ["$$variant.id", "$defaultVariant"] },
                        },
                      },
                    },
                  },
                  in: "$$matchedVariant.img",
                },
              },
              second_img: {
                $let: {
                  vars: {
                    otherVariants: {
                      $filter: {
                        input: "$variants",
                        as: "variant",
                        cond: { $ne: ["$$variant.id", "$defaultVariant"] },
                      },
                    },
                  },
                  in: {
                    $cond: {
                      if: { $gt: [{ $size: "$$otherVariants" }, 0] },
                      then: { $first: "$$otherVariants.img" },
                      else: { $arrayElemAt: ["$more_images", 0] },
                    },
                  },
                },
              },
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    //get an individual plant
    app.get("/plant/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await plantsCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to plant life server");
});
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
