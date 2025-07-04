const itemform = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemform.querySelector('button');
let isEditMode = false; 

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

        if(isEditMode){
            const itemToEdit = itemList.querySelector('.edit-mode');

            removeItemFromStorage(itemToEdit.textContent); 

            itemToEdit.classList.remove('edit-mode')
            itemToEdit.remove();
            isEditMode = false;

        }else{
            if(checkIfItemExists(newItem)){
                alert('That Item Alread Exists');
                return;
            }
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
    const itemsFromStorage = getItemsFromStorage();
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

const onClickItem = (e) => {
   const listItem = e.target.closest('li')
   if(!listItem)return; 
   if(e.target.closest('.remove-item')){
    removeItem(listItem);
   } else {
    setItemToEdit(listItem);
   }
}

function checkIfItemExists (item){
  const itemsFromStorage = getItemsFromStorage(); 
  return itemsFromStorage.includes(item);
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

const setItemToEdit = item => {
    isEditMode = true; 


    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');

    formBtn.innerHTML = "<i class='fa-solid fa-pen'</i> Update Item";
    itemInput.value = item.textContent;
    formBtn.style.backgroundColor = '#228822';
}

const removeItem = item => {

    if(confirm('are you sure')){
        item.remove();


        //remove from storage: 
        removeItemFromStorage(item.textContent);

        checkUI();
    }

} 

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    //filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
 

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));


}

const clearItems = () => {
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
        
        //clear from local storage

        localStorage.removeItem('items');

        checkUI();
    }
    
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
    itemInput.value =''

    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display ='none';
    }else{
        clearButton.style.display = 'block';
        itemFilter.style.display ='block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'

    isEditMode = false
}

//Initialize App: 

function init(){
itemform.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems); 
document.addEventListener('DOMContentLoaded', displayItems);
//this needed for when page initiall loads to prevent filter and buttone showing on innitial load
checkUI();
}

init();
