import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { backup } from "firestore-export-import";
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();
const app = express();
const main = express();
// const pointsCollection = "points";

main.use("/api/v1", app);
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

const getDocument = (collectionName: string, documentId: string) => {
  const docRef = db.collection(collectionName).doc(documentId);
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return false;
    })
    .catch((error) => {
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
      .then((docRef) => docRef)
      .catch((error) => error);

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
    .catch((err) => err);

  res.status(204).send(`Update a new contact: ${updatedDoc}`);
});
// View a contact
app.get("/contacts/:contactId", (req, res) => {
  getDocument(contactsCollection, req.params.contactId)
    .then((doc) => res.status(200).send(doc))
    .catch((error) => res.status(400).send(`Cannot get contact: ${error}`));
});
// View all contacts
app.get("/contacts", (req, res) => {
  backup(contactsCollection)
    .then((data) => res.status(200).send(data))
    .catch((error) => res.status(400).send(`Cannot get contacts: ${error}`));
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
    .catch((error) => ({ status: false, message: error }));

  res.status(204).send(`Contact is deleted: ${deletedContact}`);
});

app.get("/users", (req, res) => {
  auth
    .listUsers(1000)
    .then((listUsersResult) => {
      const data = [];
      listUsersResult.users.forEach((userRecord) => {
        data.push(userRecord);
      });
      return res.status(200).send(data);
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
});
