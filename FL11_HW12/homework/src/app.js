const time = 2000;
const idCut = 17;
const rootNode = document.getElementById('root');

let todoItems = JSON.parse(localStorage.getItem('items')) || [];

let suffix = localStorage.getItem('suffix') || 1;

function goToAddPage(){
    suffix++;
    location.hash =`/add${suffix}`;
    addPage();
}

function goToMainPage(){
    location.hash = '';
    mainPage();
}

function cancelWork(){
    location.hash = '';
    suffix--;
    mainPage();
}

function goToModifyPage(suffix){
    location.hash = `/modify/:item_id${suffix}`;
    modifyPage();
}

function saveItems(){
    let saveObj = JSON.stringify(todoItems);
    localStorage.setItem('items', saveObj);
    localStorage.setItem('suffix', suffix);
}

function mainPage(){
    rootNode.innerHTML = '';
    let wrapMain = document.createElement('div');
    wrapMain.classList.add('main-wrap');

    let h1 = document.createElement('h1');
    h1.textContent = 'Simple TODO application';

    let addBtn = document.createElement('button');
    addBtn.textContent = 'Add New task';
    addBtn.id = 'addBtn';

    addBtn.addEventListener('click',goToAddPage); 

    let emptyListText = document.createElement('span');
    emptyListText.textContent = 'TODO is empty';
    emptyListText.classList.add('empty-list')

    wrapMain.appendChild(h1);
    wrapMain.appendChild(addBtn);
    wrapMain.appendChild(emptyListText);

    rootNode.appendChild(wrapMain);

    if(todoItems.length > 0){
        let ul = document.createElement('ul');

        for(let i = 0; i < todoItems.length; i++){
            let li = document.createElement('li');
            
            let progressImg = document.createElement('img');

            if(todoItems[i].isDone){
                li.classList.add('done');
                progressImg.src = '/assets/img/done-s.png';
            } else {
                progressImg.src = '/assets/img/todo-s.png';
            }

            progressImg.addEventListener('click', itemDone);

            li.appendChild(progressImg);

            let textItem = document.createElement('span');
            textItem.classList.add('text-item');
            textItem.textContent = todoItems[i].description;

            textItem.addEventListener('click',editItem);
            
            li.appendChild(textItem);

            let removeImg = document.createElement('img');
            removeImg.src = 'assets/img/remove-s.jpg';

            removeImg.addEventListener('click', removeItem);

            li.appendChild(removeImg);
            ul.appendChild(li);
            
            if(li.previousElementSibling){
                if(li.previousElementSibling.classList.contains('done')){
                    ul.insertBefore(li, li.previousElementSibling);
                }
            }
         }
         wrapMain.appendChild(ul);
        emptyListText.style.display = 'none';
    } else {
        emptyListText.style.display = '';
    }

    function itemDone(){
        let parent = this.parentElement;
        let child = parent.firstElementChild;
        let text = parent.querySelector('.text-item').textContent;
        let item;

          for(let i = 0; i < todoItems.length;i++){
            if(todoItems[i].description === text){
                item = todoItems[i];
                todoItems.splice(i,1);
            }
        }

        todoItems.push(item);
        
        if(parent.classList.contains('done')){
            parent.classList.toggle('done');
            child.src = '/assets/img/todo-s.png';
            item.isDone = false;
        } else {
            parent.classList.toggle('done');
            child.src = '/assets/img/done-s.png';
            item.isDone = true;
            parent.parentElement.appendChild(parent);
        }
        saveItems();
    }

    function removeItem(){
        let parent = this.parentElement;
        let text = parent.querySelector('.text-item').textContent;
        parent.remove();

        for(let i = 0; i < todoItems.length;i++){
            if(todoItems[i].description === text){
                todoItems.splice(i,1);
            }
        }

        saveItems();
    }

    function editItem(){
        let parent = this.parentElement;
        let text = parent.querySelector('.text-item').textContent;

        let item = todoItems.find(function(element) {
            return element.description === text;
          });

        if(parent.classList.contains('done')){
            showAlertError(`You can't edit already done item`);
        } else {
            goToModifyPage(item.id);
        }
    }
}

mainPage();

