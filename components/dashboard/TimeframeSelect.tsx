import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIMEFRAME_OPTIONS } from "@/lib/constants";

interface TimeframeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TimeframeSelect({
  value,
  onValueChange,
}: TimeframeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select timeframe" />
      </SelectTrigger>
      <SelectContent>
        {TIMEFRAME_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
