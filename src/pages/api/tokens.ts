// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as Twilio from "twilio";

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,

  CONVERSATION_SVC_SID,
  SYNC_SVC_SID,
} = process.env;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ identity: string; jwt: string }>
) {
  const identity = "user@example.com";

  const AccessToken = Twilio.jwt.AccessToken;
  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    { identity }
  );

  const ChatGrant = Twilio.jwt.AccessToken.ChatGrant;
  const chatGrant = new ChatGrant({ serviceSid: CONVERSATION_SVC_SID });
  token.addGrant(chatGrant);

  const SyncGrant = Twilio.jwt.AccessToken.SyncGrant;
  const syncGrant = new SyncGrant({ serviceSid: SYNC_SVC_SID });
  token.addGrant(syncGrant);

  res.status(200).json({ identity, jwt: token.toJwt() });
}
