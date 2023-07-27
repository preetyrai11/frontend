import Head from 'next/head.js';

import Header from '../../components/header.js';
import Main from '../../components/main.js'
import styles from '../styles/Home.module.css';



import { createClient, configureChains, mainnet, WagmiConfig } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { InjectedConnector } from 'wagmi/connectors/injected'

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import ProfileList from '../../components/profile/ProfileList.js';
import ContactList from '../../components/ContactList.js';
// import ProfileList from '../../components/profile/ProfileList.js';



const { chains, provider } = configureChains([mainnet], [publicProvider()])

 

const client = createClient({

  connectors: [

    new InjectedConnector({ chains }),

    new WalletConnectConnector({

      chains,

      options: {

        projectId: '...',

      },

    }),

  ],

  provider,

})

export default function Home({ Component, pageProps }) {

  return (

    <WagmiConfig client={client}>

      {/* <Component {...pageProps} /> */}
      <section className={styles.main}>
        <Head>
           <title><h2>Contact Details</h2></title>
         </Head>
         <Header />
         <Main />
         <ContactList />
       </section>

  </WagmiConfig>

)}































