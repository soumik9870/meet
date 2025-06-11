import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your drizzle schema

const requireEnv = (key: string) => {
    const v = process.env[key];
    if (!v) throw new Error(`Missing required env var ${key}`);
    return v;
};


export const auth = betterAuth({

    socialProviders: {
        github: {
            clientId: requireEnv("GITHUB_CLIENT_ID"),
            clientSecret: requireEnv("GITHUB_CLIENT_SECRET"),

        },
        google: {
            clientId: requireEnv("GOOGLE_CLIENT_ID"),
            clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...schema,
        }
    })
});