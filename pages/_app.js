import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { UseWalletProvider } from 'use-wallet'

function MyApp({ Component, pageProps }) {
  return (
    <UseWalletProvider
      chainId={56}
      connectors={{
        // This is how connectors get configured
        portis: { dAppId: 'my-dapp-id-123-xyz' },
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UseWalletProvider>  
  )
}

export default MyApp
