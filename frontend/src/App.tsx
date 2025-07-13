import { Fragment, useState, type JSX } from 'react'
import { ethers } from 'ethers'
import SimpleContract from './contracts/SimpleContract.json'

export const App = (): JSX.Element => {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deployContract = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        alert("Zainstaluj Metamask");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.JsonRpcProvider(window.ethereum);
      const signer = await provider.getSigner();

      const factory = new ethers.ContractFactory(
        SimpleContract.abi,
        SimpleContract.bytecode,
        signer
      );

      const contract = await factory.deploy();
      await contract.waitForDeployment();
      const address = await contract.getAddress()

      setContractAddress(address);
      console.log("Contract deployed at:", address);
    } catch (error) {
      console.error("Deploy error:", error);
      alert("Deploy nieudany, sprawdź konsolę.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h1>Hello</h1>
      <button onClick={deployContract} disabled={loading}>
        {loading ? "Deploying..." : "Deploy Contract"}
      </button>

      {contractAddress && (
        <p>
          Contract deployed at: <strong>{contractAddress}</strong>
        </p>
      )}
    </Fragment>
  )
}
