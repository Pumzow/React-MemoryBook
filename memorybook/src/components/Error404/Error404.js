import { Link } from "react-router-dom";

const Error404 = () =>{
    return (
        <section className="Error404">
            <h1 className="Error404-Title"> Page not found! </h1>
            <p>Return To <Link className="Error404-Link" to="/home"> Home</Link> Page</p>
        </section>
    )
}

export default Error404;