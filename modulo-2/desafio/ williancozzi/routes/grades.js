import express from "express";
import { promises as fs } from "fs";

global.fileName = "grades.json";

const router = express.Router();
const { readFile, writeFile } = fs;

const readGradesFile = async () => {
  return JSON.parse(await readFile(global.fileName));
};

router.get("/", async (req, res, next) => {
  try {
    const data = await readGradesFile();

    delete data.nextId;

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let grade = req.body;

    const data = await readGradesFile();

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const grade = req.body;

    // valida id
    if (!grade.id) {
      throw new Error("Id is required");
    }

    const data = await readGradesFile();
    const index = data.grades.findIndex((grd) => grd.id === grade.id);

    if (index === -1) {
      throw new Error("Id not found");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await readGradesFile();

    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await readGradesFile();
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    res.send(grade);
  } catch (error) {
    next(error);
  }
});

router.get("/:student/:subject", async (req, res, next) => {
  try {
    const data = await readGradesFile();

    const grade = data.grades.filter(
      (grade) =>
        grade.student === req.params.student &&
        grade.subject === req.params.subject
    );

    const values = grade.map((value) => value.value);

    const sum = values.reduce((acc, cur) => acc + cur);

    res.send(`
    The sum of this student's grades in this subject is ${sum}`);
  } catch (error) {
    next(error);
  }
});

router.get("/average/:subject/:type", async (req, res, next) => {
  try {
    const data = await readGradesFile();

    const grade = data.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );

    const values = grade.map((value) => value.value);

    const sum = values.reduce((acc, cur) => acc + cur);

    const average = sum / values.length;

    res.send(`
    Subject: ${req.params.subject}, 
    type: ${req.params.type}, 
    average grades: ${average.toFixed(2)}`);
  } catch (error) {
    next(error);
  }
});

router.get("/top3/:subject/:type", async (req, res, next) => {
  try {
    const data = await readGradesFile();

    const grade = data.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );

    const top3 = grade
      .map((value) => value.value)
      .sort((a, b) => b - a)
      .slice(0, 3);

    res.send(top3);
  } catch (error) {
    next(error);
  }
});

export default router;
