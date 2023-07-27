import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import styles from '../src/styles/Home.module.css';
import AddedContacts from './AddedContacts';


let contactDetailsABI=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"contactId","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"email","type":"string"},{"indexed":false,"internalType":"string","name":"phoneNumber","type":"string"},{"indexed":false,"internalType":"uint256","name":"createdAt","type":"uint256"}],"name":"ContactAdded","type":"event"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phoneNumber","type":"string"}],"name":"addContact","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"contactId","type":"uint256"}],"name":"deleteContact","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"contactId","type":"uint256"}],"name":"getContact","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phoneNumber","type":"string"},{"internalType":"uint256","name":"createdAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContactCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

export default function ContactList(){

    const [contracInfo, setContractInfo] = useState();
    const [txs, setTxs] = useState([]);
    const [contractListened, setContractListened] = useState();

    
   async function main() {
      const rpc = 'kMHcyurpt4i3uPv5sysjQi41qQEKoVKIXaxXBxyHTPpXPhUdgBSNCcaYfMTXMy8B';
      const PRIVATE_KEY = `774899b0ac5fa5cdf9323b74d587d0f95a6cae8711eee12ceb007b168a3192ea`;
      const pro = new ethers.providers.JsonRpcProvider(rpc);
      const wallet = new ethers.Wallet(PRIVATE_KEY, pro);
      const contractAddress="0x0A94c8519422750CD887eB69cd3E158645966E91";
      setContractInfo(contractAddress);
      const contactContract = new ethers.Contract(
        contractAddress,
        contactDetailsABI,
        wallet 
      );

      contactContract.on("ContactAdded", (contactId, sender, name, email, phoneNumber, createdAt, event) => {
        console.log({ contactId, sender, name, email, phoneNumber, createdAt, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            contactId,
            sender,
            name,
            email,
            phoneNumber: String(phoneNumber),
            createdAt
          }
        ]);
      });
      setContractListened(contactContract);

      return () => {
        contractListened.removeAllListeners();
      };
      
   }
   

   useEffect(() => {
    main() 
   }, [])



   

 

  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(0x0A94c8519422750CD887eB69cd3E158645966E91, contactDetailsABI, signer);
    await erc20.addContact(data.get("name"), data.get("email"), data.get("phonenumber"));
  };

  

   return (
    
        <div className={styles.container}>
          <div>
              
                <h1>
                  Add Contact
                </h1>
    
                <form className={styles.form} onSubmit={handleTransfer}>
                  <div className="my-3">
                    <input
                      type="text"
                      name="name"
                      className={styles.fillform}
                      placeholder="Name of user"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      name="email"
                      className={styles.fillform}
                      placeholder="email id"
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      name="phonenumber"
                      className={styles.fillform}
                      placeholder="phone number"
                    />
                  </div>
                  <footer className="p-4">
                    <button
                      type="submit"
                      className={styles.button}
                    >
                      Add Contact Button
                    </button>
                  </footer>
                </form>
              
            
          </div>
          <br/>
          <br/>
         
          <div className={styles.container}>
            
              <div className="textelement">
                <h1 className="">
                  Recent Contact Added
                </h1>
                <p>
                  <AddedContacts txs={txs} />
                </p>
              </div>
            
          </div>
        </div>
      
   );

}



































