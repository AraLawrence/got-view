import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 400,
    },
    {
        field: 'gender',
        headerName: 'gender',
        width: 400,
    },
    {
        field: 'culture',
        headerName: 'Culture',
        width: 400,
    },
];

// TODO: use MUI's style api
const localStyles = {
    tableContainer: {
        height: '400px',
        padding: '15px',
    }
}

// App.js
function Book() {
    const params = useParams();
    const [bookDetails, setBookDetails] = useState(false);

    useEffect(() => {
        if (!bookDetails) {
            axios.get(`/book-details?id=${params.id}`)
                .then((details) => {
                    const { data } = details;
                    console.log(data);
                    data.characters.forEach((char) => {
                        // HACK: infer char id by url
                        console.log(char);
                        const useId = char.url.slice(char.url.lastIndexOf('/') + 1);
                        char.id = useId;
                    })
                    setBookDetails(data);
                })
                .catch((err) => {
                    console.log(err);
                    setBookDetails({});
                })
        }
    });

    console.log(bookDetails);
    return (
        <div>
            {(bookDetails?.book) && (
                <Typography variant='h3'>{bookDetails.book.name}</Typography>
            )}
            <div style={localStyles.tableContainer}>
                {(bookDetails?.characters?.length) && (
                    <DataGrid
                        rows={bookDetails.characters}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                />
                )}
            </div>
        </div>
    );
}

export default Book;
