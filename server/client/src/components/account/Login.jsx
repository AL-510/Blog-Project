import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  
`;

const Image = styled("img")({
  width: 252,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  color: #fff;
  height: 50px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  background: #fff;
  color: #2874f0;
  height: 50px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error = styled(Typography) `
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const loginInitialValues = {
    username: '',
    password: ''
}

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const [login, setLogin] = useState(loginInitialValues);

  const {setAccount} = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount('login') : toggleAccount('signup');
  }

  const onInputChange = (e) => {
    setSignup({...signup, [e.target.name]: e.target.value});
  }

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if(response.isSuccess) {
        setError('');
        setSignup(signupInitialValues);
        toggleAccount('login')
    }else{
        setError('Something went wrong')
    }
  }

  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const loginUser = async () => {
    let response  = await API.userLogin(login);
    if(response.isSuccess){
        setError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount({username: response.data.username, name: response.data.name});

        isUserAuthenticated(true);

        navigate('/');
    }else{
        setError('Something went wrong! Please try again later');
    }
  }


 const imageURL = "https://images.unsplash.com/photo-1673275413312-5a59b3f37f16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1844&q=80";
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />

        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Enter username" />
            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="Enter password" />

            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" name="name" onChange={(e) => onInputChange(e)} label="Enter name" />
            <TextField variant="standard" name="username" onChange={(e) => onInputChange(e)} label="Enter username" />
            <TextField variant="standard" name="password" onChange={(e) => onInputChange(e)} label="Enter password" />

            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Sign up</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
