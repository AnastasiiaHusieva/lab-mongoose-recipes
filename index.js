const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: 'Chicken Curry',
      level: 'UltraPro Chef',
      ingredients: ['chicken', 'onion', 'tomato', 'garlic', 'ginger', 'chicken masala', 'chilli', 'salt'],
      cuisine: 'Indian',
      dishType: 'main_course',
      image: 'image/30-minute-chicken-curry-4376297.jpg',
      duration: 60,
      creator: 'Meena and Anastasiia',
      created: 17082023
    }
    return Recipe.create(newRecipe);
  })
  .then (() => {
    return Recipe.insertMany(data)
  })
  .then(recipes=>{
    console.log('Inserted recipes:')
    recipes.forEach(recipe => {
      console.log(recipe.title)
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese'},
      { duration: 100}
      
    )
  })
  .then(()=> {
    console.log('Updated duration of Rigatoni alla Genovese')
    return Recipe.findOneAndDelete({title: 'Carrot Cake'})
  })
  .then(()=> {
    console.log('Removed Carrot Cake recipe')
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


 

  
