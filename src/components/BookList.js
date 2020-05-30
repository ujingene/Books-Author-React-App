import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getBooksQuery, getGenresQuery} from '../queries/queries';
import BookDetails from './BookDetails';
import GenreDetails from './GenreDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: '',
            genreSelected: ''
        }
    }

    listBooks(){
        var data = this.props.getBooksQuery;

        //console.log(this.props);

        if(data.loading){
            return ( <option disabled>Loading Books...</option>)
        } else {
            return data.books.map(book => {
            return ( <li key={book.id} onClick={(e) =>this.setState({ selected: book.id})}>{book.title}</li>)
            })
        }
    }

    listGenres(){
        var data = this.props.getGenresQuery;

        //console.log(data)

        if(data.loading){
            return ( <option disabled>Loading Genres</option>)
        } else {
            return data.genres.map(genre => {
                return ( <li key={genre.id} onClick={(e) => this.setState({ genreSelected: genre.id})}>{genre.name}</li>)
            })
        }
    }

    render() {
       // console.log(this.props)
        return (
            <>
            <div>
                <h2>Book Listing</h2>
                <ul id="book-list">
                    {this.listBooks()}
                </ul>
                <BookDetails bookid={this.state.selected}/>
            </div>

            <div>
                <h2>Genre Listing</h2>
                <ul id="genre-list">
                    {this.listGenres()}
                </ul>
                <GenreDetails genreid={this.state.genreSelected} />
            </div>
            </>
        )
    }
}

export default compose(
    graphql(getBooksQuery, {name: "getBooksQuery"}),
    graphql(getGenresQuery, {name: "getGenresQuery"})
)(BookList); 

