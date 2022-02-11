// task filter actions for activites to filter
import React from "react";
import FilterByName from "./FilterByName/FilterByName";
import FilterByDate from "./FilterByDate/FilterByDate";
import FilterByDateRange from "./FilterByDateRange/FilterByDateRange";



function TaskFilterActions({
  tasks,
  getAllUtil,
  filterByNames,
  classes,
  setName,
  setDate,
  setStartDateRange,
  setEndDateRange,
  setEndDate,
  filterByDate,
  filterByDateRange,
  type,
  user_id,
  supervisorid


}) {

  return (
    <>
      {
        (type === 'A' || (type === 'S' && supervisorid == user_id)) &&
        <FilterByName
          tasks={tasks}
          setName={setName}
          getAllUtil={getAllUtil}
          filterByNames={filterByNames}
          classes={classes}
        />}
      <FilterByDate
        tasks={tasks}
        filterByDate={filterByDate}
        classes={classes}

      />
      <FilterByDateRange
        tasks={tasks}
        filterByDateRange={filterByDateRange}
        classes={classes}
      />

    </>
  );
}

export default TaskFilterActions;
