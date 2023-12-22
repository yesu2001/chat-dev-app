import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "@/lib/helpers";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@gamil.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("email", credentials.email);
          if (error) {
            console.log("erorr while geting the email", error);
            throw new Error(`error: ${error}`);
          }
          if (data) {
            console.log("data", data);
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              data[0].password
            );
            console.log("password is correct?", isPasswordCorrect);
            if (isPasswordCorrect) {
              console.log("password is correct");
              return data[0];
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("email", user.email);
          if (error) {
            console.log("error when gfetching the user", error);
            throw new Error(`error :- ${error}`);
          }
          if (data) {
            console.log("user data from the db", data);
          }
          if (data.length === 0) {
            const newUser = {
              id: user?.id,
              name: user?.name,
              bio: "",
              image: user?.image,
              email: user?.email,
              password: "",
            };
            const { data, error } = await supabase
              .from("profiles")
              .insert(newUser)
              .select();
            if (error) {
              console.log("error saving to db", error);
              return false;
            }
            return data[0];
          }
          return data[0];
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async session({ session, token, user }) {
      session.expires = session?.expires;
      session.accesstoken = token?.accesstoken;
      session.user = token.user;
      return Promise.resolve(session);
    },
    async jwt({ token, account, profile, user }) {
      if (account?.type === "credentials") {
        token.accesstoken = generateAccessToken(user?.id);
      }
      if (account?.provider === "github" || account?.provider === "google") {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
