import { ChangeEvent, FormEvent, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { SigninService } from "../../services";
import { LocalStorageUtil } from "../../utils";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState<{ email: string; password: "" }>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const emailInput = (event.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const passwordInput = (event.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    await SigninService.signIn({
      email,
      password,
    })
      .then((res: { accessToken: string; refreshToken: string }) => {
        LocalStorageUtil.save("token", res.accessToken);
        LocalStorageUtil.save("refreshToken", res.refreshToken);
        navigate("/dashboard", { replace: true });
      })
      .catch((err: any) => {
        console.log(err);
      });

    setLoading(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Pos Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="email"
          name="email"
          error={true}
          value={formData.email}
          onChange={handleChange}
          helperText={"shsjs"}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signin;
