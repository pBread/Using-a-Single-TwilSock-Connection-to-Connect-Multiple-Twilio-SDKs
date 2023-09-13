import { Client as ConversationsClient } from "@twilio/conversations";
import { useEffect } from "react";
import { SyncClient } from "twilio-sync";
import { TwilsockClient } from "twilsock";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return; // prevent clients from connecting on server

    initializeClients();
  }, []);

  return (
    <main>
      <div>Home</div>
    </main>
  );
}

async function initializeClients() {
  console.log("Fetch access tokens (starting)");
  const tokenResult = await fetch("/api/tokens").then((res) => res.json());
  console.log("Fetch access tokens (finished)", tokenResult);

  // initialize a shared TwilsockClient
  const twilsockClient: any = new TwilsockClient(
    tokenResult.jwt,
    tokenResult.identity,
    {}
  );
  twilsockClient.on("connected", () => {
    console.log("twilsockClient connected");
  });

  // initialize SyncClient
  const syncClient = new SyncClient(tokenResult.jwt, {
    twilsockClient,
  });
  syncClient.on("connectionStateChanged", (state) => {
    console.log("syncClient connectionStateChanged", state);
  });

  // initialize ConversationsClient
  const conversationsClient = new ConversationsClient(tokenResult.jwt, {
    twilsockClient,
  });
  conversationsClient.on("initialized", () => {
    console.log("conversationsClient initialized");
  });

  twilsockClient.connect();
}
