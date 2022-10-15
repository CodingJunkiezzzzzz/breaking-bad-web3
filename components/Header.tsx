import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import Link from "next/link";
export function Header() {
  const { connectWallet, address, error, disconnectWallet } = useWeb3();
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: error.name,
        text: error.message,
      });
    }
  }, [error]);
  return (
    <div className="d-flex justify-content-between py-4">
      <Link href="/">Breaking Bad Characters</Link>
      {!address ? (
        <Button
          onClick={() => connectWallet("injected")}
          variant="dark"
          className="d-flex align-items-center gap-2"
        >
          <img
            alt="Metamask Logo"
            src="/metamask.svg"
            width={32}
            height={32}
          ></img>
          <span>Login with MetaMask</span>
        </Button>
      ) : (
        <div className="d-flex flex-column justify-content-end align-items-end">
          <strong>Logged in ETH address</strong>
          <span>{address}</span>
          <Button
            onClick={disconnectWallet}
            variant="dark"
            className="d-flex align-items-center gap-2"
          >
            <span>Reconnect</span>
          </Button>
        </div>
      )}
    </div>
  );
}
