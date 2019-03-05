import axios from "axios";


const instance = axios.create({
    baseURL: "https://react-my-burger-5ab22.firebaseio.com/"
});


export default instance;