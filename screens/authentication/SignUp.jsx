import React, { useState } from 'react';
import {
  View, StyleSheet, Text, ScrollView, SafeAreaView,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Input from '../../components/Input';
import {Container, Col, Row, Form, Button, FormLabel, FormControl, ListGroupItem, ButtonGroup, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';




export default function SignUp({ navigation }) {

  const [newUsr, setNewUsr] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordTwo: '',
    termsAccepted: false,
    role: '',
  })

  const [offerSignIn, setOfferSignIn] = useState(false);

    let submit = () => {
      let {
        firstName,
        lastName,
        email,
        password,
        termsAccepted,
        role
      } = newUsr;

      const user = {
        firstName,
        lastName,
        email,
        password,
        termsAccepted,
        role
      };
      console.log(user)
      // here you would create the user and sign the up
    }

    let handleChange = (ev) => {
      let newState = {...newUsr};
  
      switch (ev.target.type) {
      case 'checkbox' :
        newState[ev.target.id] = ev.targeet.checked;
        break;
      default:
        newState[ev.target.id] = ev.target.value;
      }
      setNewUsr(newState);
    }

    let formValid = () => {
      let s = newUsr;
  
      return s.email && s.lastName && s.password
       && s.password == s.passwordTwo
       && s.termsAccepted;
    }

    return (
      <div className="container">
         <Form>
           <Form.Row>
             <Form.Group as={Col} controlId="firstName">
               <Form.Label>First Name</Form.Label>
               <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUsr.firstName}
                onChange={handleChange}
                required
               />
             </Form.Group>
             <Form.Group as={Col} controlId="lastName">
               <Form.Label>Last Name</Form.Label>
               <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUsr.lastName}
                onChange={handleChange}
                required
               />
             </Form.Group>
             <Form.Group as={Col} controlId="role">
               <Form.Label>Role in school</Form.Label>
               <Form.Control
                as="select"
                placeholder="Select role"
                value={newUsr.role}
                onChange={handleChange}
                required
               >
                 <option value="Student">Student</option>
                 <option value="Teacher">Teacher</option>
               </Form.Control>
             </Form.Group>
           </Form.Row>
           <Form.Group controlId="email">
              <Form.Label>Enter email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={newUsr.email} 
                onChange={handleChange} 
                required
              />
           </Form.Group>
           <Form.Row>
             <Form.Group as={Col} controlId="password">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newUsr.password}
                  onChange={handleChange}
                  required
                  help="Use between 6-20 characters with a mix of letters, numbers and symbols"
                />
             </Form.Group>
             <Form.Group as={Col} controlId="passwordTwo">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  value={newUsr.passwordTwo}
                  onChange={handleChange}
                  required
                />
             </Form.Group>
           </Form.Row>
           <Form.Text id="passwordHelpBlock" muted>
              Use between 6-20 characters with a mix of letters, numbers and symbols
           </Form.Text>
        </Form>
        <Button variant="primnary" onClick= {() => submit()}
          >
            Submit
        </Button>
      </div>
   )
}

  

  

  // const [name, onChangeName] = useState('');
  // const [email, onChangeEmail] = useState('');
  // const [password, onChangePassword] = useState('');
  // const [repeatPassword, onChangeRepeatPassword] = useState('');
  // //const [userType, onChangeUserType] = usestate('');

  // const [invalidMessage, setInvalidMessage] = useState(null);

  // const signUp = async () => {
  //   const validPassword = password.length > 5 && (password === repeatPassword);
  //   if (validPassword) {
  //     setInvalidMessage(null);
  //     Auth.signUp({
  //       username: email,
  //       password,
  //       attributes: {
  //         email, // optional
  //         name,
  //       },
  //       validationData: [], // optional
  //     })
  //       .then((data) => {
  //         console.log(data);
  //         console.log('navigation: ', navigation);
  //         navigation.navigate('Confirmation', { email });
  //       })
  //       .catch((err) => {
  //         if (err.message) {
  //           setInvalidMessage(err.message);
  //         }
  //         console.log(err);
  //       });
  //   } else {
  //     setInvalidMessage('Password must be equal and have greater lenght than 6.');
  //   }
  // };

  // return (
  //   <div className="container">
  //     <Form>
  //       <Form.Row>
  //         <Form.Group as={Col} controlId="formFirstName">
  //           <Form.Label>First Name</Form.Label>
  //           <Form.Control placeholder = "Enter first Name" 
  //             id="firstName"
  //             type="text"
  //             value={name} 
  //             onChange={handleChange}
  //             required={true}
  //           />
  //         </Form.Group>
  //         <Form.Group as={Col} controlId="formLastName" >
  //           <Form.Label>Last Name</Form.Label>
  //           <Form.Control placeholder = "Last Name"/>
  //         </Form.Group>
  //         <Form.Group as={Col} controlId="formTorS">
  //           <Form.Label>Role</Form.Label>
  //           <Form.Control
  //             as="select"
  //             id="teacherorstudent"
  //             custom
  //           >
  //             <option value="0">Student</option>
  //             <option value="1">Teacher</option>  
  //           </Form.Control>
  //         </Form.Group>
  //       </Form.Row>
  //       <Form.Group controlId="formEmail">
  //         <Form.Label>Email address</Form.Label>
  //         <Form.Control 
  //           value={email} 
  //           type="email" 
  //           placeholder="Enter email" 
  //           onChange={(text) => onChangeEmail(text)} 
  //         />
  //       </Form.Group>
  //       <Form.Row>
  //         <Form.Group as={Col} controlId="formPassword">
  //           <Form.Label>Password</Form.Label>
  //           <Form.Control 
  //             value={password} 
  //             type="password" 
  //             palceholder="Password" 
  //             onChange={(text) => onChangePassword(text)} 
  //             aria-describedby="passwordHelpBlock"  
  //           />
  //         </Form.Group>
  //         <Form.Group as={Col} controlId="formRepeatPassword">
  //           <Form.Label>Confirm</Form.Label>
  //           <Form.Control 
  //             value={repeatPassword}
  //             type="password"
  //             palceholder="Password" 
  //             onChange={(text) => onChangeRepeatPassword(text)} 
  //           />
  //         </Form.Group>
  //       </Form.Row>
  //       <Form.Text id="passwordHelpBlock" muted>
  //         Use between 6-20 characters with a mix of letters, numbers and symbols
  //       </Form.Text>
  //       <Button 
  //         type="submit" 
  //         onPress={() => signUp()}
  //         variant="outline-dark"
  //       >Submit</Button>
  //     </Form>
  //   </div>
  // );
