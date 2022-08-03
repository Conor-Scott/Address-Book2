const express = require('express')
const router = express.Router()
const Address = require('../models/address') 

//Get all addresses
router.get("/", async (req, res) => {
    try {
        const addresses = await Address.find()
        res.json(addresses)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get one address
router.get("/:id", async (req, res) => {
    let address
    try {
        address = await Address.findById(req.params.id)
        if (address == null) {
            res.status(404).json({message: 'Cannot find address.'})
        }
        else {
            res.send(address)
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Create one new address
router.post("/", async (req, res) => {
    const address = new Address({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image
    })

    try {
        const newAddress = address.save()
        res.status(201).json(newAddress)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Update an address based on First Name and Last Name
router.patch("/:firstName/:lastName", async (req, res) => {
    let address
    try {
        let firstLast = {"firstName": req.params.firstName, "lastName": req.params.lastName}
        address = await Address.findOne(firstLast)
        if (address == null) {
            res.status(404).json({message: 'Cannot find address.'})
        }
        else {
            //Patch response here
            if (req.body.firstName != null)
            {
                address.firstName = req.body.firstName
            }
            if (req.body.lastName != null)
            {
                address.lastName = req.body.lastName
            }
            if (req.body.email != null)
            {
                address.email = req.body.email
            }
            if (req.body.phoneNumber != null)
            {
                address.phoneNumber = req.body.phoneNumber
            }
            if (req.body.image != null)
            {
                address.image = req.body.image
            }
            address.save()
            res.status(200).json({message: "Patched address succesfully!"})
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Update an address
router.patch("/:id", async (req, res) => {
    let address
    try {
        address = await Address.findById(req.params.id)
        if (address == null) {
            res.status(404).json({message: 'Cannot find address.'})
        }
        else {
            //Patch response here
            if (req.body.firstName != null)
            {
                address.firstName = req.body.firstName
            }
            if (req.body.lastName != null)
            {
                address.lastName = req.body.lastName
            }
            if (req.body.email != null)
            {
                address.email = req.body.email
            }
            if (req.body.phoneNumber != null)
            {
                address.phoneNumber = req.body.phoneNumber
            }
            if (req.body.image != null)
            {
                address.image = req.body.image
            }
            address.save()
            res.status(200).json({message: "Patched address succesfully!"})
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Delete an address by first name and last name
router.delete("/:firstName/:lastName", async (req, res) => {
    let address
    try {
        let firstLast = {"firstName": req.params.firstName, "lastName": req.params.lastName}
        address = await Address.findOne(firstLast)
        if (address == null) {
            res.status(404).json({message: 'Cannot find address.'})
        }
        else {
            await address.remove()
            res.status(200).json({message: "Removed user"})
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Delete an address by ID
router.delete("/:id", async (req, res) => {
    let address
    try {
        address = await Address.findById(req.params.id)
        if (address == null) {
            res.status(404).json({message: 'Cannot find address.'})
        }
        else {
            await address.remove()
            res.status(200).json({message: "Removed user"})
        }
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router