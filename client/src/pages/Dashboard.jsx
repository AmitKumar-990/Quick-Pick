import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const [polls, setPolls] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [expiresAt, setExpiresAt] = useState("");
    const [error, setError] = useState("");
    const [votedPolls, setVotedPolls] = useState({});

    //AUTH CHECK
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }
    }, []);

    // FETCH POLLS
    const fetchPolls = async () => {
        setLoading(true);
        let url = "/polls";
        if (filter !== "all") url += `?status=${filter}`;

        try {
            const res = await API.get(url);
            setPolls(res.data);
        } catch (err) {
            setError("Failed to load polls");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPolls();
    }, [filter]);

    // CREATE POLL
    const createPoll = async () => {
        if (!question || options.some(o => o === "")) {
            setError("All fields required");
            return;
        }

        try {
            await API.post("/polls", {
                question,
                options,
                expiresAt
            });

            setQuestion("");
            setOptions(["", ""]);
            setExpiresAt("");
            setError("");

            fetchPolls();
        } catch {
            setError("Failed to create poll");
        }
    };

    // OPTIONS
    const handleOptionChange = (val, i) => {
        const arr = [...options];
        arr[i] = val;
        setOptions(arr);
    };

    const addOption = () => {
        if (options.length >= 4) return;
        setOptions([...options, ""]);
    };

    const removeOption = (i) => {
        setOptions(options.filter((_, index) => index !== i));
    };

    // VOTE
    const vote = async (id, index) => {
        try {
            await API.post(`/polls/${id}/vote`, {
                optionIndex: index,
            });

            setError("");

            // mark voted locally
            setVotedPolls((prev) => ({
                ...prev,
                [id]: true,
            }));

            fetchPolls(false);

        } catch (err) {
            setError(err.response?.data?.msg || "Voting failed");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">

                {/* CREATE */}
                <div className="bg-white p-6 rounded-3xl shadow-2xl h-fit top-6">
                    <h2 className="text-xl font-bold mb-4">Create Poll</h2>

                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Question"
                        className="w-full border p-3 rounded-xl mb-3"
                    />

                    {options.map((opt, i) => (
                        <div key={i} className="relative mb-3">
                            <input
                                value={opt}
                                onChange={(e) =>
                                    handleOptionChange(e.target.value, i)
                                }
                                placeholder="Options"
                                className="w-full border p-3 rounded-xl"
                            />

                            {options.length > 2 && (
                                <button
                                    onClick={() => removeOption(i)}
                                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={addOption}
                        className="text-blue-500 text-sm mb-3"
                    >
                        + Add Option
                    </button>

                    <input
                        type="datetime-local"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className="w-full border p-3 rounded-xl mb-3"
                    />

                    <button
                        onClick={createPoll}
                        className="w-full bg-blue-500 text-white p-3 rounded-xl"
                    >
                        Create
                    </button>
                </div>

                {/* POLLS */}
                <div className="md:col-span-2 space-y-4">

                    {/* FILTER */}
                    <div className="flex text-lg gap-6 border-b pb-2">
                        {["all", "active", "expired"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`capitalize ${filter === tab
                                    ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                                    : "text-gray-500"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {!loading && polls.length === 0 && (
                        <p>No polls available</p>
                    )}

                    {polls.map((poll) => {
                        const alreadyVoted = poll.options?.some(opt =>
                            opt.voters?.includes(user?.email)
                        );

                        return (
                            <div key={poll._id} className="bg-white p-5 rounded-2xl shadow">

                                <div className="flex justify-between pb-4">
                                    <h3 className="font-bold">{poll.question}</h3>
                                    <span>
                                        {poll.isExpired ? "Expired" : "Active"}
                                    </span>
                                </div>

                                {poll.options?.map((opt, i) => {
                                    const totalVotes = poll.options.reduce(
                                        (sum, o) => sum + o.votes,
                                        0
                                    );

                                    const percent = totalVotes
                                        ? (opt.votes / totalVotes) * 100
                                        : 0;

                                    const isVoted = votedPolls[poll._id];

                                    return (
                                        <div key={i} className="border rounded-xl p-3 flex items-center justify-between mb-3 hover:shadow-sm transition">

                                            {/* LEFT SIDE */}
                                            <div className="w-full">

                                                {/* TEXT + VOTES */}
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">{opt.text}</span>
                                                    <span className="text-gray-500 text-xs">{opt.votes} votes</span>
                                                </div>

                                                {/* PROGRESS BAR */}
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${percent}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* RIGHT SIDE BUTTON */}
                                            <div className="ml-4">
                                                {!isVoted && !poll.isExpired ? (
                                                    <button
                                                        onClick={() => vote(poll._id, i)}
                                                        className="border px-4 py-1 rounded-md text-sm hover:bg-gray-100"
                                                    >
                                                        Vote
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="bg-green-500 text-white px-4 py-1 rounded-md text-sm"
                                                    >
                                                        Voted
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {poll.winner && (
                                    <div className="text-green-600 font-semibold">
                                        Winner: {poll.winner.text}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}