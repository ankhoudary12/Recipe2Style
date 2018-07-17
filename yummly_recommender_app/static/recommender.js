var recipe;
var cuisine;
var count=0;
var image;
var meaty;
var piquant;
var salty;
var sweet;
var sour;
var yummly_url;
var recipe_url;
var calories;
var protein;
var carbs;
var fat;
var sugar;
var sodium;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}

function recommend(){

recipe=document.getElementById('recipe-input').value
cuisine=document.getElementById('cuisine-input').value

console.log(recipe);
console.log(cuisine);

$.ajax({
  type: "POST",
  contentType: "application/json; charset=utf-8",
  url: "/recommend",
  dataType: "json",
  async: true,
  data: "{\"example\": [\""+recipe+"\",\""+cuisine+"\"]}",
  success: function (data) {
    recipes = data["score"];
    console.log(recipes)
    get_recipe_cards();
  },
  error: function (result) {
  }
})
}






function get_recipe_cards(){

  let count=0
  console.log(count)

  d3.select("#recipe_rows")
  .append('h4')
  .text('Recommended Recipes to \"'+recipe+"\" in the style of \"" +cuisine+"\" cuisine");

    for (let i=0; i<recipes.length; i++) {

    let name = recipes[i].name;
    let image = recipes[i].image;
    let meaty = recipes[i].meaty;
    let piquant = recipes[i].piquant;
    let salty = recipes[i].salty;
    let sweet = recipes[i].sweet;
    let sour = recipes[i].sour;
    let yummly_url = recipes[i].yummly_url;
    let recipe_url = recipes[i].recipe_url;
    let calories = recipes[i].calories;
    let protein = recipes[i].protein;
    let carbs = recipes[i].carbs;
    let fat = recipes[i].fat;
    let sugar = recipes[i].sugar;
    let sodium = recipes[i].sodium;



    make_recipe_card(recipes[i]);






  }


};

function make_recipe_card(recipe){




  d3.select("#recipe_rows")
   .append('div').attr("id","recipe")
   .attr("class","col s12")
   .append('div')
   .attr("class","card")
   .attr("id","recipe_card_"+count)
   .append('img')
   .attr("class","activator")
   .attr("src", recipe.image)
   .style("width","100px")
   .style("height","100px");

   d3.select("#recipe_card_"+count)
   .append('div')
   .attr("class","card-content")
   .attr("id","card-content_"+count)
   .append('span')
   .attr("class","card-title activator grey-text text-darken-4")
   .text(recipe.name)
   .append('p')
   .append('a')
   .attr("href",recipe.yummly_url)
   .text("Yummly Link")
   .append('p')
   .append('a')
   .attr("href",recipe.recipe_url)
   .text('Recipe Link');

   d3.select("#recipe_card_"+count)
   .append('div')
   .attr('class','card-reveal')
   .attr("id","card_reveal_"+count)
   .append('span')
   .attr('class',"card-title grey-text text-darken-4")
   .text(recipe.name);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Sour: "+recipe.sour);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text('Sweet: '+recipe.sweet);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text('Salty: '+recipe.salty);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Piquant: "+recipe.piquant);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text('Meaty: '+recipe.meaty);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Calories: "+recipe.calories);

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Protein: "+recipe.protein+" g");

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Carbs: "+recipe.carbs+" g");

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Fat: "+recipe.fat+" g");

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Sugar: "+recipe.sugar+" g");

   d3.select('#card_reveal_'+count)
   .append('p')
   .text("Sodium: "+recipe.sodium+" g");

  //document.getElementById("recipe_card_"+count).scrollIntoView();






   count++;
   console.log(count);






};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('#cuisine-input');
    var instances = M.Autocomplete.init(elems, {data:{'barbeque': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'british': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'cajun': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'chinese': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'cuban': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'french': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'german': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'greek': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'hawaiian': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'hungarian': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'indian': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'irish': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'italian': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'japanese': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'keto': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'mexican': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'moroccan': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'paleo': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'portuguese': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'southwestern': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'spanish': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'swedish': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'thai': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'vegan': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg',
 'vietnamese': 'https://img.grouponcdn.com/deal/aneUsttzxMyem6Mg3ro5/YX-2048x1229/v1/c700x420.jpg'}


    });
  });
