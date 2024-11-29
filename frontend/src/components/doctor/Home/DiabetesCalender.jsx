import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  addMonths, 
  subMonths, 
  isSameDay, 
  addDays, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DiabetesCalendar = () => {
  const [trackingData] = useState({
    indicators: [
      { date: new Date(2023, 10, 5), type: 'green' },
      { date: new Date(2023, 10, 10), type: 'yellow' },
      { date: new Date(2023, 10, 15), type: 'red' },
      { date: new Date(2023, 10, 20), type: 'green' },
      { date: new Date(2023, 10, 25), type: 'yellow' }
    ],
    monthSummary: 'Type-2 Diabetes',
    monthStatus: 'green',
    monthSummary2: 'Pre-Diabetes',
    monthStatus2: 'yellow',
    monthSummary3: 'Type-1 Diabetes',
    monthStatus3: 'red'
  });

  const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 1));

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let currentDay = startDate;

  while (currentDay <= endDate) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const getIndicatorForDay = (day) => {
    const indicator = trackingData.indicators.find((ind) =>
      ind.date.getFullYear() === day.getFullYear() &&
      ind.date.getMonth() === day.getMonth() &&
      ind.date.getDate() === day.getDate()
    );
    return indicator ? indicator.type : null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-11/12 mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-1">
            <p className="text-[10px] text-gray-500 mt-1 flex items-center space-x-1">
              <span className={`block w-2 h-2 rounded-full bg-green-500`}></span>
              <span>{trackingData.monthSummary}</span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center space-x-1">
              <span className={`block w-2 h-2 rounded-full bg-yellow-500`}></span>
              <span>{trackingData.monthSummary2}</span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center space-x-1">
              <span className={`block w-2 h-2 rounded-full bg-red-500`}></span>
              <span>{trackingData.monthSummary3}</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="btn btn-sm btn-outline text-secondary rounded-full"
            onClick={handlePreviousMonth}
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            className="btn btn-sm btn-outline text-secondary rounded-full"
            onClick={handleNextMonth}
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center text-gray-500 font-medium text-sm">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const indicatorType = getIndicatorForDay(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          return (
            <div
              key={index}
              className={`py-4 rounded-full text-center text-sm font-medium 
                ${isCurrentMonth ? '' : 'text-gray-400'}
                ${isSameDay(day, new Date(2023, 10, 1))
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200 transition-colors duration-300'}
              `}
            >
              <div className="flex justify-center items-center space-x-2">
                <span>{format(day, 'd')}</span>
                {indicatorType && (
                  <span
                    className={`block w-2 h-2 rounded-full ${
                      indicatorType === 'green'
                        ? 'bg-green-500'
                        : indicatorType === 'yellow'
                        ? 'bg-yellow-500'
                        : indicatorType === 'red'
                        ? 'bg-red-500'
                        : ''
                    }`}
                  ></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiabetesCalendar;
