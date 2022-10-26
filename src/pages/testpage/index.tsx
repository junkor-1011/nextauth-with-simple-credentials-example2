import type { NextPage } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { getServerSidePropsWithAuth, PageWithAuthType } from '@/lib/next/get-page-props'

export const getServerSideProps = getServerSidePropsWithAuth

const Page: NextPage<PageWithAuthType> = ({ session }) => (
  <div>
    <Header session={session} />
    <div>
      <h1>test page</h1>
      <p>
        <Link href="/">
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            back to Home
          </span>
        </Link>
      </p>
    </div>
  </div>
)
export default Page
