import { unstable_getServerSession } from 'next-auth/next'
import authOptions from '@/lib/auth/config';

import type { GetServerSidePropsContext } from 'next'
import type { Session } from 'next-auth'

export const getServerSession = async (context: GetServerSidePropsContext): Promise<Session | null> => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return null
  }

  return session
}
