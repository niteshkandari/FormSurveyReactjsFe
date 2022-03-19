import { Button, CircularProgress, FormControl, Input } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import info from "../../../assets/svg/info.svg";
import { ValidateFormData }  from "../../../utils/Validate";
import { useFacade } from "../../../facade/facade" ;
import { useRouteMatch } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

export default function Create() {
  const countRef = React.useRef(0);
  const facade:any = useFacade();
  const match:any = useRouteMatch();
  const [loading,setLoading] = React.useState(false);
  const [qst, setQst]= React.useState([
    { question: "name", value: "" },
    { question: "email", value: "" },
    { question: "address", value: "" },
    { question: "phoneNumber", value: "" },
  ]);
  const [question, setQuestion] = React.useState<any>(qst[countRef.current].question);
  const [snack,setSnack]= React.useState({show:false,message:"",type:"success"})
  
  React.useEffect(() => {
    if(match.params.id) getFormDataById(match.params.id);
  },[match.params.id])

  const handleNextQuestion = () => {
    if (countRef.current === qst.length - 1) return;
    countRef.current++;
    setQuestion(qst[countRef.current].question);
  };
  const handlePreviousQuestion = () => {
    if (countRef.current === 0) return;
    countRef.current--;
    setQuestion(qst[countRef.current].question);
  };
  const handleOnChange = (e: any) => {
    let current:any = qst[countRef.current];
    let newQst = [...qst];
    current.value = e.target.value;
    newQst.splice(countRef.current,1,current);
    setQst([...newQst]);
  };
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    // let timer: NodeJS.Timeout;
    let reqBody = {
      name: qst[0].value,
      email: qst[1].value,
      address: qst[2].value,
      phoneNumber: qst[3].value,
    };
    let validated: boolean = false;
    await ValidateFormData.validator(reqBody)
      .then((result:any) =>
        result === true ? (validated = true) : (validated = false)
      )
      .catch((err:any) => setSnack({show:true, message:err.warning,type:"error"}));
    if(!validated) {
      setTimeout(() => {setSnack({show:false, message:"",type:""})},2000)
      return;
    }
    if(match.params.id) {
      facade.updateForm({id:match.params.id,body:reqBody}).then((result:any) =>{
        console.log(result);
        let old = qst;
        old.forEach(item => item.value = "");
        setQst(old);
        setSnack({show:true, message:"Form updated",type:"success"});  
      }).catch((err:Error) =>{
        console.log(err)
      })
      setSnack({show:false, message:"",type:""});  
      return;
    }
      facade.createForm(reqBody).then((response: { data: any; }) => {
        setSnack({show:true, message:"Form submitted successfully",type:"success"});  
        setTimeout(() => {
          setSnack({show:false, message:"",type:"success"})
        },2000)
      })
      .catch((error: any) => {
        setSnack({show:true, message:"something went wrong",type:"error"});
        setTimeout(() => {
          setSnack({show:false, message:"",type:"success"})
        },2000)
      }); 
    setQst([
      { question: "name", value: "" },
      { question: "email", value: "" },
      { question: "address", value: "" },
      { question: "phoneNumber", value: "" },
    ])
  }
  const getFormDataById = (id:string) => {
    setLoading(true)
    facade.getFormById(id).then(async(success:any) => {
      if(!success) return;
      const { data } = await success;
        let oldFormData = qst;
        oldFormData.forEach((item:any) => {
        item.value = data[item.question];
      })
       setQst(oldFormData);
       setLoading(false)
      }).catch((err:any) => console.log(err))
  }
  return (
    <>
    <Snackbar open={snack.show} autoHideDuration={2000} 
     anchorOrigin={{ vertical:'top', horizontal:'center' }}
      key={'top' + 'center'}>
      {snack.type === "success" ?
      <Alert severity="success" sx={{ width: "100%" }}>
        {snack.message}
      </Alert>
      :<Alert severity="info" sx={{ width: "100%" }}>
        {snack.message}
      </Alert>}
    </Snackbar>
    <div className="create-module">
      <div className="creat-module-svg">
        <img height="400" width="500" src={info} />
      </div>
      <form className="form-box" onSubmit={handleFormSubmit}>
        <div className="question-box">
          <FormControl className="auth-input-field" variant="standard">
            <Input
              className="form-input-resp"
              style={{ color: "black", fontSize: "30px" }}
              placeholder={question}
              value={ qst[countRef.current].value}
              onChange={(e:any) => handleOnChange(e)}
            />
          </FormControl>
        </div>
        <div className="form-nxt-btn">
          <Button
            variant="outlined"
            style={{ color: "white" }}
            size="large"
            onClick={handlePreviousQuestion}
          >
            back <ArrowBackIcon />
          </Button>
          <Button
            variant="outlined"
            style={{ color: "white" }}
            size="large"
            onClick={handleNextQuestion}
          >
            next <NavigateNextIcon />
          </Button>
        </div>
        <div className="form-sbt-btn">
          <Button type="submit" style={{ color: "white" }}>
            submit <TurnedInIcon />
          </Button>
        </div>
      </form>
    </div>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
