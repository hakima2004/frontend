// import React, { Component } from 'react';
// import axios from 'axios';

// class Llogin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       errorMessage: '',
//     };
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.get('http://localhost:8000/api/khir', {
//         email: this.state.email,
//         password: this.state.password,
//       });

//       if (response.data.status === 'success') {
//         // Login successful
//         // Handle the logic here (e.g., redirect to another page)
//         console.log('Login successful');
//       } else {
//         // Login failed
//         this.setState({ errorMessage: response.data.data });
//       }
//     } catch (error) {
//       console.error(error);
//       this.setState({ errorMessage: 'An error occurred during login' });
//     }
//   };

//   handleEmailChange = (event) => {
//     this.setState({ email: event.target.value });
//   };

//   handlePasswordChange = (event) => {
//     this.setState({ password: event.target.value });
//   };

//   render() {
//     const { email, password, errorMessage } = this.state;

//     return (
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="form-control"
//               value={email}
//               onChange={this.handleEmailChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="form-control"
//               value={password}
//               onChange={this.handlePasswordChange}
//               required
//             />
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Llogin;


import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";


export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = () => {
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/user-login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            redirect: true,
          });      
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.password,
          });
          setTimeout(() => {
            this.setState({ errMsgEmail: "", errMsgPwd: "" });
          }, 2000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "" });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      console.log(":)");
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
        console.log(":)");
    }
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Form className="containers">
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChangehandler}
            />
            <span className="text-danger">{this.state.msg}</span>
            <span className="text-danger">{this.state.errMsgEmail}</span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChangehandler}
            />
            <span className="text-danger">{this.state.errMsgPwd}</span>
          </FormGroup>
          <p className="text-danger">{this.state.errMsg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSignInHandler}
          >
            Sign In
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
        </Form>
      </div>
    );
  }
}
