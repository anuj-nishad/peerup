"use client";

import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  Users,
  BookOpen,
  Flame,
  Medal,
  MessageCircle,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/ensure-user", { method: "POST" });
  }, []);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
        });

        if (res.status === 404) {
          router.push("/profile/edit");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    };

    if (user) {
      checkProfile();
    }
  }, [user, router]);
  return (
    <>
    <SignedIn>
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-[#1f2e3d] px-6 pb-16 font-sans">

    {/* Hero Banner */}
    <section className="py-16 text-center">
      <h2 className="text-4xl font-bold mb-3 text-[#1e2b48]">
        Welcome to <span className="text-indigo-700">PeerUp</span>, {user?.firstName || "Learner"}!
      </h2>
      <p className="text-lg max-w-2xl mx-auto text-[#5a5a5a]">
        Empower your learning journey with a vibrant, motivating environment.
      </p>
    </section>
  
    {/* Feature Cards */}
    <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <DashboardCard
        icon={<Users className="w-10 h-10 text-[#dd6969]" />}
        title="Find Study Partners"
        description="Connect with peers who share your learning goals. Collaboration drives success."
        href="/match"
      />
      <DashboardCard
        icon={<BookOpen className="w-10 h-10 text-indigo-500" />}
        title="Your Profile"
        description="Set your learning preferences and track your journey."
        href="/profile"
      />
      <DashboardCard
        icon={<Flame className="w-10 h-10 text-[#fbbf24]" />}
        title="Streak Tracker"
        description="Maintain and track your daily learning streak to keep the momentum going."
        href="#"
      />
      <DashboardCard
        icon={<Medal className="w-10 h-10 text-[#1ab69d]" />}
        title="NFT Rewards"
        description="Earn badges for your accomplishments. Celebrate your learning journey!"
        href="/nft-rewards"
      />
      <DashboardCard
        icon={<MessageCircle className="w-10 h-10 text-[#0ea5e9]" />}
        title="Community Chat"
        description="Engage in discussions, share knowledge, and grow together."
        href="#"
      />
      <DashboardCard
        icon={<Rocket className="w-10 h-10 text-[#ec8bfa]" />}
        title="Learning Goals"
        description="Set powerful goals and track your growth along the way."
        href="#"
      />
    </section>
  
    {/* Motivation Quote */}
    <section className="bg-white bg-opacity-50 backdrop-blur-md mt-20 mx-auto p-10 rounded-2xl shadow-lg max-w-4xl text-center border border-[#e8c36f]/20">
      <h3 className="text-2xl font-semibold mb-2 text-indigo-700">
        “Consistency creates champions.”
      </h3>
      <p className="text-[#475569]">
        Stay committed, track your progress, and celebrate your milestones with PeerUp.
      </p>
    </section>
  
    {/* Footer */}
    <footer className="text-center text-sm mt-16 text-[#64748b]">
      © 2025 PeerUp — Learn Better. Together.
    </footer>
  </div>
  </SignedIn>

  <SignedOut>
    <RedirectToSignIn/>
  </SignedOut>
  </>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="group relative h-60 rounded-2xl bg-white bg-opacity-30 backdrop-blur-md p-6 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden text-center border border-white/30">
  <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-[#8c87f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

  <div className="relative z-10 flex flex-col items-center gap-4">
    <div className="bg-white p-4 rounded-full shadow transition-transform group-hover:scale-110">
      <div className="w-10 h-10">{icon}</div>
    </div>
    <h4 className="text-2xl mt-1 font-semibold text-[#1e2b48] group-hover:text-indigo-700 transition-colors">
      {title}
    </h4>
    <p className="text-sm text-[#475569] group-hover:text-[#1e293b] transition-opacity max-w-[90%]">
      {description}
    </p>
  </div>
</div>

    </Link>
  );
}
