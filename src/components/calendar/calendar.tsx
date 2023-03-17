import { useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

import { ReactComponent as NavCalendar } from '../../assets/img/Icon_calendar.svg';
import { months } from '../../constants/month';

import { useGenerateCalendarDates } from './utils/utils';

import style from './calendar.module.css';

import 'dayjs/locale/ru';

type CalendarPropsType = {
	selectedDay: Dayjs | null,
	setSelectedDay: (arg: Dayjs) => void,
	setIsCalendarClicked: (arg: boolean) => void,
}

export const Calendar = ({selectedDay, setSelectedDay, setIsCalendarClicked}: CalendarPropsType) => {
	dayjs.locale('ru');
	dayjs.extend(updateLocale);
	dayjs.extend(weekday);

	const weekend = [0, 6];
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const currentDay = useMemo(() => dayjs().toDate(), []);
	const { acceptableDate, generateWeeksOfTheMonth } = useGenerateCalendarDates(currentDay, selectedDate);

	const handleDayClick = (day: Dayjs) => {
		setIsCalendarClicked(true);
		setSelectedDay(day);
	};

	return (
		<div className={style.MainWrapper}>
			<div className={style.content} data-test-id='calendar'>
				<div className={style.header}>
					<select
						className={style.month_select}
						data-test-id='month-select'
						onChange={(e) => setSelectedDate(dayjs().month(e.target.selectedIndex))}
						value={selectedDate.month()}
					>
						{months.map((el, index) => (
							<option value={index} key={el}>{el} {selectedDate.year()}</option>
						))}
					</select>
					<div className={style.navigation}>
						<button
							type='submit'
							data-test-id='button-prev-month'
							onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
							className={style.btn__select_month}
						>
							<NavCalendar />
						</button>
						<button
							type='submit'
							data-test-id='button-next-month'
							onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
							className={style.btn__select_month}
						>
							<NavCalendar style={{ rotate: '180deg' }} />
						</button>
					</div>
				</div>
				<div className={style.calendar__week_title}>
					{generateWeeksOfTheMonth[0].map((day, index) => (
						<div
							className={classNames(style.calendar__cell, style.calendar__cell_weekday)}
							key={`week-day-${Math.random() * index}_${new Date().getTime()}`}
						>
							{dayjs(day).format('dd')}
						</div>
					))}
				</div>
				<div className={style.calendar__days}>
					{generateWeeksOfTheMonth.map((week, weekIndex) => (
						<div className={style.calendar__week} key={`week-${Math.random() * weekIndex}_${new Date().getTime()}`}>
							{week.map((element, dayIndex) => {
								const day = dayjs(element);

								return (
									<button
										type='submit'
										data-test-id='day-button'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handleDayClick(day);
										}}
										disabled={!acceptableDate.includes(day.format('DD/MM/YY'))}
										className={classNames(style.calendar__cell, {
											[style.calendar__cell_current_day]:
												dayjs(day).format('DD/MM/YY') === dayjs(currentDay).format('DD/MM/YY'),
											[style.calendar__cell_weekend]:
												weekend.includes(day.day()) && day.month() === selectedDate.month(),
											[style.calendar__cell_selected_day]: day.format('DD/MM/YY') === selectedDay?.format('DD/MM/YY'),
											[style.calendar__cell_available_day]: acceptableDate.includes(day.format('DD/MM/YY'))
										})}
										key={`day-${Math.random() * dayIndex}_${new Date().getTime()}`}
									>
										{day.date()}
									</button>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
