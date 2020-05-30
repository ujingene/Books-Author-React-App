import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getAuthorsQuery, getGenresQuery, addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            synopsis: '',
            genre: '',
            authorid: ''
        };
    }

    displayAuthors =() =>{
        var data = this.props.getAuthorsQuery;

        //console.log(this.props);

        if(data.loading){
            return ( <option disabled>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
            return ( <option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    displayGenres(){
        var data = this.props.getGenresQuery;

        if(data.loading){
            return ( <option disabled>Loading Genres...</option>)
        } else {
            return data.genres.map(genre => {
                return ( <option key={genre.id} value={genre.id}>{genre.name}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                title: this.state.name,
                synopsis: this.state.synopsis,
                genre: this.state.genre,
                authorid: this.state.authorid
            },
            //Refetch data after saving in database
            refetchQueries: [{query: getBooksQuery}]
        });
        //console.log(this.state);
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <select onChange={(e) => this.setState({genre: e.target.value})}>
                        <option>Select Genre</option>
                        {this.displayGenres()}
                    </select>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorid: e.target.value})}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <div className="field">
                    <label>Synopsis</label>
                    <textarea placeholder="Type here..." onChange={(e) => this.setState({ synopsis: e.target.value})}></textarea>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"}), 
    graphql(getGenresQuery, {name: "getGenresQuery"})
)(AddBook); 
