let books = JSON.parse(localStorage.getItem('books')) || [];

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const category = document.getElementById('bookCategory').value;
    const url = document.getElementById('bookUrl').value;

    if (title && author && category && url) {
        const book = { title, author, category, url };
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks(books);
        clearForm();
    } else {
        alert('សូមបំពេញព័ត៌មានទាំងអស់!');
    }
}

function displayBooks(bookArray) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    bookArray.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <div>
                <strong>${book.title}</strong> ដោយ ${book.author} (${book.category})<br>
                <a href="${book.url}" target="_blank">អានសៀវភៅ</a>
            </div>
            <button onclick="deleteBook(${index})">លុប</button>
        `;
        bookList.appendChild(bookItem);
    });
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks(books);
}

function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchCategory = document.getElementById('searchCategory').value;

    const filteredBooks = books.filter(book => 
        (book.title.toLowerCase().includes(searchTerm) || 
         book.author.toLowerCase().includes(searchTerm)) &&
        (searchCategory === '' || book.category === searchCategory)
    );
    displayBooks(filteredBooks);
}

function clearForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookCategory').value = '';
    document.getElementById('bookUrl').value = '';
}

// បង្ហាញសៀវភៅនៅពេលផ្ទុកទំព័រ
displayBooks(books);