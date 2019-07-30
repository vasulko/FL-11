const maxAmoutItem = 10;

let error = document.getElementById('error-msg');
let action = document.getElementById('action');
let addBtn = document.getElementById('add-btn');
let editBtn = document.querySelector('.edit-btn');
let deleteBtn = document.querySelector('.delete-btn');
let actionList = document.getElementById('action-list');
let checkboxBtn = document.querySelector('.checkbox-btn');
let saveBtn = document.querySelector('.save-btn');
let parentItem;

addBtn.disabled = true;
saveBtn.disabled = true;

action.addEventListener('input',checkInput);
addBtn.addEventListener('click',addNewAction);
deleteBtn.addEventListener('click',deleteItem);
editBtn.addEventListener('click', editItem);
checkboxBtn.addEventListener('click',checkedBtn);

let listItems = document.querySelectorAll('.list-item');

// Array.prototype.forEach.call(listItems, function(list){
//     list.addEventListener('dragstart',handleDragStart,false);
//     list.addEventListener('dragenter', handleDragEnter, false);
//     list.addEventListener('dragover', handleDragOver, false);
//     list.addEventListener('dragleave', handleDragLeave, false);
//     list.addEventListener('drop', handleDrop, false);
//     list.addEventListener('dragend', handleDragEnd, false);
// })

function checkInput(){
    if(this.value && actionList.children.length < maxAmoutItem){
        addBtn.disabled = false;
        addBtn.firstElementChild.style.color = '#3ab2fe';
    } else {
        addBtn.disabled = true;
        addBtn.firstElementChild.style.color = '';
    }
}

function createNewAction(){
    if(!actionList){
        actionList = document.createElement('ul');
        actionList.id = 'action-list';
        document.querySelector('.wrap-list').appendChild(actionList);
    }

    let listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.setAttribute('draggable','true');

    let wrapItem = document.createElement('div');
    wrapItem.classList.add('wrap-item');
    
    let descriptionAction = document.createElement('div');
    descriptionAction.classList.add('description-action');
    
    let checkboxBtn = document.createElement('button');
    checkboxBtn.classList.add('checkbox-btn');
    checkboxBtn.innerHTML = '<i class="material-icons">check_box_outline_blank <i class="material-icons">done</i></i>';
    
    let textAction = document.createElement('label');
    textAction.classList.add('text-action');
    textAction.textContent = action.value;

    let editWrap = document.createElement('div');
    editWrap.classList.add('edit-wrap');

    let editBtn = checkboxBtn.cloneNode(false);
    editBtn.className = '';
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="material-icons">edit</i>';

    let newName = document.createElement('input');
    newName.setAttribute('type','text');
    newName.setAttribute('name','new-name');
    newName.setAttribute('placeholder','Write new name action');
    newName.setAttribute('class','newName');

    let saveBtn = checkboxBtn.cloneNode(false);
    saveBtn.className = '';
    saveBtn.classList.add('save-btn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="material-icons">save</i>';

    let deleteBtn = checkboxBtn.cloneNode(false);
    deleteBtn.className = '';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="material-icons">delete</i>';

    descriptionAction.appendChild(checkboxBtn);
    descriptionAction.appendChild(textAction);
    descriptionAction.appendChild(editBtn);
    
    listItem.appendChild(wrapItem);
    wrapItem.appendChild(descriptionAction);
    wrapItem.appendChild(deleteBtn);

    editWrap.appendChild(newName);
    editWrap.appendChild(saveBtn);

    listItem.appendChild(editWrap);

    actionList.appendChild(listItem);

    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click', editItem);
    checkboxBtn.addEventListener('click', checkedBtn);

    // listItem.addEventListener('dragstart',handleDragStart,false);
    // listItem.addEventListener('dragenter', handleDragEnter, false);
    // listItem.addEventListener('dragover', handleDragOver, false);
    // listItem.addEventListener('dragleave', handleDragLeave, false);
    // listItem.addEventListener('drop', handleDrop, false);
    // listItem.addEventListener('dragend', handleDragEnd, false);
}

function addNewAction(){
    if(actionList.children.length < maxAmoutItem){
        createNewAction();
    }

    if(actionList.children.length === maxAmoutItem) {
        error.style.display = 'block';
        addBtn.disabled = true;
        addBtn.firstElementChild.style.color = '';
    }
}

function deleteItem(){
    let parent = searchParent(event.target);
    parent.remove();
    if(actionList.children.length < maxAmoutItem){
        error.style.display = '';
        if(!action.value){
            addBtn.disabled = true;
            addBtn.firstElementChild.style.color = '';
        } else {
            addBtn.disabled = false;
            addBtn.firstElementChild.style.color = '#3ab2fe';
        }
    }
}

function editItem(){
    parentItem = searchParent(event.target);

    let editWrap = parentItem.querySelector('.edit-wrap');
    
    editWrap.style.display = 'flex';
    
    let saveBtn = parentItem.querySelector('.save-btn');
    let newName = parentItem.querySelector('.newName');

    newName.addEventListener('input', checkNewName);
    saveBtn.addEventListener('click', saveEdit);
}

function checkNewName(){
    let saveBtn = parentItem.querySelector('.save-btn');

    if(this.value){
        saveBtn.disabled = false;
        saveBtn.firstElementChild.style.color = '#3ab2fe';
    } else {
        saveBtn.disabled = true;
        saveBtn.firstElementChild.style.color = '';
    }
}

function saveEdit(){
    let textAction = parentItem.querySelector('.text-action');
    let newName = parentItem.querySelector('.newName');

    let editWrap = parentItem.querySelector('.edit-wrap');

    textAction.textContent = newName.value;
    editWrap.style.display = '';
}

function searchParent(item){
    let found = true;
    do{
        item = item.parentElement;
        if(item.className === 'list-item'){
            return item; 
        }
    }while(found)
}

function checkedBtn(){
    let parent = searchParent(this);

    let editBtn = parent.querySelector('.edit-btn');
    editBtn.disabled = true;
    editBtn.firstElementChild.style.color = 'grey';

    let checkboxBtn = parent.querySelector('.checkbox-btn');

    checkboxBtn.classList.add('checked');
    checkboxBtn.querySelector('i > i').style.display = 'block';
}

// let dragSrcEl = null;

// function handleDragStart(e){
//     dragSrcEl = this;

//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragOver(e) {
//     if (e.preventDefault) {
//       e.preventDefault();
//     }
  
//     e.dataTransfer.dropEffect = 'move';
  
//     return false;
//   }

//   function handleDragEnter() {
//     this.classList.add('over');
//   }

//   function handleDragLeave() {
//     this.classList.remove('over');
//   }

//   function handleDrop(e) {

//   if (e.stopPropagation) {
//     e.stopPropagation(); 
//   }

//   if (dragSrcEl !== this) {
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData('text/html');
//   }

//   return false;
//   }

//   function handleDragEnd() {
//       this.classList.remove('over');
//   }