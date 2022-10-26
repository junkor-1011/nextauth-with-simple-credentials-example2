import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login-test",
      name: "Username & Password",
      authorize: async (credentials, _req) => {
        // DANGER: 現状のauthorizeの中身は全面的に改める必要あり
        // →ここでは概要・実現性の確認さえ出来れば良いため、実用上必要な考慮や処理を省略したり、敢えてアンチパターンな処理を入れている
        const allowedCredentials = { // UNSECURE CODE: JUST FOR TEST ONLY
          'user': 'p@ssword',
          'dummy': ')-v-(',
          'pochi': 'Vow!',
          'hachi-kou': 'inu_'
        }

        const username = credentials?.username;
        const password = credentials?.password;

        // 認証に失敗した場合はnullを返す
        if (!username || !Object.keys(allowedCredentials).includes(username))
          return null;
        else {
          const usernameTyped = username as keyof typeof allowedCredentials
          if (allowedCredentials[usernameTyped] !== password)
            return null;
        }

        const { createHmac } = await import('node:crypto') // TMP
        const hmac = createHmac('sha256', username) // TMP
        const user = {
          name: username,
          id: hmac.digest('hex'), // TMP
          email: `${username}@example.com`,
          image: null,
        };
        return user;
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: `password` },
      },
    }),
  ],
  debug: true,
  callbacks: {
    async session({
      session,
      token,
      // user,
    }): Promise<Session> {
      // console.log('session', session)
      // console.log('token', token)

      const sessionNew = {
        ...session,
        customKey1: token?.customKey1,
        customKey2: token?.customKey2,
        customKey3: token?.customKey3,
        customKey4: token?.customKey4,
      };

      return sessionNew;
    },
    async jwt({
      token,
      // account,  // 外部プロバイダーを使っていないので空
      // profile,  // 外部プロバイダーを使っていないので空
    }) {
      // console.log('token', token)
      // console.log('account', account)
      // console.log('profile', profile)

      // TMP
      console.log(token)
      const name = token?.name;
      const dummyProp = (() =>{
        if (name === 'user') return 'nemimini mimizu'
        if (name === 'dummy') return 'foo bar baz'
        if (name === 'pochi') return 'Meow!!!'
        if (name === 'hachi-kou') return 'moai'

        return 'unexpected error occurred.'
      })();

      const tokenNew = {
        ...token,
        customKey1: "test string",
        customKey2: "dummy value",
        customKey3: (new Date()).toISOString(),
        customKey4: dummyProp,
      };

      return tokenNew;
    },
  },
}
export default authOptions;
