//import fetch from 'node-fetch';
(async () => {
    const response = await fetch('https://menu.dining.ucla.edu/Menus/DeNeve');
    const text = await response.text();
    console.log(text.match(/?(<a class=\"recipelink\" href=').*(>)/));
  })()