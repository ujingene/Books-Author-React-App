import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGenreQuery } from '../queries/queries';

class GenreDetails extends Component {
    displayGenreDetails(){
        const { genre } = this.props.data;
        if(genre){
            return(
                <>
                <div>
                    <h2>{genre.name}</h2>
                    <p><b>All Books under this genre:</b></p>

                    <table>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genre.books.map(item => {
                                console.log(item)
                            return <tr key={item.id}>
                                <td>{item.title}</td>
                            </tr>
                            })}
                        </tbody>
                    </table>

                </div>

                <div>
                    <p><b>Contributors:</b></p>

                    <table>
                        <thead>
                            <tr>
                                <th>Authors</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genre.books.map((item, i)=> {
                               // console.log(item)
                            return <tr key={item.author.id}>
                                <td>{item.author.name}</td>
                                <td>{item.author.age}</td>
                            </tr>
                            })}
                        </tbody>
                    </table>

                </div>
                </>
            )
        } else {
            return(
                <div><h1> NO Genre selected... </h1></div>
            )
        }
    }

    render() {

        //console.log(this.props)
        return (
            <div id="genre-details">
                <p>Genre details</p>
                {this.displayGenreDetails()}
            </div>
        )
    }
}

export default graphql(getGenreQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.genreid
            }
        }
    }
})(GenreDetails);
