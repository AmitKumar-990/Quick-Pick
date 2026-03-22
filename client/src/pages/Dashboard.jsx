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
    <div className="bg-[#f6f8fb] min-h-screen">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-8">

            {/* CREATE POLL */}
            <div className="bg-white rounded-2xl shadow-md p-5 mb-8 border border-gray-100">

                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Create a new poll
                </h2>

                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What's your question?"
                    className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <div className="grid grid-cols-2 gap-3 mb-3">
                    {options.map((opt, i) => (
                        <div key={i} className="relative">
                            <input
                                value={opt}
                                onChange={(e) =>
                                    handleOptionChange(e.target.value, i)
                                }
                                placeholder={`Option ${i + 1}`}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            {options.length > 2 && (
                                <button
                                    onClick={() => removeOption(i)}
                                    className="absolute top-2 right-2 text-xs text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center">

                    <button
                        onClick={addOption}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        + Add option
                    </button>

                    <input
                        type="datetime-local"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className="border p-2 rounded-lg text-sm"
                    />
                </div>

                <button
                    onClick={createPoll}
                    className="mt-4 w-full bg-black text-white p-3 rounded-lg hover:opacity-90 transition"
                >
                    Post Poll
                </button>
            </div>

            {/* FILTER TABS */}
            <div className="flex justify-center gap-6 mb-6 text-m font-medium">
                {["all", "active", "expired"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-1 rounded-full transition ${
                            filter === tab
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* EMPTY STATE */}
            {!loading && polls.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    No polls yet 👀
                </div>
            )}

            {/* POLL FEED */}
            <div className="space-y-6">
                {polls.map((poll) => {
                    const isVoted = votedPolls[poll._id];

                    return (
                        <div key={poll._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">

                            {/* QUESTION */}
                            <div className="flex justify-between mb-4">
                                <h3 className="font-semibold text-gray-800">
                                    {poll.question}
                                </h3>

                                <span className={`text-xs ${
                                    poll.isExpired ? "text-red-500" : "text-green-500"
                                }`}>
                                    {poll.isExpired ? "Expired" : "Active"}
                                </span>
                            </div>

                            {/* OPTIONS */}
                            {poll.options?.map((opt, i) => {
                                const totalVotes = poll.options.reduce(
                                    (sum, o) => sum + o.votes,
                                    0
                                );

                                const percent = totalVotes
                                    ? (opt.votes / totalVotes) * 100
                                    : 0;

                                return (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            !isVoted && !poll.isExpired && vote(poll._id, i)
                                        }
                                        className={`mb-3 p-3 rounded-xl cursor-pointer border transition ${
                                            isVoted || poll.isExpired
                                                ? "bg-gray-50"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >

                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{opt.text}</span>
                                            <span className="text-gray-400 text-xs">
                                                {opt.votes}
                                            </span>
                                        </div>

                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div
                                                className="bg-black h-2 rounded-full"
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* FOOTER */}
                            {poll.winner && (
                                <div className="mt-3 text-sm text-green-600 font-medium">
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