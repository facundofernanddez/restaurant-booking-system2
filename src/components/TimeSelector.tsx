import { Listbox } from "@headlessui/react";

interface TimeSelectorProps {
  changeTime: (time: string, type: "openTime" | "closeTime") => void;
  type: "openTime" | "closeTime";
  selected: string | undefined;
}

const timeOptions: string[] = [];
for (let i = 5; i < 24; i++) {
  for (let j = 0; j < 60; j++) {
    timeOptions.push(
      `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`,
    );
  }
}
export default function TimeSelector({
  selected,
  changeTime,
  type,
}: TimeSelectorProps) {
  if (!selected) return <p>none selected</p>;

  if (type === "openTime") selected = selected.padStart(5, "0");

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        if (type === "openTime") e = e?.replace(/^0/, "");

        changeTime(e, type);
      }}
    ></Listbox>
  );
}
