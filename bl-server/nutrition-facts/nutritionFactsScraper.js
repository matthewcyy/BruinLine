const { execFileSync } = require('child_process');


execFileSync('./nutrition_fact_scraper_bplate.sh');
execFileSync('./nutrition_fact_scraper_deneve.sh');
execFileSync('./nutrition_fact_scraper_epicuria.sh');
execFileSync('./nutrition_fact_scraper_feast.sh');
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
}


