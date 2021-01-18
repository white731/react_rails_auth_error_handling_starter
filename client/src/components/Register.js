import { useState, useContext, useEffect } from "react";
import AuthProvider, { AuthContext } from "../providers/AuthProvider";
import { Form, Header } from "semantic-ui-react";

const Register = (props) => {
  const [email, setEmail] = useState("testy@test.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("Mr. Test");
  const [passwordConfirm, setPasswordConfirm] = useState("123456");
  // const [loading, setLoading] = useState(false);

  const { handleRegister, loading, authError, setAuthError } = useContext(
    AuthContext
  );

  const handleSubmit = () => {
    if (password === passwordConfirm) {
      // handleRegister({ email, password, name }, props.history, setLoading);
      handleRegister({ email, password, name }, props.history);
    } else {
      alert("Passwords do not match, try again.");
    }
  };
  useEffect(() => {
    setAuthError(null);
  }, []);

  const checkAuthError = () => {
    if (authError) {
      return authError.map((err) => {
        return <p style={{ color: "red" }}>* {err}</p>;
      });
    }
  };

  return (
    <>
      <Header as="h1" textAlign="center">
        Register
      </Header>
      {checkAuthError()}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          autoFocus
          name="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></Form.Input>
        <Form.Input
          required
          autoFocus
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></Form.Input>
        <Form.Input
          required
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></Form.Input>
        <Form.Input
          required
          name="passwordConfirm"
          label="Confirm Password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        ></Form.Input>
        <Form.Button primary loading={loading} disabled={loading} type="submit">
          Register
        </Form.Button>
      </Form>
    </>
  );
};

export default Register;
