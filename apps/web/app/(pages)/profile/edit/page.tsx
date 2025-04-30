"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const [profileName, setProfileName] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
  
      if (res.status === 200) {
        const data = await res.json();
        setInterests(data.interests || "");
        setSkills(data.skills?.map((s: any) => s.name) || []);
      } else if (res.status === 404) {
        // Create a default profile
        const createRes = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interests: "", skills: [], name: profileName }),
        });
  
        if (createRes.ok) {
          const newData = await createRes.json();
          setInterests(newData.profile.interests || "");
          setProfileName(newData.profile.name)
          setSkills(newData.profile.skills?.map((s: any) => s.name) || []);
        }
      }
    }
  
    fetchProfile();
  }, []);
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interests, skills, name: profileName }),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      setTimeout(() => {
        router.push('/')
      }, 1000);
    } else {
      alert("Failed to update profile.");
    }
  }

  function addSkill() {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  }

  function removeSkill(skillToRemove: string) {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-16 text-[#1f2e3d] font-sans">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-30 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
          Set Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold mb-2 text-[#1e2b48]">
              Profile Name
            </label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Name"
              className="w-full p-4 rounded-xl bg-white/70 border border-[#e2e8f0] shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-[#1e2b48]">
              Interests
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., Web Dev, AI, Blockchain"
              className="w-full p-4 rounded-xl bg-white/70 border border-[#e2e8f0] shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-[#1e2b48]">
              Skills
            </label>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., React, Python)"
                className="flex-1 p-4 rounded-xl bg-white/70 border border-[#e2e8f0] shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full shadow-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-600 font-bold hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Motivational quote */}
      <div className="text-center mt-16 bg-white/40 border border-[#e8c36f]/20 backdrop-blur-md rounded-2xl p-8 shadow">
        <h3 className="text-xl font-semibold mb-1 text-indigo-700">
          “Your growth begins with reflection.”
        </h3>
        <p className="text-[#475569]">Update your interests and skills to match your evolving goals.</p>
      </div>
    </div>
  );
}
