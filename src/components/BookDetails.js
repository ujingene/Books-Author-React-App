import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    displayBookDetails(){
        const { book } = this.props.data;
        //console.log(book);
        if(book){
            return(
                <div>
                    <h2>{book.title}</h2>
                    <p><b>Genre:</b> {book.genre.name} </p>
                    <p><b>Author</b>{book.author.name} </p>
                    <b>Synopsis:</b><p id="synopsis"> {book.synopsis}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Book by Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book.author.books.map(item => {
                                console.log(item)
                            return <tr key={item.id}>
                                <td>{item.title}</td>
                            </tr>
                            })}
                        </tbody>
                    </table>

                    <hr></hr>

                    <table>
                        <thead>
                            <tr>
                                <th>Related Books by Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book.genre.books.map(item => {
                                //console.log(item)
                            return <tr key={item.id}>
                                <td>{item.title}</td>
                            </tr>
                            })}
                        </tbody>
                    </table>

                </div>
            )
        } else {
            return(
                <div><h1> NO book selected... </h1></div>
            )
        }
    }

    render() {

        //console.log(this.props)
        return (
            <div id="book-details">
                <p>Book details</p>
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookid
            }
        }
    }
})(BookDetails);
