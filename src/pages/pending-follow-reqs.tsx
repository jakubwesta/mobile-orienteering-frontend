import { Button } from "@/components/ui/button";
import { followRequestService, type PendingFollowRequest } from "@/services/follow-request.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function PendingPage() {
    const navigate = useNavigate()
    const [requests, setRequests] = useState<PendingFollowRequest[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getRequestsDetails = async () => {
            try {
                const data = await followRequestService.findMyPending()
                setRequests(data)
            } catch (err) {
                console.log(err);
                setError("Error loading request details");
            } finally {
                setLoading(false);
            }
        }
        getRequestsDetails()
    }, [])

    const onAcceptClick = async (requestId: number) => {
        try {
            setLoading(true);

            await followRequestService.acceptRequest(requestId)
            setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } catch {
            setError("Error accepting request")
        } finally {
            setLoading(false)
        }
    }

    const onRejectClick = async (requestId: number) => {
        try {
            await followRequestService.rejectRequest(requestId)

            setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } catch {
            setError("Error rejecting request")
        }
    }

    const onCardClick = (requesterId: number) => {
        navigate(`/user/${requesterId}`)
    }

    if (loading) return <p className="text-left px-4 sm:px-6 md:pl-12 text-gray-600 dark:text-gray-400 py-8">Loading...</p>;
    if (error) return <p className="text-left px-4 sm:px-6 md:pl-12 text-red-600 dark:text-red-400 py-8">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-4xl pt-4 pb-6 px-4 sm:px-6 md:pl-12">
                <div className="mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Pending Follow Requests</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Manage your follow requests</p>
                </div>

                {requests.length === 0 ? (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 sm:p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">No pending requests</p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {requests.map((request) => (
                            <div
                                key={request.id}
                                onClick={() => onCardClick(request.requesterId)}
                                className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold shrink-0">
                                            {request.requesterFullName.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                {request.requesterFullName}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                @{request.requesterUserName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-13 sm:ml-0">
                                        <Button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); onAcceptClick(request.id); }}
                                            variant={"default"}
                                            size={"default"}
                                            className="flex-1 sm:flex-none"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); onRejectClick(request.id); }}
                                            variant={"outline"}
                                            size={"default"}
                                            className="flex-1 sm:flex-none"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default PendingPage