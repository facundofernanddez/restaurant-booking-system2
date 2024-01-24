import Calendar from "@/components/Calendar";
import Menu from "@/components/Menu";
import Spinner from "@/components/Spinner";
import type { DateType } from "@/utils/types";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  return (
    <>
      <Head>
        <title>Restaurant Booking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!date.dateTime && <Calendar setDate={setDate} date={date} />}
        {date.dateTime && false ? (
          <Menu />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
}
