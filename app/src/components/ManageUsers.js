import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
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

const useStyles = makeStyles(theme => ({
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "40%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "0"
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

export default function ManageUsers() {
  const [state, setState] = useState({
    columns: [
      { title: "Email Address", field: "email" },
      { title: "Firstname", field: "firstName" },
      { title: "Lastname", field: "lastName" },
      { title: "Username", field: "username" },
      { title: "Active Status", field: "active" }
    ],
    data: []
  });
  // const [data, setData] = useState([]);
  const classes = useStyles();
  const [personName, setPersonName] = useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  // const useFetch = (url) => {
  //   const [data, setData] = useState(null);
  //   useEffect(() => {
  //     let mounted = true;
  //     (async () => {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       if (mounted) setData(data);
  //     })();
  //     const cleanup = () => { mounted = false; };
  //     return cleanup;
  //   }, [url]);
  //   return data;
  // };
  // useEffect(() => {
  //   // console.log(state.data);
  //   var token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmNlbHVzZmRvdmNlQGJvb2ZtLmNhbXAiLCJpYXQiOjE1NzQ0MDM3MTIsImV4cCI6MTU3NDQwNzMxMiwic3ViIjoiNTYifQ.po5qGFtIqvn2IJvA5I06vjGm4Oc1XxCwjyUZFgKdNbo";
  //   axios({
  //     method: "get",
  //     url: `http://localhost:3000/users`,
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }).then(data => {
  //     // console.log(data.data);
  //     data = data.data;
  //     console.log(data);
  //     // setState({
  //     //   data: data
  //     // });
  //   });
  // });
  useEffect(async () => {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmNmZWx1c2Zkb3ZjZUBib29mZm0uY2FtcCIsImlhdCI6MTU3NDQxMTY4MiwiZXhwIjoxNTc0NDE1MjgyLCJzdWIiOiI1OCJ9.8-MJLDsi27dbA4SnBMLf_LT3--6j61C-skFVjnR5mH8";
    const result = await axios({
      method: "get",
      url: `http://localhost:3000/users`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setState({ ...state, data: result.data });
  }, []);
  // console.log(data.data);
  return (
    <Container
      maxWidth="md"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={[...state.data]}
        // components={{
        //   Toolbar: props => (
        //     <div>
        //       <FormControl className={classes.formControl}>
        //         <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        //         <Select
        //           labelId="demo-mutiple-checkbox-label"
        //           id="demo-mutiple-checkbox"
        //           multiple
        //           value={personName}
        //           onChange={handleChange}
        //           input={<Input />}
        //           renderValue={selected => selected.join(", ")}
        //           MenuProps={MenuProps}
        //         >
        //           {names.map(name => (
        //             <MenuItem key={name} value={name}>
        //               <Checkbox checked={personName.indexOf(name) > -1} />
        //               <ListItemText primary={name} />
        //             </MenuItem>
        //           ))}
        //         </Select>
        //       </FormControl>
        //     </div>
        //   )
        // }}
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
  );
}
