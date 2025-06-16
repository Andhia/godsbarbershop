const ScheduleSelector = ({ scheduleAvailability, data, setData, errors }) => {
  const handleSelect = (id, isAvailable) => {
      if (isAvailable) setData("schedule_id", id);
  };

  return (
      <div>
          <label className="block text-sm font-medium text-gray-700">
              Pilih Jadwal
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
              {scheduleAvailability.map((schedule) => (
                  <button
                      key={schedule.id}
                      onClick={() => handleSelect(schedule.id, schedule.is_available)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          schedule.is_available
                              ? "bg-brown text-white hover:bg-neutral-500"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } ${
                          data.schedule_id === schedule.id ? "ring-2 ring-indigo-500" : ""
                      }`}
                      disabled={!schedule.is_available}
                  >
                      {schedule.time_range}
                  </button>
              ))}
          </div>
          {errors.schedule_id && (
              <div className="text-red-600 text-sm mt-1">{errors.schedule_id}</div>
          )}
      </div>
  );
};

export default ScheduleSelector;
