"use client";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs"; // if using Clerk

type Skill = { name: string };
type PeerProfile = {
  id: string;
  userId: string;
  interests: string;
  skills: Skill[];
};

export default function MatchPage() {
  const [myProfile, setMyProfile] = useState<PeerProfile | null>(null);
  const [matchedPeers, setMatchedPeers] = useState<
    (PeerProfile & { matchScore: number })[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch the current user's profile
      const meRes = await fetch("/api/profile"); // Ensure this API returns the correct user profile
      if (!meRes.ok) return;
      const me = await meRes.json();
      setMyProfile(me);

      // Fetch all peer profiles
      const peersRes = await fetch("/api/peers");
      const peers: PeerProfile[] = await peersRes.json();

      if (!me || !me.interests || !me.skills) return;

      const myInterests = me.interests?.toLowerCase().split(",").map((s: string) => s.trim());
      const mySkills = me.skills?.map((s: any) => s.name.toLowerCase());

      // Compare profiles and calculate match score
      const matched = peers
        .filter((peer) => peer.userId !== me.userId) // Exclude the current user
        .map((peer) => {
          const peerInterests = peer.interests?.toLowerCase().split(",").map((s) => s.trim());
          const peerSkills = peer.skills.map((s) => s.name.toLowerCase());

          // Calculate common interests and skills
          const commonInterests = myInterests.filter((i: string) => peerInterests.includes(i));
          const commonSkills = mySkills.filter((s: string) => peerSkills.includes(s));

          // Calculate match score based on common interests and skills
          const totalFactors = (myInterests.length || 1) + (mySkills.length || 1);
          const matchScore = Math.round(
            ((commonInterests.length + commonSkills.length) / totalFactors) * 100
          );

          return { ...peer, matchScore };
        })
        .sort((a, b) => b.matchScore - a.matchScore); // Sort by highest match score

      setMatchedPeers(matched);
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mb-10">
        Peer Matches
      </h1>

      {matchedPeers.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No matching peers found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchedPeers.map((peer) => (
            <div
              key={peer.userId}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200 transition hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar fallback */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg">
                    {peer.userId.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {/*@ts-ignore*/}
                      Peer Name: <span className="text-gray-600">{peer.name.slice(0, 10)}...</span>
                    </h2>
                    <p className="text-sm text-gray-500">{peer.interests}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {peer.matchScore}% match
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {peer.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl font-medium hover:opacity-90 transition">
                Connect 🤝
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
