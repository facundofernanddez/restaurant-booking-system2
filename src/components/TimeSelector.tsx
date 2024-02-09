import { classNames } from "@/utils/helpers";
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
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block w-32 text-sm font-medium text-gray-700">
            {type === "openTime" ? "Opening time" : "Closing time"}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span
                  aria-label={true ? "Online" : "Offline"}
                  className={classNames(
                    true ? "bg-green-400" : "bg-gray-200",
                    "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                  )}
                />
                <span className="ml-2 block truncate">{selected}</span>
              </div>
            </Listbox.Button>
          </div>
        </>
      )}
    </Listbox>
  );
}
