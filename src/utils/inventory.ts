export const formatNumber = (value: string | number): string => {
  const num = Number(value.toString().replace(/[$,]/g, ""));
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
