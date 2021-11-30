const axios = require("axios");
const puppeteer = require('puppeteer');

    // Extended Menu URL
const menu_url = 'https://menu.dining.ucla.edu/Menus/';


(async () => {
        // Launch browser and go to menu URL
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(menu_url);

    const mealJSON = {};

    // const mainContent = await page.$('#main-content');

    // const all = await page.$$('h2 ~ *');
    // for await (const element of all) {
    //     const tagName = await element.evaluate((s) => s.tagName);
    //     console.log(tagName);
    // }



    const halls = await page.$$('div.menu-block');

    for await (const hall of halls) {
        const hallName = await hall.$eval('h3.col-header', (header) => header.textContent);
        console.log(hallName);
        if(hallName in mealJSON) {
            continue;
        }
        mealJSON[hallName] = {};

        const hallItems = await hall.$$eval('a.recipelink', (items) => items.map((food) => food.textContent));
        mealJSON[hallName] = hallItems;

        const diningHallNameToKey = {
            "Bruin Plate": "bPlate",
            "De Neve": "DeNeve",
            "Epicuria": "Epicuria",
            "Feast": "Feast",
        };
        const reqBody = {};
        reqBody.diningHall = diningHallNameToKey[hallName];
        reqBody.menuItems = hallItems;
        const updateMenuResponse = await axios.patch(
            "http://localhost:5000/menus/updateMenu",
            reqBody
        );
        
        // const req2 = {};
        // req2.diningHall = "Epicuria";
        // const getMenuResponse = await axios.get("http://localhost:5000/menus/getMenu", req2)
        // .catch((e) => console.log(e));
        // console.log(getMenuResponse.data.entry["Epicuria"]);
        // console.log(updateMenuResponse);
        // for await (const station of mealStations){
        //     const stationName = await station.evaluate((s) => s.innerText.split(/\n/)[0]);
            
        //     const stationItems = await station.$$eval('a.recipelink', (items) => items.map((food) => food.textContent));
        //     mealJSON[hallName][stationName] = stationItems;

        //     const stationItems = await station.$$('span.tooltip-target-wrapper');
        //     mealJSON[hallName][stationName] = {};

        //     for await (const item of stationItems) {
        //         const itemName = await item.$eval('a.recipelink', (foodItem) => foodItem.textContent);
        //         let nutritionFacts = await item.$$eval('img.webcode-16px', (facts) => facts.map((content) => content.getAttribute('src')));
        //         nutritionFacts = nutritionFacts.map((fact) => imgToNutritionFacts(fact));
        //         mealJSON[hallName][stationName][itemName] = nutritionFacts;
        //     }

        // }
    }

    // console.log(mealJSON);

    const feast_url = 'https://menu.dining.ucla.edu/Menus/FeastAtRieber';
    const feastPage = await browser.newPage();
    await feastPage.goto(feast_url);

    mealJSON["Feast"] = {}

    const feastItemNames = await feastPage.$$eval('a.recipelink', (items) => items.map((food) => food.textContent));
    const feastMenu = feastItemNames.slice(0, 2);

    const reqBody = {};
    reqBody.diningHall = "Feast";
    reqBody.menuItems = feastMenu;
    const updateMenuResponse = await axios.patch(
        "http://localhost:5000/menus/updateMenu",
        reqBody
    );

    await browser.close();
})();

