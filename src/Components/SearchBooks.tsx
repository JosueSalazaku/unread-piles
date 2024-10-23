import { useState } from 'react'
import axios from 'axios';
import { Input } from '@/Components/ui/input';

export default function SearchBooks() {
    const APIKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const [search, setSearch] = useState("");
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKey}`;

    async function searchBook(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            try {
                const response = await axios.get(url);
                console.log(response);
                setSearch(response.data)
            } catch (err) {
                console.log(err);
            }
        }
    }

  return (
    <div>
        <Input type="text" placeholder='Enter your book here'
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyPress={searchBook}
        className='text-white font-thin text-xl w-[400px] h-12 border border-white border-opacity-30'
        />
    </div>
  )
}

