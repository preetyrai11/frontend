import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export const addNewContact = (req, res) => {
 
    let newContact = new Contact(req.body);

    await connectDB();

    newContact.save((err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};





































