const express = require("express");
const prisma = require("./prisma/index");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await prisma.User.create({
    data: {
      email: "almor.bibasik@gmail.com",
      password: "test",
      reqIp: "192.168.1.1",
      phoneNumber: "+77769072003",
      iin: "030730550638",
      avatar: "/link",
    },
  });
  res.json(result);
});

app.get("/get", async (req, res) => {
  const result = await prisma.User.findMany({ include: { task: true } });
  res.json(result);
});

app.get("/posts", async (req, res) => {
  const result = await prisma.Task.findMany({
    include: {
      user: true,
    },
  });
  res.json(result);
});

app.get("/quest", async (req, res) => {
  const result = await prisma.Questionnaire.create({
    data: {
      birthDay: "tak",
      street: "tak",
      flat: "tak",
      work: "tak",
      userId: "1",
    },
  });
  res.json(result);
});

app.get("/quests", async (req, res) => {
  const result = await prisma.Questionnaire.findMany({});
  res.json(result);
});

app.get("/post", async (req, res) => {
  const result = await prisma.Task.create({
    data: {
      title: "test",
      description: "test",
      userIds: ["63639f0e5837bf639b59b833", "63639e8a5837bf639b59b832"],
    },
  });
  res.json(result);
});

const start = async () => {
  try {
    app.listen(5000, () => {
      console.log("Server started on 5000 port");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
