require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { ObjectId } = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const port = process.env.PORT || 9000;

//middlewares
app.use(cors());
app.use(express.json());

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const database = client.db("plantLife");
    const plantsCollection = database.collection("plants");

    app.get("/all-plants", async (req, res) => {
      const result = await plantsCollection
        .aggregate([
          {
            $project: {
              name: 1,
              price: {
                $let: {
                  vars: {
                    matchedVariant: {
                      $first: {
                        $filter: {
                          input: "$variants",
                          as: "v",
                          cond: {
                            $eq: ["$$v.id", "$defaultVariant"],
                          },
                        },
                      },
                    },
                  },
                  in: "$$matchedVariant.price",
                },
              },
              img: {
                $let: {
                  vars: {
                    matchedVariant: {
                      $first: {
                        $filter: {
                          input: "$variants",
                          as: "v",
                          cond: { $eq: ["$$v.id", "$defaultVariant"] },
                        },
                      },
                    },
                  },
                  in: "$$matchedVariant.img",
                },
              },
              second_img: {
                $cond: {
                  if: { $gte: [{ $size: "$variants" }, 2] },
                  then: { $arrayElemAt: ["$variants.img", 1] },
                  else: { $arrayElemAt: ["$more_images", 0] },
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
    // Ensures that the client will close when you finish/error
    // await client.close();
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
