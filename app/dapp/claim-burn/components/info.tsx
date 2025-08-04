interface InfoRowProps {
  label: string;
  value: string;
  isDark: boolean;
  valueFontWeight?: string;
}

export const InfoRow = ({ label, value, isDark, valueFontWeight }: InfoRowProps) => (
  <div className="flex justify-between">
    <span
      className={`text-sm font-normal ${isDark ? "text-[var(--claim-text-disabled)]" : "text-[#909090]"}`}
    >
      {label}
    </span>
    <span
      className={`text-sm ${valueFontWeight ? valueFontWeight : "font-normal"} ${isDark ? "text-[var(--claim-burn-text)]" : "text-[#303030]"}`}
    >
      {value}
    </span>
  </div>
);
