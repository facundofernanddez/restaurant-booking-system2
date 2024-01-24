import Calendar from "@/components/Calendar";
import Menu from "@/components/Menu";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";
import type { DateType } from "@/utils/types";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) checkMenuStatus();
  }, [date]);

  const { mutate: checkMenuStatus, isSuccess } =
    api.menu.checkMenuStatus.useMutation();

  return (
    <>
      <Head>
        <title>Restaurant Booking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!date.dateTime && <Calendar setDate={setDate} date={date} />}
        {date.dateTime && isSuccess ? (
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
