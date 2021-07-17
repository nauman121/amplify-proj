// import React from "react";
// import Amplify from "aws-amplify";
// import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
// import awsconfig from "./aws-exports";
// import awsConfig from "./aws-exports";
// /* First import the API category from Amplify */
// import { API,graphqlOperation } from 'aws-amplify';

// /* Next, import the createContact mutation */
// import { createStudent,updateStudent } from './graphql/mutations';
// import { getStudent} from './graphql/queries';

// Amplify.configure(awsconfig);
// const App=()=>{
// const [name,setname]=React.useState({name:'',address: '',phone: '',phone2: ''});
//   const clickhandle =async ()=>{
// //  const data= await  API.graphql(graphqlOperation(createStudent,{input:{name: "saad",address: "dsfs",phone: "12211",phone2: "67823"}}));
// // const data= await  API.graphql(graphqlOperation(updateStudent,{input:{id: "57233326-5bdd-4b4b-b48d-4914ce34dbfa",name: "nauman",address: "ادارتی",phone: "12211",phone2: "678999"}}));
// const data= await  API.graphql(graphqlOperation(getStudent,{id:"57233326-5bdd-4b4b-b48d-4914ce34dbfa"}));
// const std=data.data.getStudent;
// setname(
//   {name:std.name,address:std.address,phone:std.phone,phone2: std.phone2}
// )

// const auth=()=>{
  
// const isLocalhost = Boolean(
//   window.location.hostname === "localhost" 
// );

// // Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [
//   localRedirectSignIn
  
// ] = awsConfig.oauth.redirectSignIn.split(",");

// const [
//   localRedirectSignOut
 
// ] = awsConfig.oauth.redirectSignOut.split(",");

// const updatedAwsConfig = {
//   ...awsConfig,
//   oauth: {
//     ...awsConfig.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : '',
//     redirectSignOut: isLocalhost ? localRedirectSignOut :'',
//   }
// }

// Amplify.configure(updatedAwsConfig);
// }

//   }
//  return <AmplifyAuthenticator>
//     <div>
      
//       {/* <button onClick={clickhandle}> create-student </button> */}
//       <AmplifySignOut /> 
//     </div> <div> My App <button onClick={clickhandle}> create-student </button> </div> 
//     <p> student name: {name.name} </p>
//     <p> student address: {name.address} </p>
//     <p> student phone: {name.phone} </p>
//     <p> student phone2: {name.phone2} </p>
//   </AmplifyAuthenticator>
// };
// export default App;
/* Import the Amplify Auth API */

import React from 'react';
import { Auth } from 'aws-amplify';
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {
  let [formState,setFormState] =React.useState("signUp");
let formInputState = { username: '', password: '', email: '', verificationCode: '' };

/* onChange handler for form inputs */
function onChange(e) {
  formInputState = { ...formInputState, [e.target.name]: e.target.value };
}

/* Sign up function */
async function signUp() {
  try {
    await Auth.signUp({
      username: formInputState.username,
      password: formInputState.password,
      attributes: {
        email: formInputState.email
      }});
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    setFormState("confirmSignUp")
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    setFormState("signIn")
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.username, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    setFormState("signedIn")
  } catch (err) { console.log({ err }); }
}


/* In the UI of the app, render forms based on form state */
/* If the form state is "signUp", show the sign up form */
if (formState === "signUp") {
  return (
    <div>
       
      <label style={{marginLeft: "10px"}} > username:</label> 
      <input style={{marginLeft: "10px"}}
      type='text'
        name="username"
        onChange={onChange}
      /> <br/>
      <label style={{marginLeft: "10px"}}> password:</label> 
      <input style={{marginLeft: "10px"}}
      type='password'
        name="password"
        onChange={onChange}
      /><br/>
      <label style={{marginLeft: "10px"}}> email :</label> 
      <input style={{marginLeft: "33px"}}
      type='email'
        name="email"
        onChange={onChange}
      /> <br/> <br/>
      <button style={{marginLeft: "90px"}} onClick={signUp}>sign up</button>
      
    </div>
  )
}

/* If the form state is "confirmSignUp", show the confirm sign up form */
if (formState === "confirmSignUp") {
  return (
    <div>
      
      <input
      type='text'
        name="username"
        onChange={onChange}
      />
      <input
        name="verificationCode"
        onChange={onChange}
      />
      <button onClick={confirmSignUp}>Confirm Sign Up</button>
    </div>
  )
}

/* If the form state is "signIn", show the sign in form */
if (formState === "signIn") {
  return (
    <div>
      <input
      type='text'
        name="username"
        onChange={onChange}
      />
      <input
      type='password'
        name="password"
        onChange={onChange}
      />
      <button onClick={signIn}>Sign In</button>
     
    </div>
  )
}

/* If the form state is "signedIn", show the app */
if (formState === "signedIn") {
  return (
    <div>
      <h1>Welcome to my app!</h1>
    </div>
  )
}
}
export default App;