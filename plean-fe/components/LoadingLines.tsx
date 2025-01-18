const LoadingLines = () => {
  return (
    <div className="mt-[50px] w-full max-w-4xl space-y-16 min-h-[50vh] flex flex-col">
      {/* First section - 3 lines */}
      <div className="space-y-8">
        <div className="h-6 rounded-full w-full animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-11/12 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-4/5 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
      </div>

      {/* Second section - 2 lines */}
      <div className="space-y-8">
        <div className="h-6 rounded-full w-full animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-3/4 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
      </div>

      {/* Third section - 2 lines */}
      <div className="space-y-8">
        <div className="h-6 rounded-full w-10/12 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-4/5 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
      </div>

      {/* Fourth section - 4 lines */}
      <div className="space-y-8">
        <div className="h-6 rounded-full w-full animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-11/12 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-4/5 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
        <div className="h-6 ml-5 rounded-full w-3/4 animate-longPulse bg-gray-100 dark:animate-longPulseDark dark:bg-gray-800" />
      </div>
    </div>
  );
};

export default LoadingLines;
