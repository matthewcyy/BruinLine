const puppeteer = require('puppeteer');

    // Extended Menu URL
const menu_url = 'https://menu.dining.ucla.edu/Menus/Epicuria/Today/';

function imgToNutritionFacts(imgSrc) {
    if(imgSrc === "/Content/Images/WebCodes/128px/v.png") { return "Vegetarian"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/vg.png") { return "Vegan"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/apnt.png") { return "Peanuts"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/atnt.png") { return "Tree Nuts"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/awht.png") { return "Wheat"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/agtn.png") { return "Gluten"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/asoy.png") { return "Soy"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/amlk.png") { return "Dairy"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/aegg.png") { return "Eggs"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/acsf.png") { return "Crustacean Shellfish"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/afsh.png") { return "Fish"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/hal.png") { return "Halal"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/lc.png") { return "Low Carbon Footprint"; }
    else if(imgSrc === "/Content/Images/WebCodes/128px/hc.png") { return "High Carbon Footprint"; }
    else { return "BruinLine"; }
};

(async () => {
        // Launch browser and go to menu URL
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(menu_url);

    const mealJSON = {};

    const meals = await page.$$('div.menu-block');

    for await (const mealPeriod of meals) {
        const mealStations = await mealPeriod.$$('li.sect-item');
        const mealName = await mealPeriod.$eval('h3.col-header', (header) => header.textContent);
        mealJSON[mealName] = {};
        
        for await (const station of mealStations){
            const stationName = await station.evaluate((s) => s.innerText.split(/\n/)[0]);
            
            // const stationItems = await station.$$eval('a.recipelink', (items) => items.map((food) => food.textContent));
            // mealJSON[mealName][stationName] = stationItems;

            const stationItems = await station.$$('span.tooltip-target-wrapper');
            mealJSON[mealName][stationName] = {};

            for await (const item of stationItems) {
                const itemName = await item.$eval('a.recipelink', (foodItem) => foodItem.textContent);
                let nutritionFacts = await item.$$eval('img.webcode-16px', (facts) => facts.map((content) => content.getAttribute('src')));
                nutritionFacts = nutritionFacts.map((fact) => imgToNutritionFacts(fact));
                mealJSON[mealName][stationName][itemName] = nutritionFacts;
            }

        }
    }

    console.log(mealJSON);

    await browser.close();
})();