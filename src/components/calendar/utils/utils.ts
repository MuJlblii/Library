import { useCallback, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export const useGenerateCalendarDates = (currentDay: Date, selectedDate: Dayjs) => {
    const firstDayOfTheMonth = useMemo(() => selectedDate.clone().startOf('month'), [selectedDate]);

	const firstDayOfFirstWeekOfMonth = useMemo(() => dayjs(firstDayOfTheMonth).startOf('week'), [firstDayOfTheMonth]);
    const generateFirstDayOfEachWeek = useCallback(
		(day: Dayjs): Dayjs[] => {
			const dates: Dayjs[] = [day];

			for (let i = 1; i < 6; i++) {
				const date = day.clone().add(i, 'week');

				if (date.month() > selectedDate.month()) break;
				dates.push(date);
			}

			return dates;
		},
		[selectedDate]
	);
    const generateWeek = useCallback((day: Dayjs): Date[] => {
		const dates: Date[] = [];

		for (let i = 0; i < 7; i++) {
			const date = day.clone().add(i, 'day').toDate();

			dates.push(date);
		}

		return dates;
	}, []);

	const generateWeeksOfTheMonth = useMemo((): Date[][] => {
		const firstDayOfEachWeek = generateFirstDayOfEachWeek(firstDayOfFirstWeekOfMonth);

		return firstDayOfEachWeek.map((date) => generateWeek(date));
	}, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

    const acceptableDate = useMemo(() => {
        const day = dayjs(currentDay);
        const firstWorkingDay = day.endOf('week').clone().add(1, 'day').format('DD/MM/YY');
        const dates = [
            day.day() === 0 ? firstWorkingDay : day.day() === 6 ? firstWorkingDay : day.format('DD/MM/YY'),
            day.clone().add(1, 'day').day() === 0
                ? firstWorkingDay
                : day.clone().add(1, 'day').day() === 6
                ? firstWorkingDay
                : day.add(1, 'day').format('DD/MM/YY'),
        ];
    
        return dates;
    }, [currentDay]);

    return { acceptableDate, generateWeeksOfTheMonth }
}
