import Calendar from "@/components/Calendar";
import { db } from "@/server/db";
import type { Day } from "@prisma/client";
import { formatISO } from "date-fns";
import Head from "next/head";

interface HomeProps {
  days: Day[];
  closedDays: string[];
}

export default function Home({ days, closedDays }: HomeProps) {
  return (
    <>
      <Head>
        <title>Restaurant Booking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calendar days={days} closedDays={closedDays} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const days = await db.day.findMany();
  const closedDays = (await db.closedDay.findMany()).map((day) =>
    formatISO(day.date),
  );

  return { props: { days, closedDays } };
}
