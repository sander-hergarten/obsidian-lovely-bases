import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import { EventBar } from "./EventBar";
import { MonthGrid } from "./MonthGrid";
import type { StackedEvent } from "./utils";

type Props = {
  monthIndex: number;
  formattedMonthName: string;
  isLastMonth: boolean;
  rowHeight: number;
  daysCount: number;
  events: StackedEvent[];
  onEntryClick: EntryClickEventHandler;
};

export const MonthRow = ({
  monthIndex,
  formattedMonthName,
  isLastMonth,
  rowHeight,
  daysCount,
  events,
  onEntryClick,
}: Props) => {
  return (
    <div
      key={monthIndex}
      className={cn(
        "flex hover:bg-muted/10 transition-colors",
        !isLastMonth && "border-b border-border/60",
      )}
      style={{ minHeight: `${rowHeight}px` }}
    >
      <div className="w-32 shrink-0 font-medium p-2 py-4">
        {formattedMonthName}
      </div>
      <div className="grow relative flex">
        {/* Grid Background */}
        <MonthGrid monthIndex={monthIndex} daysCount={daysCount} />

        {/* Events Layer */}
        <div className="absolute inset-0 w-full h-full z-10 mt-1">
          {events.map((event) => (
            <EventBar
              key={`${event.id}-${monthIndex}`}
              event={event}
              monthIndex={monthIndex}
              onEntryClick={onEntryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
