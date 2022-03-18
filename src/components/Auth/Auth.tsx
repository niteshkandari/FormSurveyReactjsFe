import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuthFacade } from "../../facade/AuthFacade";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
function Auth() {
  const auth:any = useAuthFacade();
  const dispatch:any = useDispatch();
  const history:any = useHistory();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snack, setSnack] = React.useState({message:"",type:"",show:false});

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    auth.login({email:id, password:values.password}).then((success:any) => {
      if (success.status === 200) {
        setSnack({show:true, message:"Logged in successfully",type:"success"});
        dispatch({ type: "store-token", payload: success.data.token });
        dispatch({ type: "SET-ID", payload: id });
        history.push("/home/create");
        setLoading(false);
        setId("");
        setValues({
          amount: "",
          password: "",
          weight: "",
          weightRange: "",
          showPassword: false,
        });
        setTimeout(() => {
          setSnack({show:false, message:"",type:""});          
        },4000)
      }
    }).catch((err:any) => {
      setSnack({show:true, message:err,type:""});
      setLoading(false);
      setTimeout(() => {
        setSnack({show:false, message:"",type:""});          
      },4000)
    })
    };
  const ariaLabel = { "aria-label": "description" };
  return (
    <>
     <Snackbar open={snack.show} autoHideDuration={4000} 
     anchorOrigin={{ vertical:'top', horizontal:'center' }}
      key={'top' + 'center'}>
      {snack.type === "success" ?
      <Alert severity="success" sx={{ width: "100%" }}>
        {snack.message}
      </Alert>
      :<Alert severity="error" sx={{ width: "100%" }}>
        {snack.message}
      </Alert>}
    </Snackbar>
    <div className="auth-page">
      <div className="auth-page-main-img" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-wel-box">
          {/* <img height="120" width="250"src={welcome}/> */}
          <span>SURVEYiOR</span>
          <br/>
          <span>
          Tech stack used
          <br/>
          <br/>
            react(with material ui), redux ⚛️
            node js, express, mongodb atlas 🍃
          </span>
        </div>
        <FormControl className="auth-input-field" variant="standard">
          <Input
            placeholder="email"
            inputProps={ariaLabel}
            type="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </FormControl>
        <FormControl className="auth-input-field" variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <LoadingButton
          className={"auth-subt-btn"}
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="outlined"
          type={"submit"}
        >
          Submit
        </LoadingButton>
      </form>
    </div>
    </>
  );
}

export default Auth;
