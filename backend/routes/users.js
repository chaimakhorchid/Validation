const express = require("express")
const app = express()
const { body, validationResult } = require ("express-validator")
const res = require("express/lib/response")

let users = require("../users.json")

//recupere tout les utilisateurs
app.get("/", (req,res) => {
    res.json(users)
})

//recupere tun seul utilisateurs
app.get("/:slug", (req, res) => {
    const { slug } =req.params
    console.log(slug);
    console.log(users);
    const user = users.find(user => user.slug === slug)
    console.log(user);

    res.json(user)
})

//Créer un utilisateurs
app.post("/",
    
body('name')
.isLength({ min: 4}).withMessage("name is too short"),

body('password')
.isLength({ min:8 }).withMessage("password is too short"),

body('city')
.isIn(["paris", "tokyo", "los angeles"]).withMessage("value is not accepted"),

(req, res) => {

    const { errors } = validationResult(req)
    console.log(errors)
    
    if (errors.length > 0) {
      res.status(400).json({ errors })
    } else {
      const user = req.body
      users = [ ...users, user ]
      res.json(user)
    }
})


module.exports = app