import { TableHead, TableRow, TableCell } from '@material-ui/core';

export default function RequestTableHead(): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Ower Info</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Price</TableCell>
        <TableCell align="center">Date created</TableCell>
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}
