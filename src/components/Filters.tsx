interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  loading: boolean;
  userGender: string;
  setUserGender: (userGender: string) => void;
}

function Filters({
  searchQuery,
  setSearchQuery,
  loading,
  userGender,
  setUserGender,
}: FiltersProps) {
  return (
    <div className="filters">
      <label>
        <input
          className="search-input"
          type="search"
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          placeholder="Search..."
          disabled={loading}
        />
      </label>

      <label>
        Filtered by:
        <input
          type="radio"
          id="one"
          name="all"
          value="all"
          checked={userGender === "all"}
          onChange={({ target }) => setUserGender(target.value)}
        />
        <span>All</span>
      </label>
      <label>
        <input
          type="radio"
          id="male"
          name="male"
          value="male"
          checked={userGender === "male"}
          onChange={({ target }) => setUserGender(target.value)}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          id="female"
          name="female"
          value="female"
          checked={userGender === "female"}
          onChange={(e) => setUserGender(e.target.value)}
        />
        Female
      </label>
    </div>
  );
}
export default Filters;
