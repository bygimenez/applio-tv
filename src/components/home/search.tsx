"use client"
import { useState } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      window.location.href = `/share?search=${encodeURIComponent(searchTerm)}`;
    };

    return (
        <form onSubmit={handleSubmit} className='justify-center items-center flex mt-20 z-50 gap-4 mx-44'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className='bg-white/10 rounded-lg px-4 py-2 w-full'
        />
        <button type="submit" className='bg-white/30 rounded-lg px-4 py-2'>Search</button>
      </form>
    )
}