const { execFileSync } = require('child_process');
const axios = require ('axios');
import schedule from 'node-schedule'
console.log("it's starting")
schedule.scheduleJob('42 13 * * *', () => {
 execFileSync('./nutrition_fact_scraper_bplate.sh');
 execFileSync('./nutrition_fact_scraper_deneve.sh');
 execFileSync('./nutrition_fact_scraper_epicuria.sh');
 execFileSync('./nutrition_fact_scraper_feast.sh');
 console.log("it's done")
//console.log("hello");
var jsonFileName = ['bplate_nutrient.json', 'deneve_nutrient.json','epicuria_nutrient.json', 'feast_nutrient.json']
//var foodData[4]
//var food [4]
//var jsonFileName = './feast_nutrient.json'
for (let i =0; i<4; i++){
    const fs = require('fs');
    let foodData=fs.readFileSync(jsonFileName[i]);
    let foods = JSON.parse(foodData);
    console.log("hello")
    console.log(foods[1]);
    foods.map(insertFood)
}

})
async function insertFood(food){
    //console.log(food);
    const addFoodItem = await axios.post("http://localhost:5000/foods/addFood", food);
}