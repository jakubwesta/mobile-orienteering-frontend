import { followRequestService, type PendingFollowRequest } from "@/services/follow-request.service";
import { userFollowService } from "@/services/user-follows.service";
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
                setError("Error loading movies");
            } finally {
                setLoading(false);
            }
        }
        getRequestsDetails()
    }, [])

    const onAcceptClick = async (requestId: number, requesterId: number) => {
        try {
            setLoading(true);
            await userFollowService.createFollow({
                followingId: requesterId,
            })

            await followRequestService.acceptRequest(requestId)

            setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } catch {
            setError("Error accepting request")
        } finally {
            setLoading(false)
        }
    }

    const onDenyClick = async (requestId: number) => {
        try {
            await followRequestService.deleteRequest(requestId)

            setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        } catch {
            setError("Error denying request")
        }

        alert(requestId)
    }

    const onCardClick = (requesterId: number) => {
        navigate(`/user/${requesterId}`)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (<div>
        {requests.map((request) => (<div key={request.id} onClick={() => onCardClick(request.requesterId)}>
            <p>{request.requesterFullName}</p>
            <p>{request.requesterUserName}</p>
            <button type="button" onClick={(e) => { e.stopPropagation(); onAcceptClick(request.id, request.requesterId); }}>
                Accept
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); onDenyClick(request.id); }}>
                Deny
            </button>
        </div>))}
    </div>)
}
export default PendingPage