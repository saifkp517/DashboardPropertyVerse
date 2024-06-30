import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Investors () {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/investors`)
        .then(res => {
            console.log(res.data);
        })
    }, [])

    return (
      <div>
        Users
      </div>
    )
  }