import {menuArray} from "./data.js";

// Set variables
const itemDiv = document.querySelector('.foodOption');
const cardDetails = document.getElementById('formPopup');
let totalPrice = 0;
let price = 0;



// Render food items
function renderFoodItems(){
    menuArray.forEach(function(foodItem){
        itemDiv.innerHTML += `
        <div class="item">
                <img src="${foodItem.pic}" alt="${foodItem.alt}">
                
                <div class="item-Details">
                    <h3>${foodItem.name}</h3>
                    <p>${foodItem.ingredients}</p>
                    <p>$${foodItem.price}</p>
                </div>
                
                <button type="button" data-item="${foodItem.id}">+</button>
            </div>
        `
    });
}
renderFoodItems();

document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        addFoodItem(e.target.dataset.item);
    }
    else if(e.target.dataset.itemremove){
        removeFoodItem(e.target.dataset.itemremove);
    }
    if (e.target.dataset.completebtn){
        showPopUp();
    }
})

cardDetails.addEventListener('submit', function(e){
    e.preventDefault();

    const cardFormData = new FormData(cardDetails);
    const fullName = cardFormData.get('fullName');

    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.orderFinal').style.display = 'none';


    document.querySelector('.orderComplete').style.display = 'flex';

    document.querySelector('.orderComplete').innerHTML = `
    <p>Thanks, ${fullName}! Your order is on its way!</p>`
})

function showPopUp(){
    document.querySelector('.popup').style.display = 'initial';
}
function renderSelectedItems(){
    let counter = 0;
    let tempStr = '';
    menuArray.forEach(function(addedItem){

        if (addedItem.isSelected){
            tempStr +=  `
            <div class="orderItem">
                <p>${addedItem.name}</p>
                <button type="button" data-itemremove="${addedItem.id}"}>remove</button>
                <p>$${addedItem.price}</p>
            </div>`
        } else {
            counter++;
            console.log(counter);
        } 

        if(counter == 3){
            document.querySelector('.orderFinal').style.display = 'none';
        }
    })
    // console.log(tempStr)
    document.querySelector('.orderItems').innerHTML = tempStr;
    document.getElementById('totalPrice').innerText = `$${price}`;
}

function addFoodItem(foodId){

    // Rendering food items selected here
    const targetFoodObj = menuArray.filter(function(item){
        return item.id == foodId;
    })[0];
   
    if (!targetFoodObj.isSelected){
        //updating order list
        targetFoodObj.isSelected = true;


        // updating order total price area 


        //turning boolean true to know we've added it now.
        
        price += targetFoodObj.price;
        renderSelectedItems();
    }
    
    // rendering order total here

    document.querySelector('.orderFinal').style.display = 'initial';
}   

function removeFoodItem(foodId){
    const targetFoodObj = menuArray.filter(function(item){
        return item.id == foodId;
    })[0];


    targetFoodObj.isSelected = false;


    price -= targetFoodObj.price;
    renderSelectedItems();

    
}