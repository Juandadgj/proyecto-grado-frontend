import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  })],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Aquí puedes definir la página a la que se redirige después de la autenticación.
      // En este ejemplo, redirige siempre a "/dashboard".
      return baseUrl + "/dashboard";
    },
  },
})

export { handler as GET, handler as POST };