import { useState } from "react";

import {
  ChakraProvider,
  Text,
  Center,
  Button,
  Heading,
} from "@chakra-ui/react";

import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { ethers } from "ethers";

export default function App() {
  const [address, setAddress] = useState("");

  const magic = new Magic("pk_live_A14EC0EC47BFE1EA", {
    network: "rinkeby",
    locale: "pt",
    extensions: [new ConnectExtension()],
  });

  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  const handleLogin = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log(address);

    setAddress(address);
  };

  const showWallet = () => {
    magic.connect.showWallet().catch((e) => {
      console.log(e);
    });
  };

  const handleLogout = async () => {
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAddress("");
  };

  return (
    <ChakraProvider>
      <Center bg="gray.600" flex={1} h="100vh" flexDirection="column">
        <Heading color="gray.100" fontSize="2xl" pb={8}>
          🪄 Magic Link Wallet 🧙‍♂️✨
        </Heading>
        {address && (
          <Text color="gray.100" fontSize="lg" mb={6} px={8}>
            Address: {address}
          </Text>
        )}

        {!address ? (
          <Button
            onClick={handleLogin}
            bg="green.700"
            h={12}
            w={"20%"}
            fontSize="sm"
            rounded="sm"
            mb={8}
            _pressed={{
              bg: "green.500",
            }}
          >
            <Heading color="white" fontSize="lg">
              Login
            </Heading>
          </Button>
        ) : (
          <>
            <Button
              onClick={showWallet}
              bg="orange.700"
              h={12}
              w={"20%"}
              mb={8}
              fontSize="sm"
              rounded="sm"
              _pressed={{
                bg: "green.500",
              }}
            >
              <Heading color="white" fontSize="lg">
                Show Wallet
              </Heading>
            </Button>
            <Button
              onClick={handleLogout}
              bg="orange.700"
              h={12}
              w={"20%"}
              fontSize="sm"
              rounded="sm"
              _pressed={{
                bg: "green.500",
              }}
            >
              <Heading color="white" fontSize="lg">
                Log Out
              </Heading>
            </Button>
          </>
        )}
      </Center>
    </ChakraProvider>
  );
}
