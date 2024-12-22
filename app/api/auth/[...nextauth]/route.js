import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || "5694a3279a8cdf4587bee889b3fd5a75f3ca8a68a92273dceb5f2edf1d7abcbd",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your login page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the homepage after login
      return baseUrl; // This will redirect to '/'
    },
  },
};

const handler = NextAuth(authOptions);

// Named export for POST method
export { handler as POST };

// Named export for GET method if you need it (optional)
export { handler as GET };