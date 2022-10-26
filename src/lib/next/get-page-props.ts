import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import type { Session } from 'next-auth'
import { getServerSession } from '@/lib/auth/server-session'

export const getServerSidePropsWithAuth: GetServerSideProps<{session: Session}> = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export type PageWithAuthType = InferGetServerSidePropsType<typeof getServerSidePropsWithAuth>
