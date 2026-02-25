// components/LoadingShield.tsx
export default function LoadingShield() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-500 opacity-20"></div>

        {/* Inner Spinning Gradient */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500"></div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white animate-pulse">
          Securing your session...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Checking your profile details
        </p>
      </div>
    </div>
  );
}
