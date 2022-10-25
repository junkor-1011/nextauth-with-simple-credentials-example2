import React from 'react';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

const Header: React.FC<{ session: Session }> = ({ session }) => {
  return (
    <header
      // style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>
        signin as <span style={{ color: 'blue', fontWeight: 'bold' }}>{session?.user?.name}</span>
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >sign out</button>
      </div>
      <hr />
    </header>
  )
}
export default Header
