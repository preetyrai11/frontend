
import { getSession, signOut } from 'next-auth/react';
import Users from "../lib/userSchema";
import connectDB from "../lib/connectDB";
import { useState } from "react";
import axios from "axios";

export default function User({}) {


    const [value, changeValue] = useState("New Bio");

    async function createContact(){
        const {data} = await axios.post(
            "/contact/new",
            { name: user.profileId, email: value, phoneNumber: value },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );

          console.log("Bio created to: " + data.bio)

          
    }

   

    return (
        <div>
            <h4>Name: {name}</h4>
            <div>email: {user.address}</div>
            <div>PhoneNumber: {bio}</div>
            <br/>
            <input
                onChange={(e) => changeValue(e.target.value)}
                value={value}
            ></input>
            <button onClick={() => createContact()}>Create Contact </button>
            
            
        </div>
    );
}







