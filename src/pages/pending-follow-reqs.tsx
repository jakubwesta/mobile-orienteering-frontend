import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
API TO DO:
findPendingForTarget (res with fullname and username)
deleteByFollowerIdAndFollowingId
createUserFollows

--
*/

const requestsDemo: Request[] = [
    { id: 1, requesterId: 123, requesterFullName: "Jan Kowalski", requesterUserName: "janek123" },
    { id: 2, requesterId: 456, requesterFullName: "Anna Nowak", requesterUserName: "anna_n" },
    { id: 3, requesterId: 789, requesterFullName: "Piotr Wiśniewski", requesterUserName: "piotrek_w" },
];

type Request = {
    id: number;
    requesterId: number;
    requesterFullName: string;
    requesterUserName: string;
};

function PendingPage() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState<Request[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getRequestsDetails = async () => {
            try {
                //const requests = await fetchRequests()
                setRequests(requestsDemo)
            } catch (err) {
                console.log(err);
                setError("Error loading movies");
            } finally {
                setLoading(false);
            }
        }
        getRequestsDetails()
    }, [])

    const onAcceptClick = (requestId: number) => {
        //make userfollows connection
        //delete followrequest
        setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        alert(requestId)
    }

    const onDenyClick = (requestId: number) => {
        //delete followreques connection
        setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
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
            <button type="button" onClick={(e) => { e.stopPropagation(); onAcceptClick(request.id); }}>
                Accept
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); onDenyClick(request.id); }}>
                Deny
            </button>
        </div>))}
    </div>)
}
export default PendingPage