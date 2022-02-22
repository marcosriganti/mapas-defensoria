import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { backup } from "firestore-export-import";
import * as bodyParser from "body-parser";
import { BigBatch } from "@qualdesk/firestore-big-batch";
// import * as allPoints from "./points.json";

// const fs = require("fs");
// const util = require("util");
// // Convert fs.readFile into Promise version of same
// const readFile = util.promisify(fs.readFile);
const cors = require("cors");

// const pointsFile = "./points.json";

admin.initializeApp(functions.config().firebase);
const myBucket = admin.storage().bucket();

const db = admin.firestore();
const batch = new BigBatch({ firestore: db }); //
const auth = admin.auth();
const app = express();
const main = express();
// const pointsCollection = "points";
app.use(cors({ origin: true }));
main.use("/api/v1", app);
main.use(cors({ origin: true }));
main.use(bodyParser.json());
const opt = { extended: false };
main.use(bodyParser.urlencoded(opt));

// eslint-disable-next-line import/prefer-default-export
export const webApi = functions.https.onRequest(main);

interface User {
  password: string;
  email: string;
}
const firestoreAutoId = (): string => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

const updateStorage = async () => {
  // This updates the Storage with all the points
  const docs = [];
  const pointsRef = db.collection("points");
  const activeRef = await pointsRef.get();
  // eslint-disable-next-line no-restricted-syntax
  for (const doc of activeRef.docs) {
    docs.push({
      id: doc.id,
      ...doc.data(),
    });
  }
  const jsonString = JSON.stringify(docs);
  const file = myBucket.file("storage-points.json");
  file.save(jsonString);
};

// Categorias
app.get("/categories", (req, res) => {
  backup("categories")
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(`Cannot get contacts: ${error}`));
});

app.get("/users", (req, res) => {
  auth
    .listUsers(1000)
    .then(listUsersResult => {
      const data = [];
      listUsersResult.users.forEach(userRecord => {
        data.push(userRecord);
      });
      return res.status(200).send(data);
    })
    .catch(error => {
      console.log("Error listing users:", error);
    });
});
// Get Users List
app.post("/users", async (req, res) => {
  const user: User = {
    password: req.body.password,
    email: req.body.email,
  };
  const userInfo = {
    email: user.email,
    emailVerified: false,
    password: user.password,
    disabled: false,
  };
  auth
    .createUser(userInfo)
    .then(userRecord => {
      res.status(201).send(
        // eslint-disable-next-line comma-dangle
        `Usuario Creado: ${userRecord.uid}`
      );
    })
    .catch(error => {
      res.status(400).send(`Error: ${error}`);
    });
  // }
});
// Gets the User
app.get("/users/:userId", (req, res) => {
  auth
    .getUser(req.params.userId)
    .then(userRecord => res.status(200).send(userRecord))
    .catch(error => res.status(400).send(`Cannot get userRecord: ${error}`));
});

app.patch("/users/:userId", async (req, res) => {
  const user: User = {
    password: req.body.password,
    email: req.body.email,
  };
  auth
    .updateUser(req.params.userId, user)
    .then(userRecord => {
      res.status(204).send(`Update a User : ${userRecord.uid}`);
    })
    .catch(error => {
      res.status(400).send(`Error: ${error}`);
    });
});

app.delete("/users/:userId", async (req, res) => {
  auth
    .deleteUser(req.params.userId)
    .then(() => {
      res.status(204).send(`User is deleted: ${req.params.userId}`);
    })
    .catch(error => {
      res.status(400).send(`Error: ${error}`);
    });
});
// Masive

const parseTags = (tags: string) => {
  const r = [];
  tags.split(";").forEach(key => {
    r.push({
      text: key.trim(),
      id: key.trim(),
    });
  });
  return r;
};

const parseRecord = row => ({
  name: row.nombre_institucion || null,
  description: row.descripcion || null,
  extended_description: row.informacion_detallada || null,
  address: row.direccion || null,
  email: row.email || null,
  instagram: row.instagram || null,
  facebook: row.facebook || null,
  linkedin: row.linkedin || null,
  twitter: row.twitter || null,
  youtube: row.youtube || null,
  phone: row.telefono || null,
  latitud: row.latitud || null,
  longitude: row.longitud || null,
  city: row.localidad || null,
  web: row.web || null,
  subcategory: row.subcategoria || null,
  category: row.categoria || null,
  tags: row.etiquetas ? parseTags(row.etiquetas) : null,
  createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
});

app.post("/points", async (req, res) => {
  const records = req.body.content;
  if (records && records.length === 0) {
    res.status(200).send("No records to import ");
  }
  // eslint-disable-next-line array-callback-return
  records.map(record => {
    const id = firestoreAutoId();
    const refPoint = db.collection("points").doc(id);
    batch.set(refPoint, parseRecord(record), { merge: true });
  });
  await batch.commit();
  await updateStorage();
  res.status(200).send("records updated");
});

app.get("/points", async (req, res) => {
  const file = myBucket.file("storage-points.json");

  const data = await file.get();
  const fileData = data[0];
  // const apiResponse = data[1];

  // res.status(200).send("asset token should be placed in here ");
  res.status(200).json(fileData);
});
// app.get("/allPoints", async (req, res) => {
//   res.status(200).json(allPoints);
// });

// app.get("/updatePoints", async (req, res) => res.status(200).send("Updating the points"));

app.get("/updateStorage", async (req, res) => {
  await updateStorage();
  return res.status(200).send("Updating the points");
});
