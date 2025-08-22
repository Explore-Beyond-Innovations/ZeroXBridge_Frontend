import { Skeleton } from '../../components/Skeleton';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  isDark: boolean;
  valueFontWeight?: string;
  loading: boolean;
}

export const InfoRow = ({
  label,
  loading,
  value,
  isDark,
  valueFontWeight,
}: InfoRowProps) => (
  <div className="flex justify-between">
    <span
      className={`text-sm font-normal ${
        isDark ? 'text-[var(--claim-text-disabled)]' : 'text-[#909090]'
      }`}
    >
      {label}
    </span>
    {loading ? (
      <Skeleton className="h-4 w-24 rounded-md" />
    ) : (
      <span
        className={`text-sm ${
          valueFontWeight ? valueFontWeight : 'font-normal'
        } ${isDark ? 'text-[var(--claim-burn-text)]' : 'text-[#303030]'}`}
      >
        {value}
      </span>
    )}
  </div>
);
