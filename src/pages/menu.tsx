import Menu from "@/components/Menu";
import Spinner from "@/components/Spinner";
import { now } from "@/constants/config";
import { api } from "@/utils/api";
import { parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const router = useRouter();

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { isFetchedAfterMount } = api.menu.checkMenuStatus.useQuery(undefined, {
    onError: () => {},
  });

  useEffect(() => {
    const selectedTime = localStorage.getItem("selectedTime");
    if (!selectedTime) router.push("/");
    else {
      const date = parseISO(selectedTime);
      if (date < now) router.push("/");

      setSelectedTime(selectedTime);
    }
  }, []);

  return (
    <>
      {isFetchedAfterMount && selectedTime ? (
        <>
          <button onClick={() => router.push("/")}>
            Back to time selection
          </button>
          <Menu selectedTime={selectedTime} />
        </>
      ) : (
        <>
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        </>
      )}
    </>
  );
}