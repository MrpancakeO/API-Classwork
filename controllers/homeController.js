"use strict";

var courses = [
    {
        title: "Raspberry Cake",
        cost: 50
    },
    {
        title: "Apple Pie",
        cost: 80
    },
    {
        title: "Pizza Pizza",
        cost: 100
    }
]

module.exports = {
    index: (req, res) => {
        res.render("index");
    },
    contact: (req, res) => {
        res.render("contact")
    }
}