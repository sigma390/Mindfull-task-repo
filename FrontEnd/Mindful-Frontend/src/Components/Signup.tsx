import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config.ts";
import {useNavigate} from "react-router-dom";


function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome Admin. Login below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}

                    
                />
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async() => {
                        const response = await axios.post(`${BASE_URL}/user/login`, {
                            email: email,
                            password: password
                        })
                        const data = response.data;
                        localStorage.setItem("token", data.token);
                        navigate("/users")
                    }}

                > Signup</Button>
            </Card>
        </div>
    </div>
}

export default Signup;