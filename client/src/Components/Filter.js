export default function Filter({ handleName, handleGender, selectedGender, showGenderFilter }) {
    return (
      <div id="filter">
        {/* filter based on names */}
        <input
          className="filter"
          type="text"
          name="search"
          onChange={handleName}
          placeholder="Search name ..."
        />
        <div id="sort">
          {/* conditionally render gender filter */}
          {showGenderFilter && (
            <select
              className="filter"
              id="sortGender"
              onChange={handleGender}
              value={selectedGender}
            >
              <option className="filter" value="All">
                All Genders
              </option>
              <option className="filter" value="Male">
                Male
              </option>
              <option className="filter" value="Female">
                Female
              </option>
            </select>
          )}
        </div>
      </div>
    );
  }
  