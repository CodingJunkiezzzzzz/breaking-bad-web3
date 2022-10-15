import { PropsWithChildren } from "react";
import { useWeb3 } from "@3rdweb/hooks";

export default function Connected({ children }: PropsWithChildren) {
  const { address } = useWeb3();
  return address && children ? (
    children
  ) : (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h1>Please connect your wallet</h1>
    </div>
  );
}
