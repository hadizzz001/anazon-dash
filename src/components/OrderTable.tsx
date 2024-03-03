import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export function createData(
  orderID: string,
  FullName: string,
  Phone: string,
  Email: string,
  Address: string,
  City: string,
  history : {
    title : string,
    selectedColor ?: string,
    id:string,
    color : string,
    qty: number,
    img ?:string,
    price : number,
  }[],
  id: string,
  total : number,
  // histroy : any
) {
  return {
    orderID,
    FullName,
    Phone,
    Address,
    Email,
    history,
    id,City
    ,total
    // history: [
    //   {
    //     history.title,
    //     id,
    //     qty,
    //     price,
    //   },

    // ],
  };
}
const Delete= async (id:string) => {
  // console.log('id: ', id);
  let proceed = confirm("Delete Order?");
  if (proceed) {
    //proceed
    const jwt = localStorage.getItem('tknsite')
    if (jwt) {
        const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/deleteorder`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({jwt, id})
        })
        const res = await req.json()
        // console.log('res: ', res);
        if (res?.success) {
          // console.log('a: ', a);
          window && window.alert('Order Deleted')
          // window.reload()
        }
    }
  } else {
   alert('Failed To Delete Product!')
    //don't proceed
  }
}
function Row(props: { id:string,row: ReturnType<typeof createData> }) {
  const { row ,id} = props;
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  let rowstore = localStorage.getItem('selectedRows')
  const selectedRows = rowstore && JSON.parse(rowstore) || [];

  // Check if the row's ID is in the selectedRows array
  useEffect(() => {
    setIsSelected(selectedRows.includes(row.id));
  }, [row.id, selectedRows]);

  // Click handler to toggle selection
  const handleRowClick = (id: string) => {

      Delete(id)

  };
  const handleDone = () => {
    const updatedSelectedRows = isSelected
      ? selectedRows.filter((selectedRowId:any) => selectedRowId !== row.id)
      : [...selectedRows, row.id];


    setIsSelected(!isSelected);
    localStorage.setItem('selectedRows', JSON.stringify(updatedSelectedRows));
  };
  // Style the row based on selection
  const rowStyle = {
    cursor: 'pointer',
    border: isSelected ? '2px solid green' : 'none',
  };

  return (
    <React.Fragment>
      <Box className="flex wrap row" sx={{gap:.5}}>

      <Button   onClick={()=>handleRowClick(id)} sx={{border:'2px solid',color:'red',cursor:'pointer', display: isSelected ? 'none' : 'flex'}}>
          Delete
      </Button>
      <Button onClick={()=>handleDone()} sx={{color: isSelected ? 'green' : 'black'}}>
        {isSelected ? 'Done!' : 'Pending'}
      </Button>
      </Box>
      <TableRow
      sx={{ '& > *': { borderBottom: 'unset' },border:isSelected ? '1px solid green ':'none'
     }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`${row.FullName} \n` + `${row.orderID !== 'NULL' ? `orderNB:${row.orderID}` : '' }` }
        </TableCell>
        <TableCell align="right">{row.Phone}</TableCell>
        <TableCell align="right">{row.Email}</TableCell>
        <TableCell align="right">{ row.Address + 'CITY:' + row.City}</TableCell>
        <TableCell align="right">${row.total}</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Pics</TableCell>
                    <TableCell align="right">QTY</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.title} | {historyRow?.selectedColor || '' }
                      </TableCell>
                      <TableCell>
                        {
                            historyRow.img &&
                          <img src={`${historyRow.img}`} alt="" className="img row-img" />
                        }
                        </TableCell>
                      <TableCell align="right">{historyRow.qty}</TableCell>
                      <TableCell align="right">
                        ${historyRow.price}
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData('Full Name', '97125122', 'email@gmail.com', 'address',[{title:'Product name',id:'fooer',qty:1,price:200},{title:'Product name',id:'fooer',qty:1,price:200}]),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({rows} : any) {
  // const rows = [
  //   rows.
  // ]
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Customers</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            {/* <TableCell align="right"></TableCell> */}

            {/* <TableCell align="right">Name</TableCell> */}
            <TableCell align="right">City + Address</TableCell>
            <TableCell align="right">Total + Delivery</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <Row key={row.id ? row.id : row?._id } id={row?.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
