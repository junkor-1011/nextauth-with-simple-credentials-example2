import { NextPage } from 'next'
import { signIn } from 'next-auth/react';

const LoginPage: NextPage = () => (
  <>
    <h1>Login Page</h1>
    <div>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signIn(undefined, { callbackUrl: '/' });
        }}
      >Sign In</button>
    </div>
  </>
)
export default LoginPage
