import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/Login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const payload = await response.json();
        console.log(payload);

        if (payload.message === "success") {
          const decodedtoken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodedtoken.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || " signin failed");
        }
     
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
      }
      return token;
    },
     async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
