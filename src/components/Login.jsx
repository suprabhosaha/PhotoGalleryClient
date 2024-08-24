import { jwtDecode } from "jwt-decode";
import { replace, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from '../assets/logo.png';
import { client } from "../client";

const Login = () => {

    const navigate = useNavigate();

    const responseMessage = (response) => {

        const credentialDecoded = jwtDecode(response.credential);

        localStorage.setItem('user', JSON.stringify(credentialDecoded));

        const name = credentialDecoded.given_name.toString();
        const imageURL = credentialDecoded.picture.toString();
        const googleId = credentialDecoded.sub.toString();

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageURL
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        })
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return ( 
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="w-full h-full relative">
                <video 
                src={ shareVideo } 
                muted 
                autoPlay 
                controls={ false } 
                loop
                className="w-full h-full object-cover"></video>
            </div>
            <div className="flex flex-col absolute items-center justify-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
                <div>
                    <img src={ logo } alt="logo" width="130 px" />
                </div>
                <div className="shadow-2xl">
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </div>
     );
}
 
export default Login;