require('dotenv').config();
const mongoose = require('mongoose')
// const url = process.env.MONGO_URI;
const url = "mongodb+srv://gil:3aPAKZrNwKxZWBsj@cluster0.gzy7z.mongodb.net/cyber4s?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true }).then(result => {
     console.log('connected to MongoDB')
   })
   .catch((error) => {
     console.log('error connecting to MongoDB:', error.message)
})


const personSchema = new mongoose.Schema({
    name: {type: String, require: true},
    age : Number,
    favoriteFoods : [{type : String}]

})
const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
const gil = new Person({
  name : "gil",
  age : 23,
  favoriteFoods : ["couscous"]
})
gil.save().then(result => {
  console.log("saved!")
  done(null , result);
})
};
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(result => {
  done(null, result);
  })
};
const findPeopleByName = (personName, done) => {
  Person.find({ name : personName}).then(result => {
  done(null, result);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods : food }).then(result => {
  done(null,result);

  })
};

const findPersonById = (personId, done) => {
  Person.findById( { _id : personId }).then(result => {
  done(null,result);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save().then(result => {
    done(null,result);
    })
  })

};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name : personName}, {age : 20}, {new : true}, (err,person)=> {
    if(err) return console.log(err);
  done(null,person)
  })   
}


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,result) => {
    if(err) return console.log(err)
  done(null,result);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = {name :"Mary"};
  Person.remove(nameToRemove, (err,result) => {
    if(err) return console.log(err)
    done(null,result);

  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito"
  Person.find({favoriteFoods : foodToSearch})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err,result) => {
  if(err) return console.log(err)
  done(null, result);
  }) 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
