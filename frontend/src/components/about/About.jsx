import React, { useEffect, useRef, useState } from "react";

function About() {
  const progressRef = useRef(null);
  const timelineRef = useRef(null);
  const [circleTop, setCircleTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;
      const progress = progressRef.current;

      if (!timeline || !progress) return;

      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const scrollRange = end - start;

      const scrollPosition = Math.min(
        Math.max(windowHeight - rect.top, 0),
        scrollRange
      );

      const percentScrolled = scrollPosition / scrollRange;
      const maxHeight = timeline.offsetHeight - progress.offsetHeight;
      const newTop = percentScrolled * maxHeight;

      setCircleTop(newTop);
    };

    const updateScroll = () => {
      handleScroll();
      requestAnimationFrame(updateScroll);
    };

    requestAnimationFrame(updateScroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#f7f7f7] pt-28 pb-20 px-6 md:px-20 text-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-5xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1F2833]">
          Empowering Careers with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          CareerQuest is your AI-powered career compass — guiding you from self-assessment to success through personalized insights and curated learning.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Skill Assessment",
            desc: "Discover your strengths with our AI-driven evaluation engine.",
          },
          {
            title: "Career Suggestions",
            desc: "Receive tailor-made job role suggestions aligned to your skills.",
          },
          {
            title: "Learning Resources",
            desc: "Access curated, free materials to build your expertise further.",
          },
          {
            title: "User-Friendly Design",
            desc: "Seamless interface designed for focus and clarity.",
          },
          {
            title: "Real-Time Insights",
            desc: "Visualize your career trajectory as you progress.",
          },
          {
            title: "Zero Cost",
            desc: "Completely free and accessible to all aspiring professionals.",
          },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#18BED4]">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works - Animated Timeline */}
      <section className="max-w-4xl mx-auto mb-20 relative">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#1F2833]">
          How It Works
        </h2>
        <div ref={timelineRef} className="relative border-l border-gray-300 pl-8">
          {/* Scroll-Responsive Circle */}
          <div
            ref={progressRef}
            className="absolute left-[-7px] w-4 h-4 bg-[#18BED4] rounded-full transition-transform duration-75"
            style={{ transform: `translateY(${circleTop}px)` }}
          ></div>

          <ol className="space-y-16">
            {[
              {
                title: "1. Skill Assessment",
                desc: "Take a quick AI-powered test to identify your abilities.",
              },
              {
                title: "2. Career Matching",
                desc: "Receive personalized job role recommendations.",
              },
              {
                title: "3. Learning Access",
                desc: "Explore handpicked courses and materials to upskill.",
              },
              {
                title: "4. Continuous Growth",
                desc: "Track your journey and refine your career path over time.",
              },
            ].map(({ title, desc }, index) => (
              <li key={index}>
                <h3 className="text-lg font-semibold text-[#18BED4] mb-1">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#E8F8FA] py-16 px-6 md:px-20 rounded-xl shadow-inner mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1F2833]">
          Why Choose CareerQuest?
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h4 className="text-lg font-semibold text-[#18BED4] mb-2">
              AI-Personalized Guidance
            </h4>
            <p className="text-sm">
              No two paths are the same — get career advice that fits YOU.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#18BED4] mb-2">
              Learn at Your Own Pace
            </h4>
            <p className="text-sm">
              Grow skills on your own schedule with self-paced resources.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#18BED4] mb-2">
              Zero Cost, Full Access
            </h4>
            <p className="text-sm">
              No hidden fees. Just growth, learning, and opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#1F2833]">What Lies Ahead?</h2>
        <p className="text-gray-600 mb-6">
          CareerQuest shall continue to evolve. Our roadmap includes:
        </p>
        <ul className="list-disc list-inside text-left mx-auto text-gray-700 space-y-2">
          <li>Deeper AI models for granular skill evaluation</li>
          <li>Integration with real-time job portals</li>
          <li>Community mentorship and peer support systems</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-20 text-center text-base text-gray-600">
        <p>For inquiries or collaborations:</p>
        <p className="text-blue-500 underline">dm.piyushjain@gmail.com</p>
        <p className="text-blue-500 underline">dm.mayankjain@gmail.com</p>
      </section>
    </div>
  );
}

export default About;
