import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFacade } from "../../../facade/facade";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Chip } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";

export default function Forms() {
  const [formData, setFormData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [snack, setSnack] = useState({
    show: false,
    message: "",
  });
  const history = useHistory();
  const facade: any = useFacade();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFormData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const getFormData = () => {
    setShowLoading(true);
    facade
      .getAllForms()
      .then(async (response: { data: any }) => {
        const data = response.data;
        setFormData(data.Form);
        setShowLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleDeleteEntry = (id: number) => {
    setShowLoading(true);
    facade
      .deleteForm(id)
      .then((res: any) => {
        let filterd = formData.filter((item: any) => item._id !== id);
        setFormData(filterd);
        setShowLoading(false);
        setSnack({ show: true, message: "Entry Deleted"});
      })
      .catch((error: any) => {
        console.log(error);
      });
    setSnack({ show: false, message: ""});
  };

  const handleEditEntry = (id: number) => {
    history.replace({
      pathname: `/home/edit/${id}`
    });
  };

  return (
    <div className="form-module">
      <Snackbar open={snack.show} autoHideDuration={3000} 
     anchorOrigin={{ vertical:'top', horizontal:'center' }}
      key={'top' + 'center'}>
      <Alert sx={{ width: "100%" }}>
        {snack.message}
      </Alert>
    </Snackbar>
      <TableContainer className="form-module-table" component={Paper}>
        <Table sx={{ minWidth: 650, height: 400 }} aria-label="simple table">
          <TableHead sx={{ background: "rgba(255,255,255,0.8)" }}>
            <TableRow>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>id</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Address
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Email Id
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Phone Number
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Service
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData &&
              formData.map((item: any, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <div
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        borderRadius: "20px",
                        padding: "8px",
                        display: "flex",
                        color: "teal",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon onClick={() => handleEditEntry(item._id)} />
                      <DeleteIcon onClick={() => handleDeleteEntry(item._id)} />
                    </div>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item._id.slice(0, 6)}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item.address}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item.email}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item.service ? (
                      <Chip sx={{ background: "rgba(255,255,255,0.8)" }} label="Continue" variant={"outlined"} color="success" />
                    ) : (
                      <Chip sx={{ background: "rgba(255,255,255,0.8)" }} label="stop" variant={"outlined"} color="error" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
