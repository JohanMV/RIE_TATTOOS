import { useEffect, useId, useRef, useState } from "react";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "react-day-picker/style.css";

const timeOptions = Array.from({ length: 11 }, (_, index) => {
  const hour = index + 9;
  const displayHour = hour > 12 ? hour - 12 : hour;
  return {
    value: `${String(hour).padStart(2, "0")}:00`,
    label: `${displayHour}:00 ${hour < 12 ? "AM" : "PM"}`,
  };
});

interface DateTimePickerProps {
  error?: string;
  onChange: (value: string) => void;
}

function isSameDay(first: Date, second: Date) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

function toDateTimeValue(date: Date, time: string) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T${time}`;
}

export function DateTimePicker({ error, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerId = useId();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const noTimesLeftToday = now.getHours() >= 19;

  const timeIsUnavailable = (time: string, date = selectedDate) => {
    if (!date || !isSameDay(date, today)) return false;
    return Number(time.slice(0, 2)) <= now.getHours();
  };

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const selectDate = (date: Date | undefined) => {
    if (!date) return;
    const nextTime = selectedTime && !timeIsUnavailable(selectedTime, date) ? selectedTime : "";
    setSelectedDate(date);
    setSelectedTime(nextTime);
    onChange(nextTime ? toDateTimeValue(date, nextTime) : "");
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && time) {
      onChange(toDateTimeValue(selectedDate, time));
      setOpen(false);
    } else {
      onChange("");
    }
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
    : "Selecciona fecha y hora";
  const timeLabel = timeOptions.find((option) => option.value === selectedTime)?.label;

  return (
    <div className="date-time-picker" ref={pickerRef}>
      <button
        type="button"
        className={`date-time-trigger${error ? " has-error" : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={pickerId}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{dateLabel}{timeLabel ? `, ${timeLabel}` : ""}</span>
        <span className="date-time-icons" aria-hidden="true"><CalendarBlank size={17} /><CaretDown size={14} /></span>
      </button>

      {open && (
        <div id={pickerId} className="date-time-popover" role="dialog" aria-label="Seleccionar fecha y hora">
          <DayPicker
            mode="single"
            required
            selected={selectedDate}
            onSelect={selectDate}
            locale={es}
            weekStartsOn={1}
            showOutsideDays
            disabled={(date) => date < today || (noTimesLeftToday && isSameDay(date, today))}
          />
          <label className="date-time-hour">
            <span>Hora disponible</span>
            <select value={selectedTime} onChange={(event) => selectTime(event.target.value)} disabled={!selectedDate}>
              <option value="">Selecciona una hora</option>
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={timeIsUnavailable(option.value)}>{option.label}</option>
              ))}
            </select>
          </label>
          <p className="date-time-range">Horario de atención: 9:00 AM a 7:00 PM</p>
        </div>
      )}
      {error && <p className="date-time-error" role="alert">{error}</p>}
    </div>
  );
}
