"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile"); 
      if (res.ok) {
        const data = await res.json();
        setInterests(data.interests || "");
        setProfileName(data.name)
        setSkills(data.skills?.map((skill: any) => skill.name) || []);
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <p className="text-xl text-indigo-700">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-16 text-[#1f2e3d] font-sans">
      <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
          {profileName || "Your Profile"}
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-[#1e2b48] mb-2">Interests</h2>
            <p className="bg-white/70 border border-[#e2e8f0] p-4 rounded-xl shadow-sm text-gray-700">
              {interests || "Not added yet."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1e2b48] mb-2">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full shadow-sm"
                  >
                    {skill}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/profile/edit"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition-all"
          >
            Edit Profile
          </a>
        </div>
      </div>

      {/* Encouragement section */}
      <div className="text-center mt-16 bg-white/40 border border-[#e8c36f]/20 backdrop-blur-md rounded-2xl p-8 shadow">
        <h3 className="text-xl font-semibold mb-1 text-indigo-700">
          “Stay curious. Keep growing.”
        </h3>
        <p className="text-[#475569]">Your profile reflects your passion to learn and evolve.</p>
      </div>
    </div>
  );
}
