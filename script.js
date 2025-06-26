const itemform = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems () {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value; 

    // validation input
    if(newItem === ''){
        alert('please add an item');
        return;
    }
        addItemToDOM(newItem);

        addItemToStorage(newItem);

        checkUI();
    itemInput.value = '';
}
const addItemToDOM = (item) =>{
 //create list item;
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    //add LI to dom
    itemList.appendChild(li);
}




function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon); 
    return button; 
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

const addItemToStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    //add new items to array
    itemsFromStorage.push(item);
    //convert to JSON string and set local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage () {
    let itemsFromStorage; 

    if(localStorage.getItem('items') === null){
        itemsFromStorage = []; 
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

const removeItem = e => {
    if(e.target.parentElement.classList.contains('remove-item')){;
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        }
    }
    checkUI();
} 

const clearItems = () => {
    while (itemList.firstChild){
        if(confirm('Are you sure?')){
        itemList.removeChild(itemList.firstChild);
        }
    }
    checkUI();
}; 

const filterItems = (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text) != -1){
        item.style.display = 'flex';
    }else{
        item.style.display = 'none';
    }})

}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display ='none';
    }else{
        clearButton.style.display = 'block';
        itemFilter.style.display ='block';
    }
}

//Initialize App: 

function init(){
itemform.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems); 
document.addEventListener('DOMContentLoaded', displayItems);
//this needed for when page initiall loads to prevent filter and buttone showing on innitial load
checkUI();
}

init();
