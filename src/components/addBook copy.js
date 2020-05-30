import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {getAuthorsQuery, addBookMutation} from '../queries/queries';

const AuthorsList = () => {

    //Define Our State of inputs
    const [values, setValues] = useState({ name: '', genre: '', authorid: '' })

    //Handle Form Inputs
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        //  console.log(values);
    }

    const addAuthor = (e) => {
        e.preventDefault();
        const { name, genre, authorid } = values;

        if (!name || !genre || !authorid){
        return values
        } else{
            console.log(name, genre, authorid);
        }

    }

    //Add data to apollo client useMutation
   // const [addAuthorMutation, { data }] = useMutation(addBookMutation);
    
    //get data from apollo client useQuery
    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <option disabled>Loading Authors...</option>;
    if (error) return `Error! ${error.message}`;

    const displayAuthors = () => {
        if(data){
            return data.authors.map(author => {
                return <option key={author.id} value={author.id} > {author.name} </option>
            })
        }
    }
   
        return(
            <div>
                <form id="add-book" onSubmit={addAuthor}>
                    <div className="field">
                        <label>Book Name:</label>
                        <input type="text" value={values.name} name='name' onChange={handleInputChange} />
                    </div>

                    <div className="field">
                        <label>Genre</label>
                        <input type="text" value={values.genre} name='genre' onChange={handleInputChange}/>
                    </div>

                    <div className="field">
                        <label>Author</label>
                        <select value={values.authorid} name='authorid' onChange={handleInputChange}>
                            <option>Select Author</option>
                            {displayAuthors()}
                        </select>
                    </div>

                    <button>+</button>
                </form>
            </div>
        )
    
}

export default AuthorsList;