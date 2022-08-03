import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios'
var shortid = require('shortid');

const API_URL = 'http://localhost:5000/addresses'

function App() {

  const firstNameInputField = useRef(null);
  const lastNameInputField = useRef(null);
  const emailInputField = useRef(null);
  const phoneNumberInputField = useRef(null);
  const imageInputField = useRef(null);
  const IDInputField = useRef(null);
  const [addresses, setAddresses] = useState([])
  const [firstNameField, setFirstNameField] = useState('')

  //Start by fetching all existing addresses
  useEffect(() =>
  {
    fetchAddressesAxios()
  }
  , [])

  //GET all addresses from our server using Axios
  function fetchAddressesAxios()
  {
    axios.get(API_URL).then(res => {
      console.log(res.data)
      setAddresses(res.data)
      //return res.data
    })
  }

  /*
  //GET all addresses from our server 
  async function fetchAddresses()
  {
    let response = await fetch(API_URL)
    setAddresses(await response.text())    
  }
*/

  //Renders all existing addresses from our database
  function renderAllAddress(allAddresses)
  {
    const addresses = []
    for (let i = 0; i < allAddresses.length; i++)
    {
      addresses.push(<div key = {shortid.generate()}>ID: {allAddresses[i]._id}</div>)
      addresses.push(<div key = {shortid.generate()}>First Name: {allAddresses[i].firstName}</div>)
      addresses.push(<div key = {shortid.generate()}>Last Name: {allAddresses[i].lastName}</div>)
      addresses.push(<div key = {shortid.generate()}>Email Address: {allAddresses[i].email}</div>)
      addresses.push(<div key = {shortid.generate()}>Phone Number: {allAddresses[i].phoneNumber}</div>)
      addresses.push(<br key = {shortid.generate()}></br>)
    }
    return addresses
  }

  //Handler function for adding a new Address
  async function handleAdd()
  {
  

    const newAddress = {
      "firstName": firstNameInputField.current.value,
      "lastName": lastNameInputField.current.value,
      "email": emailInputField.current.value,
      "phoneNumber": phoneNumberInputField.current.value,
      "image": imageInputField.current.value,
    }
    console.log(newAddress)
    //addresses.push(newAddress)
    await axios.post(API_URL, newAddress)
    const newAddresses = [...addresses]
    newAddresses.push(newAddress)
    setAddresses(newAddresses)
  }

  //Handler function for deleting a new Address
  async function handleDeleteByID()
  {
    const newAddresses = [...addresses]
    const result = newAddresses.filter(c => (c._id != IDInputField.current.value))
    console.log(result)
    await axios.delete(`${API_URL}/${IDInputField.current.value}`)
    setAddresses(result)
  }

  //Handler function for deleting a new Address by Names
  async function handleDeleteByFirstAndLastName()
  {
    const firstLast = `${firstNameInputField.current.value}/${lastNameInputField.current.value}`
    const query = `${API_URL}/${firstLast}`
    console.log(query)
    const newAddresses = [...addresses]
    const result = newAddresses.filter(c => (c.firstName != firstNameInputField.current.value) && (c.lastName != lastNameInputField))
    console.log(result)
    await axios.delete(`${API_URL}/${firstLast}`)
    setAddresses(result)
  }

  //Handler function for updating (patching) a new Address
  async function handleUpdate()
  {
    
    const newAddress = {
      "_id": IDInputField.current.value,
      "firstName": firstNameInputField.current.value,
      "lastName": lastNameInputField.current.value,
      "email": emailInputField.current.value,
      "phoneNumber": phoneNumberInputField.current.value,
      "image": imageInputField.current.value,
    }
    const newAddresses = [...addresses]
    const result = newAddresses.filter(c => (c._id != IDInputField.current.value))
    console.log(result)
    result.push(newAddress)
    await axios.patch(`${API_URL}/${IDInputField.current.value}`, newAddress)
    setAddresses(result)
  }

  function handleFirstNameChange()
  {
  }

  //Main HTML
  return (
    <>
      <h1>All Addresses</h1>
      <div> {renderAllAddress(addresses)} </div>
      <p>ID</p>
      <input type="text" key = {shortid.generate()} id="message" name="message" onChange={handleFirstNameChange} ref = {IDInputField}></input>
      <p>First Name</p>
      <input type="text" key = {shortid.generate()} id="message" name="message" onChange={handleFirstNameChange} ref = {firstNameInputField}></input>
      <p>Last Name</p>
      <input type="text" id="message" key = {shortid.generate()} name="message" onChange={handleFirstNameChange} ref = {lastNameInputField}></input>
      <p>Email</p>
      <input type="text" id="message" key = {shortid.generate()} name="message" onChange={handleFirstNameChange} ref = {emailInputField}></input>
      <p>Phone Number</p>
      <input type="text" id="message" key = {shortid.generate()} name="message" onChange={handleFirstNameChange} ref = {phoneNumberInputField}></input>
      <p>Image</p>
      <input type="text" id="message" key = {shortid.generate()} name="message" onChange={handleFirstNameChange} ref = {imageInputField}></input>
      <br></br>
      <br></br>
      <button key = {shortid.generate()} onClick = {handleAdd}>Add Address</button>
      <button key = {shortid.generate()} onClick = {handleDeleteByID}>Delete Address</button>
      <button key = {shortid.generate()} onClick = {handleUpdate}>Update Address</button>
    </>
  )
}

export default App;