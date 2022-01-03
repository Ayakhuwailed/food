const searchBtn=document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn=document.getElementById('recipe-close-btn');
let mealD=document.querySelector(".meal-details")

//EVENT 
searchBtn.addEventListener('click',()=>{
    let searchInputTxt=document.getElementById('search-input').value.trim()
    getMealList(searchInputTxt).then(getRender).catch(console.log)

});

recipeCloseBtn.addEventListener('click',()=>{
    mealD.classList.remove("showRecipe")
});

async function getFoodRecipe(id){
    let url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    let resp=await fetch(url)
    let res=await resp.json()
console.log(res);

return res;
}

async function getMealList(searchInputTxt){
let url=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
let response= await fetch(url)
let result=await response.json()
console.log(result);
return result;
}

function getRecipe(res){
res.meals.forEach(res=>{

    document.querySelector(".container-meal").innerHTML=`
    <div class = "meal-details-content">
    <h2 class = "recipe-title">${res.strMeal}</h2>
    <p class = "recipe-category">${res.strCategory}</p>
    <div class = "recipe-instruct">
     <h3>Instructions:</h3>
     <p>${res.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
     <img src = ${res.strMealThumb} alt = "">
    </div>
    <div class = "recipe-link">
     <a href = ${res.strYoutube} target = "_blank">Watch Video</a>
    </div> 
    </div>`
})
const recipeCloseBtn=document.getElementById('recipe-close-btn');


mealD.classList.add("showRecipe")

}
function getRecipeHandel(id){
    getFoodRecipe(id).then(getRecipe).catch(console.log)
}

function getRender(result){
let html=""
if(result.meals&&result.meals!=""){
    result.meals.forEach(res=>{
        html+=`
            <div class="meal-item" data-id=${res.idMeal}>
                <div class="meal-img">
                    <img src='${res.strMealThumb}' alt="food">
                </div>
                <div class="meal-name">
                    <h3>'${res.strMeal}'</h3>
                 <a onclick="getRecipeHandel(${res.idMeal})" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `
        })
        mealList.classList.remove('notFound');

    }

        else{
            html="Sorry , we didn`t find any meal "
            mealList.classList.add('notFound');

        }
        mealList.innerHTML=html
}