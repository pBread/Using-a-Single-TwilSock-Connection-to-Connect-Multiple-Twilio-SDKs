require("dotenv").config();
const fs = require("fs");

const twilio = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

const client = twilio(TWILIO_API_KEY, TWILIO_API_SECRET, {
  accountSid: TWILIO_ACCOUNT_SID,
});

async function main() {
  console.log("Starting script");

  console.log("Creating Conversation Service");
  const conversationSvcSid = await client.conversations.v1.services
    .create({
      friendlyName: "Multiple TwilSock Demo Service",
    })
    .then((conversationSvc) => conversationSvc.sid);
  console.log("Created Conversation Service");

  console.log("Writing CONVERSATION_SVC_SID to .env");
  updateEnvFile("CONVERSATION_SVC_SID", conversationSvcSid);
  console.log("CONVERSATION_SVC_SID added to .env");

  console.log("Creating Sync Service");
  const syncSvcSid = await client.sync.v1.services
    .create({
      friendlyName: "Multiple TwilSock Demo Service",
    })
    .then((syncSvc) => syncSvc.sid);

  console.log("Writing SYNC_SVC_SID to .env");
  updateEnvFile("SYNC_SVC_SID", syncSvcSid);
  console.log("SYNC_SVC_SID added to .env");
}

main();

/****************************************************
 Utilities
****************************************************/
function updateEnvFile(key, value) {
  const envFilePath = ".env";
  let envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, "utf8")
    : "";

  const envKeyPattern = new RegExp(`^${key}=(.*)$`, "m");

  if (envContent.match(envKeyPattern)) {
    // Replace the existing key-value
    envContent = envContent.replace(envKeyPattern, `${key}=${value}`);
  } else {
    // Append the new key-value
    envContent += `\n${key}=${value}\n`;
  }

  fs.writeFileSync(envFilePath, envContent, "utf8");
}
