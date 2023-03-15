import { useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

import { ReactComponent as NavCalendar } from '../../assets/img/Icon_calendar.svg';

import { useGenerateCalendarDates } from './utils/utils';

import style from './calendar.module.css';

import 'dayjs/locale/ru';

type CalendarPropsType = {
	selectedDay: Dayjs | null,
	setSelectedDay: (arg: Dayjs) => void,
}

export const Calendar = ({selectedDay, setSelectedDay}: CalendarPropsType) => {
	dayjs.locale('ru');
	dayjs.extend(updateLocale);
	dayjs.extend(weekday);
	dayjs.updateLocale('ru', {
		months: [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
		weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	});
	const weekend = [0, 6];
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const currentDay = useMemo(() => dayjs().toDate(), []);
	const { acceptableDate, generateWeeksOfTheMonth } = useGenerateCalendarDates(currentDay, selectedDate);

	const handleDayClick = (day: Dayjs) => {
		
		setSelectedDay(day);
	};

	return (
		<div className={style.MainWrapper}>
			<div className={style.content}>
				<div className={style.header}>
					<h3>{selectedDate.clone().format('MMMM YYYY')}</h3>
					<div className={style.navigation}>
						<NavCalendar onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))} />
						<NavCalendar style={{ rotate: '180deg' }} onClick={() => setSelectedDate((date) => date.add(1, 'month'))} />
					</div>
				</div>
				<div className={style.calendar__week_title}>
					{generateWeeksOfTheMonth[0].map((day, index) => (
						<div
							className={classNames(style.calendar__cell)}
							key={`week-day-${Math.random() * index}_${new Date().getTime()}`}
						>
							{dayjs(day).format('ddd')}
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
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handleDayClick(day);
											console.log(day.toDate());
										}}
										disabled={!acceptableDate.includes(day.format('DD/MM/YY'))}
										className={classNames(style.calendar__cell, {
											[style.calendar__cell_current_day]:
												dayjs(day).format('DD/MM/YY') === dayjs(currentDay).format('DD/MM/YY'),
											[style.calendar__cell_weekend]:
												weekend.includes(day.day()) && day.month() === selectedDate.month(),
											[style.calendar__cell_selected_day]: day.format('DD/MM/YY') === selectedDay?.format('DD/MM/YY'),
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
