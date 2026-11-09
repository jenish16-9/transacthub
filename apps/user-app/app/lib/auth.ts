import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .length(10, "Phone number must be 10 digits"),
  password: z.string().min(1, "Password is required"),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined,
      ) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials");
        }

        const { phone, password } = parsedCredentials.data;

        const existingUser = await db.user.findFirst({
          where: { number: phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password,
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await db.user.create({
            data: { number: phone, password: hashedPassword },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (token && session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
