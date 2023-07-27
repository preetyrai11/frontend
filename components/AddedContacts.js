import styles from '../src/styles/Home.module.css';
export default function TxList({ txs }) {
    if (txs.length === 0) return null;
    return (
      <>
        {txs.map((item) => (
          <div key={item.txHash} className={styles.form}>
            <div>
              <p>ContactId: {item.contactId}</p>
              <p>SenderAddress: {item.sender}</p>
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>phone number: {item.phonenumber}</p>
              <p>Created At: {item.createdAt}</p>
              
            </div>
          </div>

        ))}
      </>
    );
  }
  