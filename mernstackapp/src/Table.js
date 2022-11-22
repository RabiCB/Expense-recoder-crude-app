import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import "./Icons.css";

//import dayjs from "dayjs"

export default function BasicTable({
  transactions,
  search,
  fetchtransaction,
  setEdittransaction,
}) {
  async function remove(_id) {
    if (!window.confirm("are you sure")) return;
    const res = fetch(`http://localhost:8082/spendings/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("successfull");
    }
    fetchtransaction();
  }
  /*const formdate=(date)=>{
        return dayjs(date).format("DD MMM, YYYY")

     }*/

  return (
    <div className="table">
      <TableContainer className="table-rc" style={{
       
      }}component={Paper}>
        <Table
          
          sx={{ minWidth: 340 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Detail of Transaction </TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .filter((row) => {
                if (search === "") {
                  return row;
                } else if (
                  row.detail
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return row;
                }
              })
              .map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Rs {row.amount}</TableCell>
                  <TableCell align="center">{row.detail}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "center",
                    }}
                  >
                    <EditSharpIcon
                      onClick={() => setEdittransaction(row)}
                      className="Eicons"
                    />
                    <DeleteSharpIcon
                      onClick={() => remove(row._id)}
                      className="icons"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
