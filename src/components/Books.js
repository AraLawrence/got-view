import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'authors',
        headerName: 'Authors',
        width: 250,
    },
    {
        field: 'name',
        headerName: 'Title',
        width: 250,
    },
    {
        field: 'publisher',
        headerName: 'Publisher',
        width: 250,
    },
    {
        field: 'isbn',
        headerName: 'ISBN',
        width: 150,
    },
];

// App.js
function Books() {
    const [booksList, setBooksList] = useState(false);
    const navigate = useNavigate();

    // TODO: use MUI's style api
    const localStyles = {
        tableContainer: {
            height: '400px',
            padding: '15px',
        }
    }

    useEffect(() => {
        if (!booksList) {
            axios.get('/all-books')
                .then((books) => {
                    // Would be better not to use index here.
                    // However... HACK: the api doesn't return an explicit id, 
                    // but index + 1 looks to map to one, judging by the url property
                    const useData = books.data.map((book, idx) => {
                        const returnBook = book;
                        returnBook.id = idx + 1;
                        return returnBook;
                    })

                    setBooksList(useData)
                })
                .catch((err) => {
                    console.log(err);
                    setBooksList([])
                })
        }
    })

    console.log(booksList)
    return (
        <div>
            <div style={localStyles.tableContainer}>
                <Typography>Books</Typography>
                {booksList.length && (
                    <DataGrid
                        rows={booksList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        onCellClick={(params, event) => {
                            navigate(`/book/${params.id}`)
                            event.defaultMuiPrevented = true;
                        }}
                    />
                )}
            </div>
            <Outlet/>
        </div>
    );
}

export default Books;
