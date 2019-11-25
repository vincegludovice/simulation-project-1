import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import red from "../components/red2.png";
import green from "../components/red.png";
import Swal from "sweetalert2";
const useStyles = makeStyles(theme => ({
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "50%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "0"
  },
  sele: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 20
  }
}));

//

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };
// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder"
// ];

//

export default function ManageUsers(props) {
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      title: "You must login first!",
      width: 600,
      padding: "3em",
      background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `
    }).then(function() {
      window.location = "/";
    });
  }

  const [state, setState] = useState({
    columns: [],
    data: []
  });
  const [personName, setPersonName] = React.useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const names = ["Active", "Inactive"];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }
  const handleChange = event => {
    setPersonName(event.target.value);
  };
  const classes = useStyles();
  useEffect(async () => {
    const result = await axios({
      method: "get",
      url: `http://localhost:3000/users`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`
      }
    });
    setState({ ...state, data: result.data });
  }, []);
  return localStorage.getItem("Token") ? (
    <Container
      maxWidth="md"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      <MaterialTable
        style={{ paddingLeft: 10 }}
        title="Users Data"
        columns={[
          { title: "Email Address", field: "email" },
          { title: "Firstname", field: "firstName" },
          { title: "Lastname", field: "lastName" },
          { title: "Username", field: "username" },
          {
            title: "Active Status",
            field: "active",
            render: rowData => (
              <h1 style={{ paddingLeft: 30 }}>
                {rowData.active ? (
                  <img
                    style={{ height: 10, borderRadius: "50%" }}
                    src={green}
                  />
                ) : (
                  <img style={{ height: 10, borderRadius: "50%" }} src={red} />
                )}
              </h1>
            )
          }
        ]}
        data={[...state.data]}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div className={classes.sele}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {names.map(name => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )
        }}
        options={{
          search: true
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    console.log(prevState);
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            })
        }}
      />
    </Container>
  ) : null;
}
