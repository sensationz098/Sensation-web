const calculateEndDate = (startDateStr: string, durationStr: string) => {
  const date = new Date(startDateStr);

  // 1. Split "1 Years" into ["1", "Years"]
  const [value, unit] = durationStr.split(" ");
  const numValue = parseInt(value);

  // 2. Normalize unit to lowercase and check for "year" or "month"
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit.includes("year")) {
    date.setFullYear(date.getFullYear() + numValue);
  } else if (normalizedUnit.includes("month")) {
    date.setMonth(date.getMonth() + numValue);
  }

  return date;
};

export default calculateEndDate;
