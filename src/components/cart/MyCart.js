import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CartItem from 'components/cartItem/CartItem';
import React from 'react';

const MyCart = ({ cart, updateable }) => (
  <div className="cart-content">
    <Table className="table">
      <TableHead>
        <TableRow>
          <TableCell>ΠΕΡΙΓΡΑΦΗ</TableCell>
          <TableCell>ΠΟΣΟΤΗΤΑ</TableCell>
          <TableCell>ΤΙΜΗ</TableCell>
          {updateable && <TableCell />}
        </TableRow>
      </TableHead>
      <TableBody>
        {cart?.map((item, index) => (
          <CartItem key={index} updateable={updateable} item={item} />
        ))}
      </TableBody>
    </Table>
  </div>
);

export default MyCart;
