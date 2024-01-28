"use client";

import ReactCalendar from "react-calendar";
import { format, formatISO, isBefore, parse } from "date-fns";
import { INTERVAL, now } from "@/constants/config";
import type { Day } from "@prisma/client";
import { useEffect, useState } from "react";
import type { DateType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { getOpeningTimes, roundToNearestMinutes } from "@/utils/helpers";

interface CalendarProps {
  days: Day[];
  closedDays: string[];
}

export default function Calendar({ days, closedDays }: CalendarProps) {
  const router = useRouter();

  const today = days.find((d) => d.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, INTERVAL);
  const closing = parse(today!.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);

  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem("selectedTime", date.dateTime.toISOString());
      router.push("/menu");
    }
  }, [date.dateTime, router]);

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, index) => (
            <div key={`time-${index}`} className="rounded-sm bg-gray-100 p-2 ">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="react-calendar p-2"
          view="month"
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
}
