import dns from "node:dns"
dns.setServers(['8.8.8.8', '8.8.4.4'])

import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("webapp");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "buyer",
      },
      plan: {
        defaultValue: "free",
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: jwt,
      maxAge: 8 * 24 * 60 * 60
    }
  },
  plugins: [
    jwt(),
  ]
});