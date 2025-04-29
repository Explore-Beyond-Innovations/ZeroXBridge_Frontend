import {
  ArrowRight,
  CheckSquare,
  Coins,
  Home,
  Info,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import React from "react";

// Types for our data
interface Proposal {
  id: string;
  title: string;
  status: "CLOSED";
  endedTime: string;
  commentCount: number;
  progressPercentage: number;
}

export default function GovernancePage() {
  // Sample data for proposals
  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Staking on Starknet V2",
      status: "CLOSED",
      endedTime: "3 weeks ago",
      commentCount: 43,
      progressPercentage: 75,
    },
    {
      id: "2",
      title: "Test Vote",
      status: "CLOSED",
      endedTime: "1 month ago",
      commentCount: 30,
      progressPercentage: 90,
    },
    {
      id: "3",
      title: "Termination of Transaction Versions 0,1,2.",
      status: "CLOSED",
      endedTime: "5 months ago",
      commentCount: 181,
      progressPercentage: 80,
    },
    {
      id: "4",
      title: "Staking on Starknet",
      status: "CLOSED",
      endedTime: "7 months ago",
      commentCount: 306,
      progressPercentage: 85,
    },
    {
      id: "5",
      title: "[TEST] Staking on Starknet test vote",
      status: "CLOSED",
      endedTime: "7 months ago",
      commentCount: 154,
      progressPercentage: 88,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#ffffff] border-r border-gray-300  flex flex-col fixed h-screen">
        <div className="px-4 py-4 mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <div>
              <div className="font-medium text-[18px] text-gray-800">
                Governance Hub
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full px-6 flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <Home className="text-black w-6 h-6" />
            <p className="text-black">Home</p>
          </div>
          <div className="flex gap-2 items-center">
            <Coins className="text-black w-6 h-6" />
            <p className="text-black">Manage vSTRK</p>
          </div>
          <Link href="/governance/voting-proposals">
          <div className="flex gap-2 items-center">
            <CheckSquare className="text-black w-6 h-6" />
            <p className="text-black">Voting Proposals</p>
          </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-[260px]">
        {/* Header */}
        <div className="bg-[#fff] h-[60px] py-2 px-4 border-b border-gray-300 flex justify-end items-center">
          <div className="relative mr-3">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-52"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button className="bg-[#ffffff] border border-gray-300 text-black font-semibold px-4 py-1 text-sm rounded-md">
            Connect
          </button>
        </div>

        <div className="p-8 bg-[#f6f6f6]">
          {/* Hero Section */}
          <div className="text-center mb-10 relative">
            <div className="relative z-10 py-6">
              <div className="flex justify-center items-center">
                <span className="text-[22px] text-indigo-900 mr-1">✧</span>
                <h1 className="text-[35px] font-bold text-indigo-900">
                  Starknet
                </h1>
              </div>
              <h2 className="text-[35px] font-bold -mt-3 mb-1">
                <span className="text-black">Governance Hub</span>
              </h2>
              <p className="text-gray-700 text-[16px] font-semibold">
                Where the community propose, debate and vote on
                <br />
                the direction of Starknet
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-8 bg-[#fff] w-[85%] mx-auto rounded-xl px-4 py-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-1 items-center">
                <Coins className="text-gray-700" />
                <p className="text-gray-700 font-thin">STRK</p>
              </div>
              <div className="flex flex-col  items-start">
                <div className="font-bold text-gray-800 text-lg ">
                  8,805,421
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide flex gap-2 font-semibold">
                  STRK <Info className="text-gray-700 w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col  items-start">
                <div className="font-bold text-gray-800 text-lg ">
                  1,418,367,970
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide flex gap-2 font-semibold">
                  STRK L2 <Info className="text-gray-700 w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col  items-start">
                <div className="font-bold text-gray-800 text-lg ">1%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide flex gap-2 font-semibold">
                  vSTRK of total STRK <Info className="text-gray-700 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Proposals Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-[32px] text-black font-bold">
                  Starknet voting proposals
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Review, discuss and vote on the future of Starknet&apos;s core
                  protocol
                </p>
              </div>
              <button className="text-[14px] text-gray-700 flex gap-2 items-center border border-gray-300 rounded-md px-4 py-3">
                All voting proposals
                <ArrowRight className="text-gray-800 h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 w-full">
              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="border-b border-gray-300  p-4 flex items-center justify-between w-full"
                >
                  <div>
                    <h3 className="font-semibold text-[16px] text-black">
                      {proposal.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-36 h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${proposal.progressPercentage}%` }}
                      ></div>
                    </div>

                    <div className="bg-pink-300 text-gray-700 px-2 py-0.5 rounded-full text-xs uppercase">
                      {proposal.status}
                    </div>

                    <div className="text-gray-700 text-xs">
                      Ended {proposal.endedTime}
                    </div>

                    <div className="flex gap-1 items-center text-gray-500">
                      <MessageSquare className="text-gray-700 w-4 h-4" />
                      <p className="text-xs">{proposal.commentCount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
