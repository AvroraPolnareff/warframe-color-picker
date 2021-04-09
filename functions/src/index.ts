import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from 'firebase-admin'
import * as bodyParser from "body-parser"
import * as cors from "cors"
import { nanoid } from "nanoid"
import {paletteSchema} from "./schemas";
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const api = express()
const app = express()
app.use(cors({origin: true}))

api.use("/api/v1", app)
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))

app.post("/palettes", async (req, res) => {
  try {
    const palette = JSON.parse(req.body) as Palette
    if (paletteSchema.validate(palette).error) {
      res.status(400).send("one of the fields is invalid");
    }
    const shortId = nanoid(10)
    await db.collection(Collection.Palettes).doc(shortId).set(palette)

    res.status(201).send(shortId)
  } catch (e) {
    functions.logger.log(e)
    res.status(400).send(e.message)
  }
})

app.get("/palettes/:short", async (req, res) => {
  try {
    const { short } = req.params;
    const palette = await db.collection(Collection.Palettes).doc(short).get()
    if (!palette.exists) {
      res.status(404).send("palette not found")
    }
    res.status(200).json(palette.data())
  } catch (e) {
    res.status(500).send(e.message)
  }
})

export const webApi = functions.region("europe-west1").https.onRequest(api)

enum Collection {
  Palettes = "Palettes"
}

interface Palette {
  name: string
  colors: string[]
}
