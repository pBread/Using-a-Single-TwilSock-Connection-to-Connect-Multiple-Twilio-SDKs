This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```
npm install twilsock
```

## Getting Started

### Prepare .env

Run this command to prepare the .env file

```bash
cp env.example .env
```

### Add ACCOUNT_SID to .env file

Log into your Twilio Console, copy the Account SID on the home page, and add it to your .env file as ACCOUNT_SID

### Create API Key

1. (Create an API key in the Twilio Console)[https://www.twilio.com/console/runtime/api-keys] or via the (Twilio REST API)[https://www.twilio.com/docs/iam/keys/api-key]
2. Add API Key & Secret to .env

### Create Conversation Service & Sync Service

This demo will need a Conversation Service and Sync Service. You can create these yourself then then add the CONVERSATION_SVC_SID & SYNC_SVC_SID to the .env file.

Or, you can simply run this script, which will do it for you.

```bash
node run ./scripts/create-services.js
```

###
