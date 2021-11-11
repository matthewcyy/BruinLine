const puppeteer = require('puppeteer');

    // Extended Menu URL
const menu_url = 'https://menu.dining.ucla.edu/Menus/Epicuria/Today/';


(async () => {
        // Launch browser and go to menu URL
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(menu_url);

    const mealJSON = {};

        // Get the 
    const meals = await page.$$('div.menu-block');

    for await (const mealPeriod of meals) {
        const mealStations = await mealPeriod.$$('li.sect-item');
        const mealName = await mealPeriod.$eval('h3.col-header', (header) => header.textContent);
        mealJSON[mealName] = {};
        
        for await (const station of mealStations){
            const stationName = await station.evaluate((s) => s.innerText.split(/\n/)[0]);
            const stationItems = await station.$$eval('a.recipelink', (items) => items.map((food) => food.textContent));
            mealJSON[mealName][stationName] = stationItems;
        }
    }

    console.log(mealJSON);

    await browser.close();
})();