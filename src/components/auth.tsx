import React from 'react';
import { signIn, useSession } from 'next-auth/react';

const SignIn: React.FC = () => (
  <div>
    <h1>Not Autenticated</h1>
    <div>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >Sign In</button>
    </div>
  </div>
)

export const NeedAuthentication: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') return (
    <div>{'loading...'}</div>
  )
  if (status === 'unauthenticated') return (
    <SignIn />
  )

  return <>{children}</>
}
