import MapCard from "./map-card"

type ActivityCardProps = {
    title: string
    userFullName: string
    username: string
    date: string
    distance: string
    duration: string
}

function ActivityCard({ title, userFullName, username, date, distance, duration }: ActivityCardProps) {
    function formatDuration(isoDuration: string): string {
        const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

        if (!match) return isoDuration;

        const hours = parseInt(match[1] || "0", 10);
        const minutes = parseInt(match[2] || "0", 10);
        const seconds = parseInt(match[3] || "0", 10);

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}min`);
        if (seconds > 0) parts.push(`${seconds}sec`);

        return parts.join(' ');
    }

    function extractDate(isoString: string): string {
        return isoString.split('T')[0];
    }

    return (
        <div className="w-full sm:max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <MapCard />

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h3>

                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold shrink-0">
                            {userFullName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {userFullName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                @{username}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
                        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
                        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{extractDate(date)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-500 dark:text-gray-400">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                                Distance
                            </span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {distance} km
                        </p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-500 dark:text-gray-400">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                                Duration
                            </span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {formatDuration(duration)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard