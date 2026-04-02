export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  dateFilterType,
  onDateFilterTypeChange,
  customDate,
  onCustomDateChange,
  rangeStart,
  onRangeStartChange,
  rangeEnd,
  onRangeEndChange,
  regions,
  categories,
  onClearRegion,
  onClearCategory,
  onClearDate,
  onClearSearch,
  onClearAll,
}) {
  const isInvalidRange =
    dateFilterType === "customRange" &&
    rangeStart &&
    rangeEnd &&
    rangeStart > rangeEnd;

  return (
    <div className="search" id="search">
      <div className="search__container">
        <div className="search__row search__row--primary">
          <div className="search__input-wrapper">
            <span className="search__icon">🔍</span>
            <input
              id="search-input"
              type="text"
              className="search__input"
              placeholder="Search events by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="search__select-wrapper">
            <select
              id="region-select"
              className="search__select"
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="search__select-wrapper">
            <select
              id="category-select"
              className="search__select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="search__row search__row--date"
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <div
            className={
              "search__select-wrapper search__select-wrapper--date-type"
            }
          >
            <select
              id="date-filter-select"
              className="search__select"
              value={dateFilterType}
              onChange={(e) => onDateFilterTypeChange(e.target.value)}
              aria-label="Date filter"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="customDate">Custom Date</option>
              <option value="customRange">Custom Range</option>
            </select>
          </div>

          {dateFilterType === "customDate" && (
            <div className="search__date-group">
              <input
                id="custom-date-input"
                type="date"
                className="search__date-input search__select"
                value={customDate}
                onChange={(e) => onCustomDateChange(e.target.value)}
                aria-label="Custom date"
              />
            </div>
          )}

          {dateFilterType === "customRange" && (
            <div
              className="search__date-group"
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                id="range-start-input"
                type={rangeStart ? "date" : "text"}
                placeholder="Start Date"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                className={`search__date-input search__select ${
                  isInvalidRange ? "search__date-input--invalid" : ""
                }`}
                value={rangeStart}
                max={rangeEnd || undefined}
                onChange={(e) => {
                  onRangeStartChange(e.target.value);
                }}
                aria-label="Range start date"
                style={{ width: "160px" }}
              />
              <span
                className="search__date-separator"
                style={{ color: "var(--text-muted)" }}
              >
                —
              </span>
              <input
                id="range-end-input"
                type={rangeEnd ? "date" : "text"}
                placeholder="End Date"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                className={`search__date-input search__select ${
                  isInvalidRange ? "search__date-input--invalid" : ""
                }`}
                value={rangeEnd}
                min={rangeStart || undefined}
                onChange={(e) => {
                  onRangeEndChange(e.target.value);
                }}
                aria-label="Range end date"
                style={{ width: "160px" }}
              />
              {isInvalidRange && (
                <div className="search__error-message">
                  <span>Start date cannot be after end date</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Filter Chips */}
        {(searchTerm ||
          selectedRegion ||
          selectedCategory ||
          dateFilterType !== "all") && (
          <div className="filter-chips">
            {searchTerm && (
              <span className="filter-chip">
                Search: &quot;{searchTerm}&quot;
                <button
                  type="button"
                  className="filter-chip__remove"
                  onClick={onClearSearch}
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedRegion && (
              <span className="filter-chip">
                Region: {selectedRegion}
                <button
                  type="button"
                  className="filter-chip__remove"
                  onClick={onClearRegion}
                  aria-label="Remove region filter"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="filter-chip">
                Category: {selectedCategory}
                <button
                  type="button"
                  className="filter-chip__remove"
                  onClick={onClearCategory}
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}
            {dateFilterType !== "all" && (
              <span className="filter-chip">
                Date:{" "}
                {dateFilterType === "thisWeek"
                  ? "This Week"
                  : dateFilterType === "thisMonth"
                    ? "This Month"
                    : dateFilterType === "upcoming"
                      ? "Upcoming"
                      : dateFilterType === "customDate"
                        ? `On ${customDate || "…"}`
                        : dateFilterType === "customRange"
                          ? rangeStart || rangeEnd
                            ? `${rangeStart || "…"} — ${rangeEnd || "…"}`
                            : "Custom Range"
                          : dateFilterType}
                <button
                  type="button"
                  className="filter-chip__remove"
                  onClick={onClearDate}
                  aria-label="Remove date filter"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              className="filter-chips__clear-all"
              onClick={onClearAll}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