function addPage(){
    rootNode.innerHTML = '';
    let wrapAdd = document.createElement('div');
    wrapAdd.classList.add('add-wrap');

    let wrapButtons = document.createElement('div');
    wrapButtons.classList.add('buttons-wrap');

    wrapAdd.appendChild(wrapButtons);

    let h1 = document.createElement('h1');
    h1.textContent = 'Add Task';

    let newItemField = document.createElement('input');
    newItemField.id = 'newItem-field';
    newItemField.name = 'newItem';

    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'cancel';
    cancelBtn.id = 'cancelBtn';

    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save changes';
    saveBtn.id = 'saveBtn'
    saveBtn.disabled = true;

    cancelBtn.addEventListener('click', cancelWork);

    wrapButtons.appendChild(cancelBtn);
    wrapButtons.appendChild(saveBtn);
    
    wrapAdd.appendChild(h1);
    wrapAdd.appendChild(newItemField);
    wrapAdd.appendChild(wrapButtons);
    
    rootNode.appendChild(wrapAdd);

    newItemField.addEventListener('input', checkInput);
    
    saveBtn.addEventListener('click',checkItems);
}

function modifyPage(){
    rootNode.innerHTML = '';
    let wrapModify = document.createElement('div');
    wrapModify.classList.add('modify-wrap');

    let wrapButtons = document.createElement('div');
    wrapButtons.classList.add('buttons-wrap');

    let h1 = document.createElement('h1');
    h1.textContent = 'Modify Item';

    let newItemField = document.createElement('input');
    newItemField.id = 'newItem-field';
    newItemField.name = 'newItem';

    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'cancel';
    cancelBtn.id = 'cancelBtn';

    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save changes';
    saveBtn.id = 'saveBtn'
    saveBtn.disabled = true;

    cancelBtn.addEventListener('click', goToMainPage);
    newItemField.addEventListener('input', checkInput);
    saveBtn.addEventListener('click',checkItems);

    wrapButtons.appendChild(cancelBtn);
    wrapButtons.appendChild(saveBtn);

    wrapModify.appendChild(h1);
    wrapModify.appendChild(newItemField);
    wrapModify.appendChild(wrapButtons);

    rootNode.appendChild(wrapModify);
}

function checkInput(){
    let parent = this.parentElement;

    let saveBtn = parent.querySelector('#saveBtn');

    if(this.value){
        saveBtn.disabled = false;
    } else {
        saveBtn.disabled = true;
    }
}

function checkItems(){
    let parent = this.parentElement.parentElement;

    let newItemField = parent.querySelector('#newItem-field');

    let oldElement = todoItems.find(function(element){
        return element.description === newItemField.value;
    });

    if(location.hash.indexOf('modify') > 0){
        if(oldElement){
            showAlertError(`You can't edit already done item`);
        } else {
            let id = +location.hash.substring(idCut);
            let item = todoItems.find(function(element) {
            return element.id === id;
          });
          item.description = newItemField.value;
          saveItems();
          goToMainPage();   
        }
    } else {
        if(oldElement){
            showAlertError(`You can't add already exist item`); 
        } else {
            todoItems.push({isDone: false,
                id: suffix,
                description: newItemField.value});
                saveItems();
                goToMainPage();
            }
    }

}

function showAlertError(msg){
    let errorDiv = document.createElement('div');

    if(navigator.userAgent.indexOf('Chrome') > 0){
        errorDiv.classList.add('error-alert-chrome');
    } else {
        errorDiv.classList.add('error-alert-another');
    }

    let h3 = document.createElement('h3');
    h3.classList.add('error-header');
    h3.textContent = 'Deanger!';

    let p = document.createElement('p');

    p.textContent = msg;
    p.classList.add('error-msg');

    let closeBtn = document.createElement('div');
    closeBtn.classList.add('closeBtn');

    closeBtn.addEventListener('click', closeError);

    let span1 = document.createElement('span');
    span1.classList.add('span-1');

    let span2 = document.createElement('span');
    span2.classList.add('span-2');

    closeBtn.appendChild(span1);
    closeBtn.appendChild(span2);

    errorDiv.appendChild(h3);
    errorDiv.appendChild(p);
    errorDiv.appendChild(closeBtn);

    rootNode.appendChild(errorDiv);

    setTimeout(closeError,time);

    function closeError(){
        errorDiv.remove();
    }
}