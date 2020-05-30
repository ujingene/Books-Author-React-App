import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';


const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return 'Loading Books...';
    if (error) return `Error! ${error.message}`;
    
    return (
        <div>
            <table id="book-list">
                <thead>
                    <tr>
                        <th width="270px">Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { data.books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.genre}</td>
                        <td>{book.author.name}</td>
                        <td><button><BookDetails /></button> </td>
                        
                    </tr>
                    )) }
                </tbody>

            </table>
        </div>
    )
}

export default BookList;