
let serchbtn=document.getElementById('btn-submit');
let customImage=document.getElementById("current-image-container")
let historyDates=document.getElementById("previousSearch")

let searches = [];
let count =0;

serchbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    let input=document.getElementById("search-input").value;
    console.log(input)
    let new_date=new Date(input);
    console.log(new_date)
    new_date=new_date.toISOString().split('T', 1)[0]
    console.log(new_date)
    fetchDate(new_date)

    saveSearch(input)
    


   
   
   
    
})
 

function saveSearch(date) {
    // Retrieve the existing searches from local storage, add the new date, and save it back
    if( searches.indexOf(date) === -1 ){
    searches.push(date);
    let string = JSON.stringify(searches);
    localStorage.setItem("searches",string);
    addSearchToHistory(date);
    }
    
   
    
}


async function fetchDate(date){
       let apiKey='3epiH36LeaM8H7du3WnAHNa01KuBbfTwnUD8Amxs'
        
         
        let url=`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`

    try{
        let response=await fetch(url,{method:"GET"});
        let result=await response.json();
        console.log(result)
        customImageOftheDay(result)

    }
    catch(e){
        console.log(e.message)
    }
   
}

function customImageOftheDay(data){
    customImage.innerHTML=``;
    customImage.innerHTML=`  <img src=${data.hdurl} alt="galaxy">

    <h1 id="heading">${data.title}</h1>
    <p id="information">${data.explanation}
    </p>`


}
function addSearchToHistory(date) {
    // Retrieve the searches from local storage, create a new list item, and append it to #search-history
    // Add an event listener to the list item to fetch and display the image when clicked
    console.log(searches,date);
    console.log(searches.indexOf(date));

    
 
    
    let li = document.createElement('li');
    let a = document.createElement('a');
    
   

    let button = document.createElement('button');
    a.innerHTML=button;

    button.onclick = ()=>fetchDate(date);
    button.innerText=date;
    li.appendChild(button);
    let ul = document.getElementById('search-history');
    
    ul.appendChild(li);
 
    
}



