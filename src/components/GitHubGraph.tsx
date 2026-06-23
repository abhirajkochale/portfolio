import { useState, useEffect } from 'react';

interface GitHubData {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
          }[];
        }[];
      };
    };
    repo1: any;
    repo2: any;
    repo3: any;
    repo4: any;
    repositories: {
      totalCount: number;
    };
  };
}

export default function GitHubGraph({ username }: { username: string }) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        
        // When running locally with `npm run dev`, Vite does not execute Vercel Serverless Functions (/api/github).
        // It just serves the raw file. So we must fetch directly from GitHub on the client side during local dev.
        if (import.meta.env.DEV) {
          const token = import.meta.env.VITE_GITHUB_TOKEN;
          if (!token) {
            throw new Error('Local development requires a .env file with VITE_GITHUB_TOKEN');
          }
          
          const query = `
            query($userName:String!) {
              user(login: $userName){
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
                repo1: repository(name: "Expenzo") {
                  ...RepoFragment
                }
                repo2: repository(name: "subtract") {
                  ...RepoFragment
                }
                repo3: repository(name: "Face_Mask_Detection_System") {
                  ...RepoFragment
                }
                repo4: repository(name: "AI-resume-screening") {
                  ...RepoFragment
                }
                repositories {
                  totalCount
                }
              }
            }
            
            fragment RepoFragment on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          `;

          const ghResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables: { userName: username } }),
          });
          
          if (!ghResponse.ok) throw new Error('Failed to fetch from GitHub API directly');
          const ghData = await ghResponse.json();
          if (ghData.errors) throw new Error(ghData.errors[0].message);
          result = ghData.data;
          
        } else {
          // In production (Vercel), use the secure serverless function
          const response = await fetch(`/api/github?username=${username}`);
          if (!response.ok) {
            throw new Error('Failed to fetch GitHub data from serverless function');
          }
          result = await response.json();
          if (result.error) throw new Error(result.error);
        }
        
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) return <div className="animate-pulse h-64 w-full bg-border/50 rounded-lg"></div>;
  if (error || !data?.user) return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">Failed to load GitHub activity: {error}</div>;

  const calendar = data.user.contributionsCollection.contributionCalendar;
  
  // Aggregate the 4 specific repos, filtering out any that are null
  const pinnedRepos = [
    data.user.repo1, 
    data.user.repo2, 
    data.user.repo3, 
    data.user.repo4
  ].filter(Boolean);
  
  const totalRepos = data.user.repositories.totalCount;

  // Flatten days
  const days = calendar.weeks.flatMap(w => w.contributionDays);
  
  // Calculate longest streak
  let longestStreak = 0;
  let currentStreak = 0;
  days.forEach(day => {
    if (day.contributionCount > 0) {
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  // Calculate most active month
  const monthCounts: Record<string, number> = {};
  days.forEach(day => {
    const month = new Date(day.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthCounts[month] = (monthCounts[month] || 0) + day.contributionCount;
  });
  const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const getColor = (count: number) => {
    if (count === 0) return 'bg-[#E5E0DB]'; 
    if (count <= 3) return 'bg-[#C0BAB4]';
    if (count <= 6) return 'bg-[#8A8580]';
    if (count <= 9) return 'bg-[#4A4744]';
    return 'bg-[#1C1917]';
  };

  const getMonthLabels = () => {
    const labels: { label: string; colIndex: number }[] = [];
    let currentMonth = -1;
    calendar.weeks.forEach((week, i) => {
      if (week.contributionDays.length > 0) {
        const date = new Date(week.contributionDays[0].date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          labels.push({ label: date.toLocaleString('default', { month: 'short' }), colIndex: i });
          currentMonth = month;
        }
      }
    });
    return labels;
  };

  return (
    <div className="flex flex-col gap-6 w-full font-body">
      {/* STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contributions', value: calendar.totalContributions },
          { label: 'Longest Streak', value: `${longestStreak} days` },
          { label: 'Most Active Month', value: mostActiveMonth },
          { label: 'Total Public Repos', value: totalRepos },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col p-4 bg-bg border border-border rounded-[12px] shadow-sm">
            <span className="font-mono text-[0.65rem] text-muted tracking-widest uppercase mb-1">{stat.label}</span>
            <span className="font-bold text-xl text-text">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* HEATMAP */}
      <div className="bg-bg border border-border rounded-[12px] p-6 shadow-sm overflow-x-auto relative">
        <div className="min-w-[750px]">
          {/* Months */}
          <div className="flex text-[10px] text-muted font-mono mb-2 relative h-4">
            {getMonthLabels().map((m, i) => (
              <span key={i} className="absolute" style={{ left: `${m.colIndex * 15}px` }}>{m.label}</span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {calendar.weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day, dIndex) => (
                  <div
                    key={dIndex}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredCell({ count: day.contributionCount, date: day.date, x: rect.left + window.scrollX, y: rect.top + window.scrollY });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-[12px] h-[12px] rounded-[2px] transition-colors duration-200 cursor-crosshair ${getColor(day.contributionCount)}`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 text-[10px] font-mono text-muted">
            <span>{calendar.totalContributions} contributions in the last year</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-[3px]">
                {[0, 2, 5, 8, 12].map(c => <div key={c} className={`w-[12px] h-[12px] rounded-[2px] ${getColor(c)}`} />)}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* PINNED REPOS */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-mono text-[0.7rem] text-muted tracking-[0.2em] uppercase">
            // PINNED REPOSITORIES
          </h3>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="font-mono text-[0.7rem] text-text hover:text-muted transition-colors tracking-widest uppercase">
            View on GitHub →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pinnedRepos.map((repo, i) => {
            let customDescription = repo.description;
            if (repo.name.toLowerCase() === 'expenzo') {
              customDescription = "An AI-powered personal finance app built for the Google Developer Hackathon. Upload your bank statements, chat with your financial data in plain English, and get predictive insights — powered by Google Gemini.";
            } else if (repo.name.toLowerCase() === 'subtract') {
              customDescription = "A free AI audit tool for startups drowning in SaaS subscriptions. Scan your team's AI stack — Cursor, Copilot, ChatGPT — and instantly see how much you're wasting on duplicate seats and ghost licenses.";
            }

            return (
              <a key={i} href={repo.url} target="_blank" rel="noreferrer" className="group flex flex-col p-5 bg-bg-card border border-border hover:border-text/30 rounded-[12px] transition-colors shadow-sm h-full">
                <span className="font-bold text-[1.1rem] text-text mb-2 group-hover:underline decoration-1 underline-offset-2">{repo.name}</span>
                <p className="text-[0.85rem] text-muted mb-6 flex-grow">{customDescription}</p>
                <div className="flex items-center gap-4 text-[0.75rem] font-mono text-muted mt-auto">
                  {repo.primaryLanguage && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                      {repo.primaryLanguage.name}
                    </div>
                  )}
                  {repo.stargazerCount > 0 && <span className="flex items-center gap-1">★ {repo.stargazerCount}</span>}
                  {repo.forkCount > 0 && <span className="flex items-center gap-1">⑂ {repo.forkCount}</span>}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* TOOLTIP PORTAL */}
      {hoveredCell && (
        <div 
          className="absolute z-50 pointer-events-none bg-text text-bg px-3 py-2 rounded-[6px] text-[0.75rem] font-mono shadow-xl whitespace-nowrap transform -translate-x-1/2 -translate-y-full mt-[-10px]"
          style={{ left: hoveredCell.x + 6, top: hoveredCell.y }}
        >
          <strong>{hoveredCell.count}</strong> contributions on {new Date(hoveredCell.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-text rotate-45" />
        </div>
      )}
    </div>
  );
}
