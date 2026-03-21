import Poll from "../models/Poll.js";

// CREATE
export const createPoll = async (req, res) => {
  try {
    const { question, options, expiresAt } = req.body;

    if (!question || options.length < 2) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    const poll = new Poll({
      question,
      options: options.map(opt => ({
        text: opt,
        voters: []
      })),
      expiresAt
    });

    await poll.save();
    res.json(poll);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET + FILTER + WINNER
export const getPolls = async (req, res) => {
  try {
    const { status } = req.query;
    let polls = await Poll.find().sort({ createdAt: -1 });

    const now = new Date();

    polls = polls.map(p => {
      const isExpired = now > p.expiresAt;

      const totalVotes = p.options.reduce(
        (sum, opt) => sum + opt.votes,
        0
      );

      let winner = null;

      if (isExpired && totalVotes > 0) {
        winner = p.options.reduce((max, opt) =>
          opt.votes > max.votes ? opt : max
        );
      }

      return {
        ...p.toObject(),
        isExpired,
        totalVotes,
        winner
      };
    });

    if (status === "active") {
      polls = polls.filter(p => !p.isExpired);
    }

    if (status === "expired") {
      polls = polls.filter(p => p.isExpired);
    }

    res.json(polls);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VOTE (SECURE)
export const votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const userId = req.user.id;

    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ msg: "Not found" });

    if (new Date() > poll.expiresAt) {
      return res.status(400).json({ msg: "Expired" });
    }

    const alreadyVoted = poll.voters.find(
      v => v.userId === userId
    );

    if (alreadyVoted) {
      return res.status(400).json({ msg: "Already voted" });
    }

    poll.options[optionIndex].votes += 1;

    poll.voters.push({
      userId,
      optionIndex
    });

    await poll.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};