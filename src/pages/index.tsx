import Calendar from "@/components/Calendar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Restaurant Booking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calendar />
      </main>
    </>
  );
}
