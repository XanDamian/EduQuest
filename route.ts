import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Here is where we will add the logic to find the user in the database
        // and verify their password.
        // For now, we'll return a mock user for demonstration.
        const user = { id: "1", name: "Test User", email: "test@example.com" };

        return user ? user : null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };