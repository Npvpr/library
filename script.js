let library = [];

function Book(title, author, pages, read){
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const mainGrid = document.querySelector('.mainGrid');
const addBookBtn = document.querySelector('.addBookBtn');
const popupCover = document.querySelector('.popupCover');
const popup = document.querySelector('.popup');

addBookBtn.addEventListener('click', () => {
    openPopup();
});

popupCover.addEventListener('click', (e) => {
    if(e.target !== popup && !popup.contains(e.target)){
        closePopup();
    }
});

function openPopup(){
    popupCover.classList.add('active');
}

function closePopup(){
    popupCover.classList.remove('active');
    // to remove prefills and autofills of the form inputs
    popup.reset();
}

popup.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    const book = new Book(title, author, pages, read);
    if(checkBook(title)){
        alert("This book is already in your library!");
        return;
    }
    library.push(book);
    closePopup();
    render();
});

function checkBook(title){
    for(let i = 0; i < library.length; i++){
        if(library[i].title === title){
            return true;
        }
    }
    return false;
}

function render(){
    mainGrid.innerHTML = "";
    for(let i = 0; i < library.length; i++){
        createBookCard(i);
    }
}

function createBookCard(index){
    const book = library[index];

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('item');

    const title = document.createElement('div');
    title.textContent = book.title;
    title.classList.add('itemTitle');

    const author = document.createElement('div');
    author.textContent = book.author;

    const pages = document.createElement('div');
    pages.textContent = book.pages;

    const read = document.createElement('div');
    read.textContent = book.read ? 'Read' : 'Not Read';

    const removeBtnContainer = document.createElement('div');
    removeBtnContainer.classList.add('BtnContainer');
    removeBtnContainer.classList.add('remove');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function(){
        removeBook(index)
    });

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    bookDiv.appendChild(removeBtnContainer);
    removeBtnContainer.appendChild(removeBtn);
    mainGrid.appendChild(bookDiv);
}

function removeBook(index){
    library.splice(index, 1);
    render();
}