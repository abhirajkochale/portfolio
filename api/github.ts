export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'GitHub token is missing in server environment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return new Response(JSON.stringify({ error: data.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
