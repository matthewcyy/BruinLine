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

    const halls = await page.$$('div.menu-block');

    for await (const hall of halls) {
        const hallName = await hall.$eval('h3.col-header', (header) => header.textContent);
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
    }


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

