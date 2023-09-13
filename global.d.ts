export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_ACCOUNT_SID: string;
      TWILIO_API_KEY: string;
      TWILIO_API_SECRET: string;

      CONVERSATION_SVC_SID: string;
      SYNC_SVC_SID: string;
    }
  }
}
