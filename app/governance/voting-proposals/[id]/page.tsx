"use client";
import React from "react";
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Home,
  CheckSquare,
  Coins,
  Share2,
  ThumbsUp,
  MessageCircle,
  Search,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

interface Vote {
  address: string;
  votes: string;
}

interface Comment {
  id: string;
  address: string;
  time: string;
  content: string;
  likes: number;
}

export default function VotingProposalPage() {
  // Mock data for the proposal
  const proposal = {
    id: "8",
    title: "Staking on Starknet V2",
    status: "CLOSED",
    timestamp: "Mar 20th 2025",
    address: "0x04ea...c527",
    comments: 43,
    votingResults: {
      for: {
        percentage: 89.18,
        amount: "578.6M STRK",
      },
      against: {
        percentage: 10.82,
        amount: "70.2M STRK",
      },
      abstain: {
        percentage: 0.01,
        amount: "35.3K STRK",
      },
      totalVotingPower: "102.93%",
      totalVoters: "6.17%",
    },
  };

  // Mock data for votes
  const votes: Vote[] = [
    { address: "0x0718...73e8", votes: "61.4k votes" },
    { address: "0x0546...1db4", votes: "25.6k votes" },
    { address: "0x05e5...418d", votes: "456.8000 votes" },
    { address: "0x0386...301e", votes: "10.2k votes" },
    { address: "0x04e5...50ad", votes: "159.0000 votes" },
    { address: "0x019e...471f", votes: "202.0000 votes" },
    { address: "0x02d4...839c", votes: "10.2k votes" },
    { address: "0x0224...9dcb", votes: "101.0000 votes" },
    { address: "0x0799...de6d", votes: "201.1520 votes" },
    { address: "0x01c6...a048", votes: "14.3k votes" },
    { address: "0x0064...c512", votes: "487.6760 votes" },
    { address: "0x06fe...ff2c", votes: "1.2869 votes" },
    { address: "0x0277...5418", votes: "25.0000 votes" },
    { address: "0x02c1...2198", votes: "406.0000 votes" },
    { address: "0x008c...6308", votes: "3.5200 votes" },
  ];

  // Mock data for comments
  const comments: Comment[] = [
    {
      id: "1",
      address: "0x04af...ef7b",
      time: "4w",
      content: "i vote For",
      likes: 0,
    },
    {
      id: "2",
      address: "0x04af...ef7b",
      time: "4w",
      content: "go go",
      likes: 0,
    },
    {
      id: "3",
      address: "0xc71f...5bc6",
      time: "4w",
      content: "Go-go)",
      likes: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#ffffff] border-r border-gray-200 flex flex-col fixed h-screen">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <div>
              <div className="font-medium text-lg text-gray-800">
                Governance Hub
              </div>
              <div className="text-xs text-purple-600">ALPHA</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SidebarItem icon={<Home size={20} />} text="Home" active={false} />
          <SidebarItem
            icon={<Coins size={20} />}
            text="Manage vSTRK"
            active={false}
          />
          <SidebarItem
            icon={<CheckSquare size={20} />}
            text="Voting proposals"
            active={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[260px]">
        {/* Header */}
        <div className="bg-[#fff] h-[70px] py-2 px-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/voting-proposals"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Voting proposals</span>
            </Link>
          </div>
          <div className="flex items-center">
            <button className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <Share2 size={20} className="mr-2" />
              <span>Share</span>
            </button>

            <div className="relative mr-3">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-52"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <button className="bg-gray-100 text-black px-4 py-1 text-sm rounded-md border border-gray-300">
              Connect
            </button>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:gap-8 p-8">
            {/* Main Proposal Content */}
            <div className="w-full md:w-2/3">
              {/* Proposal Header */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-pink-300 text-gray-800 px-2 py-0.5 rounded-full text-xs uppercase mr-4">
                    CLOSED
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <button className="flex items-center hover:text-gray-900">
                      <span className="mr-1">👤</span>
                      {proposal.address}
                      <Copy size={14} className="ml-1 text-gray-400" />
                    </button>
                    <span className="mx-2">•</span>
                    <span>{proposal.timestamp}</span>
                    <span className="mx-2">•</span>
                    <span>{proposal.comments} comments</span>
                  </div>
                </div>
                <h1 className="font-bold text-gray-900 mb-2">
                  {proposal.title}
                </h1>
                <button className="">View Snapshot info</button>
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  This proposal outlines the planned upgrade to Starknet Staking
                  v2 as can be seen in SNIP 28. The upgrade is aimed at
                  enhancing network security and decentralization by adding to
                  the current requirement that stakers run full nodes or
                  delegate, and introducing validator block attestation and
                  allowing for increased validator commission. These changes are
                  crucial steps toward achieving a fully decentralized Starknet.
                </p>
                <p className="text-gray-700 mb-4">
                  Staking v2 addresses two primary needs:
                </p>
                <ol className="list-decimal pl-6 space-y-4 mb-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Verifying Validator Reliability:
                    </strong>{" "}
                    Before entrusting validators with consensus
                    responsibilities, it&apos;s essential to ensure they can
                    maintain high liveness and actively participate in the
                    network.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Improving Economic Incentives:
                    </strong>{" "}
                    The current commission structure needs adjustments to ensure
                    long-term validator participation and network stability,
                    especially as the demands on validators increase with
                    network growth and decentralization.
                  </li>
                </ol>
              </div>

              {/* Vote Details */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Vote Details</h2>
                <p className="text-gray-700 mb-4">
                  A vote will be conducted to determine the approval or
                  rejection of the following:
                </p>
                <ol className="list-decimal pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Validator Block Attestation:
                    </strong>{" "}
                    Validators will be required to attest to randomly selected
                    blocks within each epoch. For more details, see the
                    &quot;Validator block attestation&quot;.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Validator Commission Increase:
                    </strong>{" "}
                    Validators will be able to commit to a maximum commission
                    rate. For more details, see the &quot;Validator Commission
                    Increase&quot;.
                  </li>
                </ol>
              </div>

              {/* Validator Block Attestation */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">
                  Validator block attestation:
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">Epochs:</strong> Introduce
                    the concept of epochs, fixed time periods where validator
                    staking power is determined. This ensures predictable input
                    for the consensus algorithm.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Attestation Mechanism:
                    </strong>{" "}
                    Validators will be required to attest to randomly selected
                    blocks within each epoch. This proves their active
                    participation and allows delegators to assess validator
                    reliability.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">Rewards:</strong>{" "}
                    Validators who successfully attest to blocks will receive
                    staking rewards proportional to their stake. Those who fail
                    to attest will receive no rewards for that epoch.
                  </li>
                </ul>
                <div className="my-4">
                  <img
                    src="/placeholder-diagram.png"
                    alt="Block Attestation Diagram"
                    className="rounded-md border border-gray-200"
                  />
                </div>
              </div>

              {/* Validator Commission Increase */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">
                  Validator Commission Increase
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Commission Commitments and increase:
                    </strong>{" "}
                    Validators will be able to commit to a certain maximum
                    commission M, and the last date (in Epochs) that this
                    commitment is relevant for. Until this last date arrives,
                    validators will not be able to increase their commission
                    beyond M, but can freely change their commission in the
                    range [0,M]
                  </li>
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Benefits</h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Improved Validator Accountability:
                    </strong>{" "}
                    Attestation provides a clear metric for evaluating validator
                    performance.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Sustainable Validator Incentives:
                    </strong>{" "}
                    The potential for increased commission ensures continued
                    validator participation as network demands grow.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">
                      Increased Transparency:
                    </strong>{" "}
                    Commission commitments provide delegators with clear
                    expectations regarding future fees.
                  </li>
                </ul>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Timeline</h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-gray-900">Q1 2025:</strong> Staking
                    v2 deployment on testnet.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-gray-900">Q2 2025:</strong> Staking
                    v2 deployment on Starknet mainnet.
                  </li>
                </ul>
              </div>

              {/* Conclusion */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Conclusion</h2>
                <p className="text-gray-700 mb-4">
                  Staking v2 represents a significant step towards a
                  decentralized Starknet. We encourage all community members to
                  participate in the vote. Please vote For, Aginst or Abstain.
                </p>
              </div>

              {/* Discussion */}
              <div className="mb-8">
                <h2 className="font-bold text-gray-900 mb-4">Discussion</h2>
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
                  <div className="flex items-center">
                    <MessageCircle size={20} className="text-blue-500 mr-2" />
                    <span className="text-blue-700">
                      Comments are now closed.
                    </span>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-6 text-gray-700">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-2 border-gray-200 pl-4"
                    >
                      <div className="flex items-start">
                        <div className="rounded-full bg-gray-300 w-8 h-8 mr-3 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="font-medium">{comment.address}</div>
                            <div className="ml-2 text-gray-500">
                              {comment.time}
                            </div>
                          </div>
                          <div className="mt-1">{comment.content}</div>

                          <div className="flex items-center mt-2 text-gray-500">
                            <button className="flex items-center mr-4">
                              <ThumbsUp size={14} className="mr-1" />
                              <span>{comment.likes}</span>
                            </button>
                            <button>
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Voting Results */}
            <div className="w-full md:w-1/3 text-gray-700">
              <div className="sticky top-4 bg-[#fff] border-l border-gray-200 p-6">
                <h2 className="font-bold mb-4">Final Results</h2>

                {/* For Votes */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{proposal.votingResults.for.percentage}% FOR</span>
                    <span>{proposal.votingResults.for.amount}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${proposal.votingResults.for.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Against Votes */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>
                      {proposal.votingResults.against.percentage}% AGAINST
                    </span>
                    <span>{proposal.votingResults.against.amount}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${proposal.votingResults.against.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Abstain Votes */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span>
                      {proposal.votingResults.abstain.percentage}% ABSTAIN
                    </span>
                    <span>{proposal.votingResults.abstain.amount}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-gray-400 rounded-full"
                      style={{
                        width: `${proposal.votingResults.abstain.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Total stats */}
                <div className="flex mb-2">
                  <div className="w-1/2">
                    <div className="font-bold">
                      {proposal.votingResults.totalVotingPower}
                    </div>
                    <div className="text-gray-500">% of total voting power</div>
                  </div>
                  <div className="w-1/2">
                    <div className="font-bold">
                      {proposal.votingResults.totalVoters}
                    </div>
                    <div className="text-gray-500">% of total voters</div>
                  </div>
                </div>

                <div className="mb-8">
                  <button className="text-blue-600 hover:underline">
                    Download CSV
                  </button>
                </div>

                {/* Votes List */}
                <h3 className="font-bold mb-3">Votes</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {votes.map((vote, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <ThumbsUp size={16} className="text-green-500 mr-2" />
                        <div className="flex items-center">
                          <span className="">{vote.address}</span>
                          <Copy size={14} className="ml-1 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-gray-500 flex items-center">
                        <span>{vote.votes}</span>
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Item Component
const SidebarItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  active: boolean;
}> = ({ icon, text, active }) => {
  return (
    <div
      className={`px-6 py-3 cursor-pointer ${
        active ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center">
        <span className={`mr-3 ${active ? "text-black" : "text-gray-600"}`}>
          {icon}
        </span>
        <span
          className={`text-sm ${
            active ? "font-medium text-black" : "font-normal text-gray-600"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
