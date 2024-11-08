export const customStyles = {
    header: {
        style: {
            background: '#172b4d',
            color: 'white',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        }
    },
    headRow: {
        style: {
            fontWeight: '700',
            borderBottomColor: '#1f3a68',
            color: '#4d7bca'
        }
    },
    rows: {
        style: {
            minHeight: '30px', // override the row height
            background: '#172b4d',
            color: 'white',
        },
    },
    headCells: {
        style: {
            background: '#1c345d',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
    tableWrapper: {
        style: {
            borderBottomRightRadius: '10px',
            overflow: 'hidden',
        },
    },
    pagination: {
        style: {
            backgroundColor: '#1c345d', // Cambiar el fondo del contenedor de paginación
            borderTop: '1px solid #1f3a68',
            color: '#4d7bca', // Cambiar el color del texto en el paginado
            padding: '10px', // Ajustar el espacio alrededor del paginado
        },
        pageButtonsStyle: {
            borderRadius: '5px',
            padding: '5px 10px',
            margin: '0 5px',
            backgroundColor: '#172b4d',
            color: '#4d7bca',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#4d7bca', // Fondo al pasar el mouse
            },
            '&:disabled': {
                backgroundColor: '#888', // Fondo cuando el botón está deshabilitado
                cursor: 'not-allowed',
            },
        }
    },
    subHeader:{
        style:{
            background: '#172b4d',

        }
    }
};