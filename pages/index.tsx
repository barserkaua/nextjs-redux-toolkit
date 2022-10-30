import Head from "next/head";

import { UsersList } from "../app/components/usersList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Random user app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UsersList />
      </main>
    </div>
  );
}
