import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Book {
    title: string;
    author_name?: string[]; // This is how OpenLibrary returns the author
    first_publish_year?: number; // This is how OpenLibrary returns the year
}

const fetchOpenLibraryBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get("https://openlibrary.org/search.json?q=react");
        console.log(response.data);
        // Extract the relevant data
        return response.data.docs.map((doc: Book) => ({
            title: doc.title,
            author_name: doc.author_name,
            first_publish_year: doc.first_publish_year
        }));
    } catch (error) {
        console.error("Error fetching books: ", error);
        return [];
    }
}

const BookComponent = () => {
    const [openLibraryBooks, setOpenLibraryBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await fetchOpenLibraryBooks();
            setOpenLibraryBooks(books);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Open Library Books</h2>
            <ul>
                {openLibraryBooks.map((book, index) => (
                    <li key={index}>{book.title} by {book.author_name?.join(", ")} ({book.first_publish_year})</li>
                ))}
            </ul>
        </div>
    );
};

export default BookComponent;
