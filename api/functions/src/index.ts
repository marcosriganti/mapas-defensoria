import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { backup } from "firestore-export-import";
import * as bodyParser from "body-parser";
import { BigBatch } from "@qualdesk/firestore-big-batch";

const cors = require("cors");

admin.initializeApp(functions.config().firebase);

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

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
}

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

const getDocument = (collectionName: string, documentId: string) => {
  const docRef = db.collection(collectionName).doc(documentId);
  return docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return false;
    })
    .catch(error => {
      console.log("Error getting document:", error);
    });
};

const contactsCollection = "contacts";

// Add new contact
app.post("/contacts", async (req, res) => {
  try {
    const contact: Contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    const newDoc = await db
      .collection(contactsCollection)
      .add(contact)
      .then(docRef => docRef)
      .catch(error => error);

    res.status(201).send(`Created a new contact: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send("Contact should only contains firstName, lastName and email!!!");
  }
});
// Update new contact
app.patch("/contacts/:contactId", async (req, res) => {
  const updatedDoc = await db
    .collection(contactsCollection)
    .doc(req.params.contactId)
    .update(req.body)
    .then(() => true)
    .catch(err => err);

  res.status(204).send(`Update a new contact: ${updatedDoc}`);
});
// View a contact
app.get("/contacts/:contactId", (req, res) => {
  getDocument(contactsCollection, req.params.contactId)
    .then(doc => res.status(200).send(doc))
    .catch(error => res.status(400).send(`Cannot get contact: ${error}`));
});
// View all contacts
app.get("/contacts", (req, res) => {
  backup(contactsCollection)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(`Cannot get contacts: ${error}`));
});
// Delete a contact
app.delete("/contacts/:contactId", async (req, res) => {
  const deletedContact = await db
    .collection(contactsCollection)
    .doc(req.params.contactId)
    .delete()
    .then(() => ({
      status: true,
      message: `${req.params.contactId} successfully deleted!`,
    }))
    .catch(error => ({ status: false, message: error }));

  res.status(204).send(`Contact is deleted: ${deletedContact}`);
});

// Real

// Categorias
// View all contacts
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

// const addCategory = async (name) => {
//   const newDoc = await db
//     .collection("categories")
//     .add({ name })
//     .then((docRef) => docRef)
//     .catch((error) => error);
//   return newDoc;
// };
// const parseTags = tags => {
//   const r = [];
//   tags.split(";").forEach(key => {
//     r.push({
//       text: key.trim(),
//       id: key.trim(),
//     });
//   });
//   return r;
// };

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
  // tags: row.etiquetas ? parseTags(row.etiquetas) : null,
});

// const commitMultiple = (batchFactories) => {
//   let result = Promise.resolve();
//   /** Waiting 1.2 seconds between writes */
//   const TIMEOUT = 1200;

//   batchFactories.forEach((promiseFactory, index) => {
//     result = result
//       .then(() => {
//         return new Promise((resolve) => {
//           setTimeout(resolve, TIMEOUT);
//         });
//       })
//       .then(promiseFactory)
//       .then(() =>
//         console.log(`Commited ${index + 1} of ${batchFactories.length}`)
//       );
//   });

//   return result;
// };

app.post("/points", async (req, res) => {
  const records = req.body.content;
  if (records && records.length === 0) {
    res.status(200).send("No records to import ");
  }
  // eslint-disable-next-line array-callback-return
  records.map(record => {
    const id = firestoreAutoId();
    const ref = db.collection("points").doc(id);
    batch.set(ref, parseRecord(record), { merge: true });
  });
  await batch.commit();
  res.status(200).send("records updated");
});
