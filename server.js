// const express = require("express")
// const app = express()
// const dotenv= require('dotenv').config()
// const mongoose=require("mongoose")
// app.use("/api",require("./routes/personRoutes"))
// app.use(express.json())


// mongoose.connect(process.env.MONGO_URI).then(()=>console.log("database connected")).catch((err)=>console.log(err))

// const port = process.env.port || 8081
// app.listen(port,()=> console.log("my server is running in port:",port))


// create a personSchema
require('dotenv').config();
const mongoose = require("mongoose") //Installing and setting up Mongoose

// Connect to the database
mongoose.connect((process.env.MONGO_URI), { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("database connected")).catch((err) => console.log(err))


// Create a person with the prototype
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

// Create and Save a Record of a Model
const Person = mongoose.model('Person', personSchema); 

const person = new Person({
  name: 'sami',
  age: 26,
  favoriteFoods: ['Pizza', 'Burger'],
});

function PersonCreate(person) {
  person.save()
    .then(data => { console.log('Person saved:', data); })
    .catch(err => { console.error(err); });
}
PersonCreate(person);

  //Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'farah', age: 21, favoriteFoods: ['soushi', 'mlawi'] },
  { name: 'mohamed', age: 24, favoriteFoods: ['kosksi', 'brik'] },
  { name: 'laila', age: 28, favoriteFoods: ['kataloni', 'soupe'] }
];

function createPeople(arrayOfPeople) {
  Person.create(arrayOfPeople)
    .then(data => {
      console.log('People created:', data);
    })
    .catch(err => {
      console.error(err);
    });
}
createPeople(arrayOfPeople);


// Use model.find() to Search Your Database
function findPeopleByName(name) {
  Person.find({ name: name })
    .then(data => {
      console.log(`People with name "${name}":`, data);
    })
    .catch(error => {
      console.error(error);
    });
}
findPeopleByName("farah");


//Use model.findOne() to Return a Single Matching Document
function findPersonByFavoriteFood(food) {
  Person.findOne({ favoriteFoods: food })
    .then(data => {
      console.log(`Person with ${food} in favorite foods:`, data);
    })
    .catch(error => {
      console.error(error);
    });
}
findPersonByFavoriteFood("kataloni");


// Use model.findById() to Search Your Database By _id
function findPersonById(personId) {
  Person.findById(personId)
    .then(data => {
      console.log('Person with id', personId, ':', data);
    })
    .catch(err => {
      console.error(err);
    });
}
findPersonById("659eafd80eef7f43225d89d5");


// Perform Classic Updates by Running Find, Edit, then Save
function updatePersonFavoriteFoods(personId) {
  Person.findById(personId)
    .then(personToUpdate => {
      if (!personToUpdate) {
        console.log(`Person with id ${personId} not found.`);
        return;
      }
      // Add "burger" to the list of favoriteFoods
      personToUpdate.favoriteFoods.push('burger');

      // Mark the array as modified since it's of type Mixed
      personToUpdate.markModified('favoriteFoods');

      // Save the updated Person
      return personToUpdate.save();
    })
    .then(updatedPerson => {
      if (updatedPerson) {
        console.log('Updated Person:', updatedPerson);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
updatePersonFavoriteFoods("659eafd80eef7f43225d89d5"); 


//Perform New Updates on a Document Using model.findOneAndUpdate()
function updatePersonByName(personName, newAge) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: newAge },
    { new: true }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        console.log('Updated Person:', updatedPerson);
      } else {
        console.log(`Person with name ${personName} not found.`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
updatePersonByName("mohamed", "30");


// Delete One Document Using model.findByIdAndDelete
function deletePersonById(personId) {
  Person.findByIdAndDelete(personId)
    .then(deletedPerson => {
      if (deletedPerson) {
        console.log('Deleted Person:', deletedPerson);
      } else {
        console.log(`Person with id ${personId} not found.`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
deletePersonById("659eaf80184306b9aaa54c82"); 


// Delete Multiple Documents with model.deleteMany()
function deletePeopleByName(personName) {
  Person.deleteMany({ name: personName })
    .then(result => {
      console.log('Deleted People:', result);
    })
    .catch(err => {
      console.error(err);
    });
}
deletePeopleByName("laila");


//Chain Search Query Helpers to Narrow Search Results
function findPeopleWhoLikeBurritos() {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then(data => {
      console.log('People who like burritos:', data);
    })
    .catch(err => {
      console.error(err);
    });
}
findPeopleWhoLikeBurritos();




