import {gql} from 'apollo-boost';

const getAuthorsQuery = gql `
    {
        authors{
            id
            name
        }
    }

`;

const getGenresQuery = gql`
    {
        genres{
            id
            name
            books{
                id
                title
                author{
                    id
                    name
                    age
                }
            }
        }
    }

`;

const getBooksQuery = gql `
    {
        books{
            title
            id
        }
    }

`;

//Define variables to pass in variable data from forms for submition
const addBookMutation = gql`
    mutation($title: String!, $synopsis: String!, $genre: String!, $authorid: ID!) {
        addBook(title:$title, synopsis:$synopsis, genre:$genre, authorid:$authorid){
            title
        }
    }

`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            title
            synopsis
            author{
                name
                age
                books{
                    title
                    id
                }
            }
            genre{
                name
                books{
                    title
                }
            }
        }
    }
`;

const getGenreQuery = gql`
    query($id: ID){
        genre(id: $id){
            name
            books{
                title
                author{
                    id
                    name
                    age
                }
            }
        }
    }

`;

export { getAuthorsQuery, getBooksQuery, getGenresQuery, getGenreQuery, addBookMutation, getBookQuery};