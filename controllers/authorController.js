const authorModel = require("../models/authorModel.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
let emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const createAuthor = async function (req, res) {

  try {
    const data = req.body;
    if (!data.title) {
      return res
        .status(400)
        .send({ status: false, msg: "title is required field" });
    }
    if (!data.fname) {
      return res.status(400).send({ status: false, msg: "fname is required" });
    }
    if (!data.lname) {
      return res.status(400).send({ status: false, msg: "lname is required" });
    }

    if (!data.email) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }
    if (!emailRegex.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter  a valid email" });
    }

    const duplicateEmail = await authorModel.findOne({ email: data.email });

    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "email already exists" });
    }

    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }

    if (!(data.password.length > 8 && data.password.length < 15)) {
      return res.status(400).send({
        status: false,
        msg: "password length should be between 8 to 16 characters",
      });
    }

    const createAuthor = await authorModel.create(data);
    res.status(201).send({
      status: true,
      message: "User created successfully",
      data: createAuthor,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};





const login = async function (req, res) {
  try {
    const data = req.body;
    if (!data.email) {
      return res
        .status(400)
        .send({ status: false, msg: "email is required field" });
    }
    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required field" });
    }
    const userMatch = await registerModel.findOne({
      email: data.email,
      password: data.password,
    });
    if (!userMatch) {
      return res
        .status(400)
        .send({ status: false, msg: "email or password is incorrect" });
    }
    const token = jwt.sign({ userId: userMatch._id }, "lata12", {
      expiresIn: "70h",
    });
    return res
      .status(200)
      .send({ status: true, msg: "you are successfully logged in", token });
  } catch (error) {
    res.status(500).send({ status: false, error: error.msg });
  }
};

module.exports.login = login;
module.exports.createAuthor = createAuthor;
