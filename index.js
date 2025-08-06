// index.js
const express   = require("express");
const mongodb   = require("mongodb");
const ObjectId  = mongodb.ObjectId;
require("dotenv").config();

(async () => {
  const {
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_NAME: dbName,
    DB_CHAR: dbChar,
    PORT:    portEnv
  } = process.env;

  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 3001;
  const connectionString = 
    `mongodb+srv://${dbUser}:${dbPassword}` +
    `@cluster0.${dbChar}.mongodb.net/${dbName}` +
    `?retryWrites=true&w=majority`;

  const client = await mongodb.MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  });

  const db           = client.db(dbName);
  const personagens  = db.collection("personagens");

  // --- Helpers de filtro que aceitam ObjectId ou id numérico ---
  function buildFilterById(param) {
    if (/^[0-9a-fA-F]{24}$/.test(param)) {
      return { _id: ObjectId(param) };
    }
    if (!isNaN(+param)) {
      return { id: +param };
    }
    return null;
  }

  // CORS open
  app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin",  "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Accept, X-Requested-With, Content-Type, Authorization"
    );
    next();
  });

  app.get("/", (req, res) => {
    res.send({ info: "API Rick & Morty Backend" });
  });

  // [GET] lista tudo
  app.get("/personagens", async (req, res) => {
    const all = await personagens.find({}).toArray();
    res.send(all);
  });

  // [GET] busca por ID (ObjectId ou numérico)
  app.get("/personagens/:id", async (req, res) => {
    const filter = buildFilterById(req.params.id);
    if (!filter) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const doc = await personagens.findOne(filter);
    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.send(doc);
  });

  // [POST] cria novo
  app.post("/personagens", async (req, res) => {
    const { nome, imagemUrl, id } = req.body;
    if (!nome || !imagemUrl) {
      return res.status(400).json({ error: "Missing nome or imagemUrl" });
    }
    // opcional: garantir que id numérico (RM API) seja salvo
    const payload = { nome, imagemUrl, ...(id && { id }) };
    const result = await personagens.insertOne(payload);
    res.status(201).json({ ...payload, _id: result.insertedId });
  });

  // [PUT] atualiza por ID (ObjectId ou numérico)
  app.put("/personagens/:id", async (req, res) => {
    const filter = buildFilterById(req.params.id);
    if (!filter) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const update = { $set: req.body };
    const result = await personagens.findOneAndUpdate(filter, update, {
      returnDocument: "after"
    });
    if (!result.value) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(result.value);
  });

  // [DELETE] remove por ID (ObjectId ou numérico)
  app.delete("/personagens/:id", async (req, res) => {
    const filter = buildFilterById(req.params.id);
    if (!filter) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const result = await personagens.deleteOne(filter);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(204).end();
  });

  app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
  });
})();
